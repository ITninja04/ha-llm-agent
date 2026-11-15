// Browser test of the LLM Agent panel against a real HA and the stub model.
// Usage: node panel.mjs <ha-url> <tokens-json-file> <config-dir> [screenshot-dir]
import { readFileSync, existsSync } from "node:fs";
import { randomBytes } from "node:crypto";
import { deflateSync, crc32 } from "node:zlib";
import { chromium } from "playwright";
import { composer, formattingSteps } from "./composer.mjs";
import { settingsSteps } from "./settings.mjs";

const [ha, tokenFile, configDir, shots = "/tmp"] = process.argv.slice(2);
const tokens = JSON.parse(readFileSync(tokenFile, "utf8"));
let page;
const fail = async (msg) => {
  console.error("FAIL:", msg);
  if (page) await page.screenshot({ path: `${shots}/llm-agent-failure.png` }).catch(() => {});
  process.exit(1);
};
process.on("unhandledRejection", (err) => fail(String(err)));
process.on("uncaughtException", (err) => fail(String(err)));

async function state(entityId) {
  const r = await fetch(`${ha}/api/states/${entityId}`, {
    headers: { authorization: `Bearer ${tokens.access_token}` },
  });
  return (await r.json()).state;
}

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);
page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("dialog", (d) => d.accept());
await page.addInitScript((t) => localStorage.setItem("hassTokens", JSON.stringify(t)), tokens);

await page.goto(`${ha}/llm-agent`);
const panel = page.locator("llm-agent-panel");
const { box, value, fill } = composer(page, panel);
await box.waitFor({ timeout: 60000 });
await panel.locator(".welcome h2").waitFor();

// 1. device control runs without approval in the default mode
await fill("please switch on the test switch");
await box.press("Enter");
await page.getByText("Done, the test switch is on.").waitFor({ timeout: 30000 });
if ((await state("input_boolean.e2e_switch")) !== "on") fail("switch did not turn on");
if (!(await panel.locator(".usage").innerText()).includes("~$")) fail("no cost estimate shown");
await page.screenshot({ path: `${shots}/llm-agent-1-control.png` });

// 2. a risky change waits for approval and shows a diff
await fill("write file please");
await box.press("Enter");
const approve = panel.getByRole("button", { name: "Approve" });
await approve.waitFor({ timeout: 30000 });
const diffText = await panel.locator("pre.diff").innerText();
if (!diffText.includes("+hello from the e2e test")) fail("diff missing");
if (!/\n\+hello from the e2e test/.test(diffText)) fail("diff lines are not on separate lines");
await page.screenshot({ path: `${shots}/llm-agent-2-approval.png` });
if (existsSync(`${configDir}/e2e_note.txt`)) fail("file written before approval");
await approve.click();
await page.getByText("I wrote").waitFor({ timeout: 30000 });
if (!existsSync(`${configDir}/e2e_note.txt`)) fail("file not written after approval");

// 3. undo removes it again
await panel.getByRole("button", { name: "Undo" }).click();
await panel.getByText(/Undone:/).waitFor({ timeout: 15000 });
if (existsSync(`${configDir}/e2e_note.txt`)) fail("undo did not remove the file");
await page.screenshot({ path: `${shots}/llm-agent-3-undo.png` });

// 4. history survives a reload, and the panel reopens the last chat by itself
await page.reload();
await page.getByText("Done, the test switch is on.").waitFor({ timeout: 15000 });
if (!(await panel.locator(".tag", { hasText: "undone" }).count())) fail("undone state lost on reload");
if (await panel.getByRole("button", { name: "Undo" }).count()) fail("Undo offered again after reload");

// 4b. the Changes view lists what was changed, how it was allowed, and the undo
await panel.getByRole("button", { name: "Changes" }).click();
const changes = panel.locator("llm-agent-changes");
const changeRow = (tool) => changes.locator(".row").filter({ has: page.locator(".what", { hasText: new RegExp(`^${tool}$`) }) });
await changeRow("write file").first().waitFor({ timeout: 15000 });
const writeText = await changeRow("write file").first().innerText();
if (!writeText.includes("e2e_note.txt")) fail(`write row has no target: ${writeText}`);
if (!writeText.includes("Approved by a person")) fail(`write row has no approval: ${writeText}`);
if (!writeText.includes("undone")) fail(`write row does not show it was undone: ${writeText}`);
if (await changeRow("write file").getByRole("button", { name: "Undo" }).count()) fail("Undo offered for an undone change");
if (!(await changeRow("call service").first().innerText()).includes("Automatic")) fail("switch change not shown as automatic");
if (!(await changeRow("undo").count())) fail("the undo itself is not listed");
// every row shares one set of columns, and no column is squeezed into the next
const layout = () =>
  changes.locator(".row").evaluateAll((rows) =>
    rows.map((row) => {
      const box = (sel) => row.querySelector(sel).getBoundingClientRect();
      const link = row.querySelector(".link");
      return {
        t: box(".t"), u: box(".u"), w: box(".w"), o: box(".o"), row: row.getBoundingClientRect(),
        align: link ? getComputedStyle(link).textAlign : "start",
        clipped: row.querySelector(".what").scrollWidth > row.querySelector(".what").clientWidth + 1,
      };
    }),
  );
let rows = await layout();
const starts = rows.map((r) => Math.round(r.w.x));
if (rows.length < 3 || new Set(starts).size !== 1) fail(`Changes columns do not line up: ${starts}`);
for (const r of rows) {
  if (r.w.width < 160) fail(`Changes column too narrow: ${r.w.width}px`);
  if (r.w.right > r.o.left + 1) fail(`Change and outcome columns overlap: ${r.w.right} > ${r.o.left}`);
  if (!["start", "left"].includes(r.align)) fail(`chat link text is ${r.align}, not left aligned`);
  if (r.clipped) fail("tool name is cut off");
}
await page.screenshot({ path: `${shots}/llm-agent-3b-changes.png` });
// on a phone the change and outcome stack under the time, with no sideways scroll
await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(200);
rows = await layout();
for (const r of rows) {
  if (r.w.top < r.t.bottom) fail("Changes rows do not stack on a phone");
  if (r.u.height > 24) fail(`person name wraps on a phone: ${r.u.height}px tall`);
  if (r.row.right > 391) fail(`Changes row wider than the phone: ${r.row.right}`);
}
await page.screenshot({ path: `${shots}/llm-agent-3c-changes-phone.png` });
await page.setViewportSize({ width: 1280, height: 800 });
await changeRow("write file").first().locator(".link").click();
await page.getByText("I wrote").waitFor({ timeout: 15000 });
if (await changes.count()) fail("opening a chat from Changes left the Changes view open");

// 5. phone layout: the chat fills the screen and the conversation list opens on demand
await page.setViewportSize({ width: 390, height: 844 });
await page.reload();
await box.waitFor({ timeout: 30000 });
await panel.getByRole("button", { name: "Conversations" }).click();
await panel.locator(".conv").first().click();
await page.getByText("Done, the test switch is on.").waitFor({ timeout: 15000 });
const phoneBox = await panel.locator(".composer").boundingBox();
if (!phoneBox || phoneBox.x < 0 || phoneBox.x + phoneBox.width > 390 || phoneBox.y + phoneBox.height > 844)
  fail(`composer is off screen on a phone: ${JSON.stringify(phoneBox)}`);
await page.screenshot({ path: `${shots}/llm-agent-4-phone.png` });

// 6. retry replaces the last turn instead of adding another one
await page.setViewportSize({ width: 1280, height: 800 });
await panel.getByRole("button", { name: "Retry" }).click();
await panel.getByRole("button", { name: "Deny" }).waitFor({ timeout: 15000 });
if ((await panel.locator(".msg.user", { hasText: "write file please" }).count()) !== 1)
  fail("retry duplicated the user message");
if (await panel.locator(".tag", { hasText: "undone" }).count()) fail("retry kept the old attempt");
await panel.getByRole("button", { name: "Deny" }).click();
await panel.getByRole("button", { name: "Retry" }).waitFor({ timeout: 15000 });
await page.screenshot({ path: `${shots}/llm-agent-5-retry.png` });

// 7. a cut-off reply says why and offers Continue, also after reopening the chat
await panel.getByRole("button", { name: "New chat" }).first().click();
await fill("tell me a long story");
await box.press("Enter");
const cont = panel.getByRole("button", { name: "Continue" });
await cont.waitFor({ timeout: 15000 });
if (!(await panel.getByText("cut off at the length limit").count())) fail("no cut-off notice");
await panel.locator(".conv", { hasText: "tell me a long story" }).click();
await cont.waitFor({ timeout: 15000 });
await cont.click();
await page.getByText("Hello from the stub model.").waitFor({ timeout: 15000 });
if (await cont.count()) fail("Continue stayed after continuing");

// 8. the model list comes from the provider when the model box is first used
await panel.locator("input.model").focus();
await panel.locator('datalist option[value="stub-model"]').waitFor({ state: "attached", timeout: 15000 });

// 9. typing @ suggests entities; the box shows the name, and the id goes with the message
await fill("");
await box.pressSequentially("turn on @e2e_sw");
const option = panel.locator("ul.mentions li", { hasText: "input_boolean.e2e_switch" });
await option.waitFor({ timeout: 10000 });
await page.screenshot({ path: `${shots}/llm-agent-6-mention.png` });
await box.press("Enter");
const typed = await value();
if (typed !== "turn on @E2E switch ") fail(`mention not inserted: ${JSON.stringify(typed)}`);
if (await panel.locator("ul.mentions").count()) fail("suggestions stayed open after picking");

// 10. panel settings: dark theme sticks after a reload; Ctrl+Enter mode keeps Enter as a new line
await panel.getByRole("button", { name: "Panel settings" }).click();
await panel.getByLabel("Theme").selectOption("dark");
await panel.getByLabel("Send with").selectOption("ctrl");
await page.waitForTimeout(400); // let the popover and colour transitions finish
await page.screenshot({ path: `${shots}/llm-agent-7-settings.png` });
const host = page.locator("llm-agent-panel");
if ((await host.getAttribute("data-theme")) !== "dark") fail("dark theme not applied");
await page.reload();
await box.waitFor({ timeout: 30000 });
if ((await host.getAttribute("data-theme")) !== "dark") fail("theme not kept after reload");
await fill("line one");
await box.press("Enter");
if ((await value()) !== "line one\n") fail("Enter sent the message in Ctrl+Enter mode");
await panel.getByRole("button", { name: "Panel settings" }).click();
await panel.getByLabel("Send with").selectOption("enter");
// the welcome screen in both explicit themes (screenshots only)
await fill("");
await panel.getByRole("button", { name: "New chat" }).first().click();
for (const theme of ["dark", "light"]) {
  if (!(await panel.locator(".prefs").count()))
    await panel.getByRole("button", { name: "Panel settings" }).click();
  await panel.getByLabel("Theme").selectOption(theme);
  await panel.locator(".messages").click({ position: { x: 20, y: 300 } }); // outside the popover
  if (await panel.locator(".prefs").count()) fail("panel settings stayed open after an outside click");
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${shots}/llm-agent-8-welcome-${theme}.png` });
}
await panel.getByRole("button", { name: "Panel settings" }).click();
await panel.getByLabel("Theme").selectOption("auto");
await box.press("Escape");

// 10b. the composer grows with its text, stops at its cap and scrolls, then shrinks back
await panel.getByRole("button", { name: "New chat" }).first().click();
await fill("");
const oneLine = (await box.boundingBox()).height;
await fill("one\ntwo\nthree\nfour");
const fourLines = (await box.boundingBox()).height;
if (fourLines < oneLine * 2) fail(`composer did not grow: ${oneLine}px for one line, ${fourLines}px for four`);
await fill(Array.from({ length: 200 }, (_, i) => `line ${i}`).join("\n"));
const capped = await box.evaluate((el) => ({
  height: el.getBoundingClientRect().height,
  scrolls: el.scrollHeight > el.clientHeight,
  viewport: window.innerHeight,
}));
if (capped.height > capped.viewport * 0.41) fail(`composer passed its cap: ${capped.height}px of ${capped.viewport}px`);
if (!capped.scrolls) fail("a capped composer does not scroll");
await page.screenshot({ path: `${shots}/llm-agent-8b-composer-capped.png` });
await fill("");
if ((await box.boundingBox()).height > oneLine + 1) fail("composer did not shrink back when emptied");

// 10c. a text file goes with the message as a chip and reaches the model as text
await panel.getByLabel("Attach photos or files").setInputFiles({
  name: "e2e_config.yaml",
  mimeType: "text/yaml",
  buffer: Buffer.from("light:\n  - platform: template\n"),
});
await panel.locator(".file", { hasText: "e2e_config.yaml" }).first().waitFor({ timeout: 10000 });
await fill("what is in this file");
await box.press("Enter");
await page.getByText("I read the attached file.").waitFor({ timeout: 15000 });
if (!(await panel.locator(".msg.user .file", { hasText: "e2e_config.yaml" }).count())) fail("sent file chip not shown");
await page.screenshot({ path: `${shots}/llm-agent-8c-file.png` });

// 11. a photo goes with the message, shows in the chat, and is noted (not kept) after reopening
await panel.getByRole("button", { name: "New chat" }).first().click();
await panel.getByLabel("Attach photos or files").setInputFiles(`${configDir}/camera.png`);
await panel.locator(".attached img").waitFor({ timeout: 10000 });
await fill("what is in this photo");
await box.press("Enter");
await page.getByText("I can see 1 photo.").waitFor({ timeout: 15000 });
if (!(await panel.locator(".msg.user .photos img").count())) fail("sent photo not shown");
if (await panel.locator(".attached img").count()) fail("photo stayed in the composer after sending");
await page.screenshot({ path: `${shots}/llm-agent-9-photo.png` });
await panel.getByRole("button", { name: "New chat" }).first().click();
await panel.locator(".conv", { hasText: "what is in this photo" }).click();
await panel.getByText("1 photo (not kept)").waitFor({ timeout: 15000 });
await panel.getByRole("button", { name: "Retry" }).click();
await panel.getByText("Attach them again").waitFor({ timeout: 10000 });
if (!(await panel.getByText("I can see 1 photo.").count())) fail("retry without the photo replaced the answer");
await panel.locator(".editing button", { hasText: "Cancel" }).click();

// 12. draft photos don't follow you into another chat
await panel.getByLabel("Attach photos or files").setInputFiles(`${configDir}/camera.png`);
await panel.locator(".attached img").waitFor({ timeout: 10000 });
await panel.getByRole("button", { name: "New chat" }).first().click();
if (await panel.locator(".attached img").count()) fail("draft photo followed into a new chat");

// 13. three large, noisy photos still fit in one message (HA closes the socket over 4 MiB)
const noisy = noisyPng(2000, 1500);
const files = [1, 2, 3].map((i) => ({ name: `noise${i}.png`, mimeType: "image/png", buffer: noisy }));
await panel.getByLabel("Attach photos or files").setInputFiles(files);
for (let i = 0; (await panel.locator(".attached img").count()) < 3; i++) {
  if (i > 60) fail("noisy photos were not attached");
  await page.waitForTimeout(500);
}
await fill("three noisy photos");
await box.press("Enter");
await page.getByText("I can see 3 photo.").waitFor({ timeout: 30000 });

// 14. a proposed dashboard can be previewed before approving, without outside addresses
await panel.getByRole("button", { name: "New chat" }).first().click();
const outside = [];
page.on("request", (r) => r.url().includes(".invalid") && outside.push(r.url()));
await fill("make a new dashboard");
await box.press("Enter");
await panel.getByRole("button", { name: "Preview the dashboard" }).click({ timeout: 30000 });
await panel.locator("llm-dashboard-preview").getByText("E2E preview").waitFor({ timeout: 15000 });
await panel.locator("llm-dashboard-preview").getByText("E2E stack").waitFor({ timeout: 15000 });
if (!(await panel.getByText("7 cards not shown").count())) fail("unsafe cards were not held back");
await page.waitForTimeout(1000);
if (outside.length) fail(`preview fetched outside addresses: ${outside.join(", ")}`);
await page.screenshot({ path: `${shots}/llm-agent-6-dashboard-preview.png` });
await panel.getByRole("button", { name: "Deny" }).click();
await page.getByText("OK, I did not do that.").waitFor({ timeout: 15000 });

// 15. home notes are separate notes and the knowledge base separate entries, edited in
// the Notes view and kept
await panel.getByRole("button", { name: "Home notes" }).click();
const notesView = panel.locator("llm-agent-notes");
const noteRow = (text) => notesView.locator(".row", { hasText: text });
await notesView.getByRole("button", { name: "Add" }).click();
await notesView.locator(".ed textarea").fill("The office is upstairs.");
await notesView.getByRole("button", { name: "Save" }).click();
await noteRow("The office is upstairs.").waitFor({ timeout: 10000 });
await notesView.getByRole("button", { name: "Add" }).click();
await notesView.locator(".ed textarea").fill("The old router is in the loft.");
await notesView.getByRole("button", { name: "Save" }).click();
await noteRow("The old router").getByRole("checkbox", { name: "Enabled" }).uncheck();
await notesView.locator(".row.off", { hasText: "The old router" }).waitFor({ timeout: 10000 });
// edit in place
await noteRow("The office").getByRole("button", { name: "Edit" }).click();
await notesView.locator(".ed textarea").fill("The office is upstairs, second door.");
await notesView.getByRole("button", { name: "Save" }).click();
await noteRow("second door").waitFor({ timeout: 10000 });
if (!(await notesView.getByText(/characters left/).count())) fail("room left for notes not shown");
await page.screenshot({ path: `${shots}/llm-agent-7-home-notes.png` });
// delete asks inline, not with a browser dialog
const dialogs = [];
const onDialog = (d) => dialogs.push(d.message());
page.on("dialog", onDialog);
await noteRow("The old router").getByRole("button", { name: "Delete" }).click();
await noteRow("The old router").getByText("Delete this?").waitFor({ timeout: 5000 });
await noteRow("The old router").getByRole("button", { name: "Delete" }).click();
for (let i = 0; i < 20 && (await noteRow("The old router").count()); i++) await page.waitForTimeout(250);
if (await noteRow("The old router").count()) fail("deleted note still listed");
page.off("dialog", onDialog);
if (dialogs.length) fail(`delete opened a browser dialog: ${dialogs.join("; ")}`);
// the knowledge base: a larger editor for the body
await notesView.getByRole("tab", { name: "Knowledge" }).click();
await notesView.getByRole("button", { name: "Add" }).click();
await notesView.getByRole("textbox", { name: "Title" }).fill("Heating");
await notesView.getByRole("textbox", { name: "One-line summary" }).fill("Two zones, boiler in the garage");
await notesView.getByRole("textbox", { name: "Text (Markdown)" }).fill("## Zones\n- Zone 1: downstairs\n- Zone 2: upstairs\n");
await notesView.getByRole("button", { name: "Save" }).click();
await noteRow("Heating").waitFor({ timeout: 10000 });
await page.screenshot({ path: `${shots}/llm-agent-7b-knowledge.png` });
// on a phone the rows wrap inside the screen
await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(200);
const wide = await notesView.locator(".row, .bar").evaluateAll((els) =>
  els.map((el) => el.getBoundingClientRect().right).filter((r) => r > 391),
);
if (wide.length) fail(`Notes rows wider than the phone: ${wide}`);
await page.screenshot({ path: `${shots}/llm-agent-7c-knowledge-phone.png` });
await page.setViewportSize({ width: 1280, height: 800 });
await page.reload();
await panel.getByRole("button", { name: "Home notes" }).click({ timeout: 30000 });
await noteRow("second door").waitFor({ timeout: 10000 });
await notesView.getByRole("tab", { name: "Knowledge" }).click();
await noteRow("Heating").waitFor({ timeout: 10000 });
await panel.getByRole("button", { name: "Home notes" }).click();
if (await notesView.count()) fail("the Home notes button did not close the Notes view");

// 16. a scheduled prompt (llm_agent.ask from an automation) shows up named and marked
await page.evaluate(() =>
  document
    .querySelector("home-assistant")
    .hass.callService("llm_agent", "ask", { prompt: "check batteries", title: "E2E weekly check" }, undefined, true, true),
);
await page.reload();
await box.waitFor({ timeout: 30000 });
const scheduled = panel.locator(".conv", { hasText: "E2E weekly check" });
await scheduled.waitFor({ timeout: 15000 });
if (!(await scheduled.locator("ha-icon.auto").count())) fail("automation chat is not marked");
await page.screenshot({ path: `${shots}/llm-agent-8-scheduled.png` });

// 17. a suggested note gets its own card, and its Save button waits a moment
await panel.getByRole("button", { name: "New chat" }).first().click();
await fill("remember the freezer plug");
await box.press("Enter");
const card = panel.locator(".note-suggestion");
await card.waitFor({ timeout: 15000 });
if (!(await card.getByText("Never switch off the freezer plug.").count())) fail("note line not shown");
if (await panel.locator(".approval").count()) fail("note suggestion looks like a normal approval");
if (await card.locator(".note-lines.del").count()) fail("a kept note is listed under Forget");
const save = card.getByRole("button", { name: "Save to notes" });
if (!(await save.isDisabled())) fail("Save to notes was clickable straight away");
await page.screenshot({ path: `${shots}/llm-agent-9-note-suggestion.png` });
await save.click({ timeout: 5000 });
await panel.getByText("I'll remember that.").waitFor({ timeout: 15000 });
await panel.getByRole("button", { name: "Home notes" }).click();
const fromAi = noteRow("freezer plug");
await fromAi.waitFor({ timeout: 10000 });
if (!(await fromAi.getByText("from the AI").count())) fail("a note the AI suggested is not marked");
await panel.getByRole("button", { name: "Home notes" }).click();

// 18. the editor: keys, Stop, per-chat drafts, editing an earlier message, copy
await panel.getByRole("button", { name: "New chat" }).first().click();
const send = panel.locator("button.send");
const userTexts = () => panel.locator(".msg.user").allInnerTexts();
const replyDone = () => panel.locator("button.send:not(.stop)").waitFor({ timeout: 15000 });
// the panel sits inside Home Assistant's own shadow roots, so ask the element itself
const focused = () => panel.evaluate((el) => el.shadowRoot.activeElement?.className);
if (!(await send.isDisabled())) fail("Send is clickable with an empty composer");
await fill("first question");
if (await send.isDisabled()) fail("Send stays disabled with text in the box");
await box.press("Shift+Enter");
if ((await value()) !== "first question\n") fail("Shift+Enter did not add a new line");
// Enter while an input method is still composing (Japanese, Chinese) picks a word, never sends
await fill("first question");
await box.evaluate((el) =>
  el.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", isComposing: true, bubbles: true, composed: true })),
);
await page.waitForTimeout(300);
if ((await userTexts()).length) fail("Enter during IME composition sent the message");
await box.press("Enter");
await panel.locator(".msg.assistant", { hasText: "Hello from the stub model." }).waitFor({ timeout: 15000 });
await replyDone();
// sent with the button this time: focus still ends up back in the composer
await fill("second question");
await send.click();
await panel.locator(".msg.assistant").nth(1).waitFor({ timeout: 15000 });
await replyDone();
if (!(await focused())?.split(" ").includes("box")) fail(`focus did not come back to the composer: ${await focused()}`);
// Up arrow in an empty box takes the last message back for editing; Cancel puts it away
await box.press("ArrowUp");
if ((await value()) !== "second question") fail("Up arrow did not load the last message");
await panel.locator(".editing", { hasText: "Editing your last message" }).waitFor();
await panel.locator(".editing button", { hasText: "Cancel" }).click();
if ((await value()) !== "") fail("Cancel left the edited text in the box");
// a draft stays with its chat, across switching chats and a reload
await fill("half-typed draft");
await panel.locator(".conv", { hasText: "tell me a long story" }).click();
await panel.locator(".msg.user", { hasText: "tell me a long story" }).waitFor({ timeout: 15000 });
if ((await value()) === "half-typed draft") fail("the draft followed into another chat");
await panel.locator(".conv", { hasText: "first question" }).click();
await panel.locator(".msg.user", { hasText: "second question" }).waitFor({ timeout: 15000 });
if ((await value()) !== "half-typed draft") fail("the draft was lost switching chats");
await page.reload();
await panel.locator(".msg.user", { hasText: "second question" }).waitFor({ timeout: 30000 });
if ((await value()) !== "half-typed draft") fail("the draft was lost on reload");
// editing an earlier message replaces it and everything after it, on the server too
await panel.locator(".row.user").first().getByRole("button", { name: "Edit" }).click();
if ((await value()) !== "first question") fail("Edit did not load the message");
await panel.locator(".editing", { hasText: "not undone" }).waitFor();
await page.screenshot({ path: `${shots}/llm-agent-10-editor.png` });
await fill("edited question");
await box.press("Enter");
await panel.locator(".msg.user", { hasText: "edited question" }).waitFor({ timeout: 15000 });
await replyDone();
if (JSON.stringify(await userTexts()) !== JSON.stringify(["edited question"]))
  fail(`edit did not replace the later turns: ${await userTexts()}`);
if ((await value()) !== "half-typed draft") fail("the draft did not come back after the edit");
await page.reload();
await panel.locator(".msg.user", { hasText: "edited question" }).waitFor({ timeout: 30000 });
if (JSON.stringify(await userTexts()) !== JSON.stringify(["edited question"]))
  fail(`the saved chat was not cut: ${await userTexts()}`);
// Copy on a reply hands over its markdown source
await page.evaluate(() => {
  window.copied = [];
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText: async (text) => void window.copied.push(text) },
  });
});
await panel.locator(".msg-actions.acts button").last().click();
const copied = await page.evaluate(() => window.copied);
if (copied[0] !== "Hello from the stub model.") fail(`reply copy gave ${JSON.stringify(copied)}`);
// Stop sits where Send was while a reply runs, and Esc stops it
await fill("write file please");
await box.press("Enter");
await panel.getByRole("button", { name: "Approve" }).waitFor({ timeout: 30000 });
await panel.locator("button.send.stop").waitFor();
await box.press("Escape");
await replyDone();
await page.waitForTimeout(500);
if (existsSync(`${configDir}/e2e_note.txt`)) fail("the file was written after Esc stopped the reply");
// on a phone the edit and copy buttons are shown without hovering
await page.setViewportSize({ width: 390, height: 844 });
await page.reload();
await panel.locator(".msg.user", { hasText: "edited question" }).waitFor({ timeout: 30000 });
for (const sel of [".row.user .msg-actions", ".msg-actions.acts"]) {
  const opacity = await panel.locator(sel).first().evaluate((el) => getComputedStyle(el).opacity);
  if (opacity !== "1") fail(`${sel} is hidden until hover on a phone (opacity ${opacity})`);
}
await page.screenshot({ path: `${shots}/llm-agent-10b-editor-phone.png` });
await page.setViewportSize({ width: 1280, height: 800 });

// 19. a sent message renders its Markdown (a code block stays a code block) and shows a
// picked entity as a chip with its name, while the model still gets the exact id
await panel.getByRole("button", { name: "New chat" }).first().click();
await fill("```\nyaml: 1\n```\nturn on @e2e_sw");
await panel.locator("ul.mentions li", { hasText: "input_boolean.e2e_switch" }).click();
if (!(await value()).endsWith("turn on @E2E switch "))
  fail(`picked name not shown: ${JSON.stringify(await value())}`);
await send.click();
const sent = panel.locator(".msg.user").last();
await sent.locator("pre code").waitFor({ timeout: 15000 });
if ((await sent.locator("pre code").innerText()).trim() !== "yaml: 1")
  fail("the code block in a sent message did not render as code");
const chip = sent.locator(".chip");
if ((await chip.innerText()) !== "E2E switch") fail("the picked entity is not a name chip");
if ((await chip.getAttribute("title")) !== "input_boolean.e2e_switch")
  fail("the chip lost the entity id");
await replyDone();
await page.screenshot({ path: `${shots}/llm-agent-11-markdown-chips.png` });
// editing it puts the name back in the box, and sending sends the id again
await fill("");
await box.press("ArrowUp");
if (!(await value()).endsWith("turn on @E2E switch"))
  fail(`editing did not show the name: ${JSON.stringify(await value())}`);
await panel.locator(".editing button", { hasText: "Cancel" }).click();

// 20. the chat box formats Markdown while it is typed, before sending
await formattingSteps({ page, panel, shots, tag: "chromium", fail });

// 21. the Usage view: spend per day as bars, totals, the breakdown with an AI Task row of
// its own, and the provider balance line, in both themes and at phone width.
// One AI Task call first, the way an automation would make it, so its row is there.
const api = (path, body) =>
  fetch(`${ha}/api/${path}`, {
    method: body ? "POST" : "GET",
    headers: { authorization: `Bearer ${tokens.access_token}`, "content-type": "application/json" },
    body: body && JSON.stringify(body),
  });
const taskEntity = (await (await api("states")).json()).find((s) => s.entity_id.startsWith("ai_task."));
if (!taskEntity) fail("no AI Task entity");
const task = await api("services/ai_task/generate_data?return_response", {
  task_name: "e2e",
  entity_id: taskEntity.entity_id,
  instructions: "Say hello",
});
if (!task.ok) fail(`AI Task call failed: HTTP ${task.status} ${await task.text()}`);
await panel.getByRole("button", { name: "Usage", exact: true }).click();
const usageView = panel.locator("llm-agent-usage");
await usageView.locator(".tot").waitFor({ timeout: 10000 });
const totals = await usageView.locator(".tot").innerText();
if (!/Today\s*\$0\.\d*[1-9]/.test(totals)) fail(`no spend today in the Usage totals: ${totals}`);
await usageView.getByText(/^Daily cap \$5\.00: \$0\.\d+ used today/).waitFor();
const bars = usageView.locator("svg rect.b");
if ((await bars.count()) !== 30) fail(`expected 30 day bars, got ${await bars.count()}`);
const todayBar = usageView.locator("svg g").last();
if (!(Number(await todayBar.locator("rect.b").getAttribute("height")) > 0)) fail("today's bar is empty");
if (!/: \$\d+\.\d+$/.test(await todayBar.locator("title").textContent())) fail("bar title lacks date and amount");
const stubRows = usageView.locator("tr", { hasText: "stub-model" });
if ((await stubRows.count()) < 2) fail("breakdown lacks the chat and the AI Task rows");
if (!(await usageView.locator("tr.task", { hasText: "AI Task" }).count())) fail("AI Task not in its own row");
await usageView.getByText("has no balance an API key can read").waitFor();
await usageView.getByRole("link", { name: "Billing page" }).waitFor();
await usageView.getByRole("tab", { name: "7 days" }).click();
for (let i = 0; i < 50 && (await bars.count()) !== 7; i++) await page.waitForTimeout(100);
if ((await bars.count()) !== 7) fail(`7 day range shows ${await bars.count()} bars`);
await usageView.getByRole("tab", { name: "30 days" }).click();
for (let i = 0; i < 50 && (await bars.count()) !== 30; i++) await page.waitForTimeout(100);
const setTheme = async (theme) => {
  if (!(await panel.locator(".prefs").count()))
    await panel.getByRole("button", { name: "Panel settings" }).click();
  await panel.getByLabel("Theme").selectOption(theme);
  await panel.getByRole("button", { name: "Panel settings" }).click();
  if (await panel.locator(".prefs").count()) fail("panel settings stayed open");
};
for (const theme of ["light", "dark"]) {
  await setTheme(theme);
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${shots}/llm-agent-10-usage-${theme}.png` });
}
await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(400);
const usageWidth = await usageView.evaluate((el) => ({
  right: el.getBoundingClientRect().right,
  overflow: el.scrollWidth - el.clientWidth,
}));
if (usageWidth.right > 391 || usageWidth.overflow > 0)
  fail(`Usage view wider than the phone: ${JSON.stringify(usageWidth)}`);
// the cost column must be on screen, not scrolled away inside the table
const costCell = await usageView.locator("tr.task td").last().boundingBox();
if (!costCell || costCell.x + costCell.width > 391) fail(`cost column off screen: ${JSON.stringify(costCell)}`);
await page.screenshot({ path: `${shots}/llm-agent-10-usage-phone.png` });
await page.setViewportSize({ width: 1280, height: 800 });
await setTheme("light");
await panel.getByRole("button", { name: "Usage", exact: true }).click();
if (await usageView.count()) fail("the Usage button did not close the view");

// 22. the integration's settings inside the panel, and the jump to its page in HA
await settingsSteps({ page, panel, browser, ha, tokens, shots, fail, fill, box });

// The panel follows the user's Home Assistant language.
const de = JSON.parse(
  readFileSync(new URL("../custom_components/llm_agent/www/i18n/de.json", import.meta.url), "utf8"),
);
const german = await browser.newPage({ viewport: { width: 1280, height: 800 } });
german.on("pageerror", (e) => errors.push(String(e)));
await german.addInitScript((t) => {
  localStorage.setItem("hassTokens", JSON.stringify(t));
  localStorage.setItem("selectedLanguage", JSON.stringify("de"));
}, tokens);
await german.goto(`${ha}/llm-agent`);
const germanBox = german.locator("llm-agent-panel .composer .box");
await germanBox.waitFor({ timeout: 60000 });
const placeholder = () => germanBox.getAttribute("data-placeholder");
// the placeholder adds the send keys on a wide screen
const inGerman = async () => (await placeholder())?.startsWith(de.composer_placeholder);
for (let i = 0; i < 50 && !(await inGerman()); i++) await german.waitForTimeout(200);
if (!(await inGerman()))
  fail(`panel not in German: placeholder is "${await placeholder()}"`);
await german.close();

if (errors.length) fail(`page errors: ${errors.join("; ")}`);
await browser.close();
console.log("E2E PASS");

/** An uncompressible RGB PNG: the worst case for photo size. */
function noisyPng(w, h) {
  const row = w * 3 + 1;
  const raw = randomBytes(row * h);
  for (let y = 0; y < h; y++) raw[y * row] = 0;
  const chunk = (type, data) => {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length);
    const body = Buffer.concat([Buffer.from(type), data]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(body) >>> 0);
    return Buffer.concat([len, body, crc]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr.set([8, 2, 0, 0, 0], 8);
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}
