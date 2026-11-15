// The chat box in WebKit, the engine of Safari and of the Home Assistant iPhone app. The
// box reads its caret through Selection.getComposedRanges there and through the
// shadow root in Chromium (frontend/src/composer.ts), so a pass in panel.mjs says nothing
// about this engine. Runs after panel.mjs, against the same HA and stub model.
// Usage: node webkit.mjs <ha-url> <tokens-json-file> [screenshot-dir]
import { readFileSync } from "node:fs";
import { webkit } from "playwright";
import { composer, formattingSteps } from "./composer.mjs";

const [ha, tokenFile, shots = "/tmp"] = process.argv.slice(2);
const tokens = JSON.parse(readFileSync(tokenFile, "utf8"));
let page;
const fail = async (msg) => {
  console.error("FAIL (webkit):", msg);
  if (page) await page.screenshot({ path: `${shots}/llm-agent-webkit-failure.png` }).catch(() => {});
  process.exit(1);
};
process.on("unhandledRejection", (err) => fail(String(err)));
process.on("uncaughtException", (err) => fail(String(err)));

const browser = await webkit.launch();
page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const errors = [];
const warnings = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
  if (m.type() === "warning" && m.text().includes("llm-agent")) warnings.push(m.text());
});
page.on("dialog", (d) => d.accept());
await page.addInitScript((t) => localStorage.setItem("hassTokens", JSON.stringify(t)), tokens);
await page.goto(`${ha}/llm-agent`);
const panel = page.locator("llm-agent-panel");
await panel.locator(".composer textarea").waitFor({ state: "attached", timeout: 60000 });
const { box, value, fill } = composer(page, panel);
// the plain textarea is the fallback when the editor cannot start; WebKit must get the editor
for (let i = 0; i < 50 && !(await box.count()); i++) await page.waitForTimeout(200);
if (!(await box.count())) fail(`the Markdown editor did not start: ${warnings.join("; ")}`);

await panel.getByRole("button", { name: "New chat" }).first().click();
const send = panel.locator("button.send");
const userTexts = () => panel.locator(".msg.user").allInnerTexts();
const replyDone = () => panel.locator("button.send:not(.stop)").waitFor({ timeout: 15000 });

// typing goes where the caret is, not to the start of the box
await fill("");
await box.pressSequentially("hello there");
await box.press("ArrowLeft");
await box.press("ArrowLeft");
await box.press("ArrowLeft");
await box.pressSequentially("X");
if ((await value()) !== "hello thXere") fail(`typing landed in the wrong place: ${JSON.stringify(await value())}`);

// Shift+Enter is a new line, Enter during IME composition never sends, Enter sends
await fill("");
if (!(await send.isDisabled())) fail("Send is clickable with an empty box");
await fill("webkit question");
if (await send.isDisabled()) fail("Send stays disabled with text in the box");
await box.press("Shift+Enter");
await box.pressSequentially("second line");
if ((await value()) !== "webkit question\nsecond line") fail(`Shift+Enter: ${JSON.stringify(await value())}`);
await box.evaluate((el) =>
  el.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", isComposing: true, bubbles: true, composed: true })),
);
await page.waitForTimeout(300);
if ((await userTexts()).length) fail("Enter during IME composition sent the message");
await box.press("Enter");
await panel.locator(".msg.assistant", { hasText: "Hello from the stub model." }).waitFor({ timeout: 15000 });
await replyDone();
if ((await value()) !== "") fail("the box was not emptied after sending");

// Up arrow in an empty box edits the last message; Cancel puts it away
await box.press("ArrowUp");
if ((await value()) !== "webkit question\nsecond line") fail(`Up arrow: ${JSON.stringify(await value())}`);
await panel.locator(".editing button", { hasText: "Cancel" }).click();
if ((await value()) !== "") fail("Cancel left the edited text in the box");

// the box grows with its text and stops at its cap
const oneLine = (await box.boundingBox()).height;
await fill(Array.from({ length: 200 }, (_, i) => `line ${i}`).join("\n"));
const capped = await box.evaluate((el) => ({
  height: el.getBoundingClientRect().height,
  scrolls: el.scrollHeight > el.clientHeight,
  viewport: window.innerHeight,
}));
if (capped.height <= oneLine * 2) fail(`composer did not grow: ${capped.height}px`);
if (capped.height > capped.viewport * 0.41) fail(`composer passed its cap: ${capped.height}px`);
if (!capped.scrolls) fail("a capped composer does not scroll");
await fill("");
if ((await box.boundingBox()).height > oneLine + 1) fail("composer did not shrink back when emptied");

// the @ picker opens at the caret and arrow keys and Enter pick from it
await box.pressSequentially("switch @e2e_sw");
await panel.locator("ul.mentions li", { hasText: "input_boolean.e2e_switch" }).waitFor({ timeout: 10000 });
await box.press("ArrowDown");
await box.press("ArrowUp");
await box.press("Enter");
if ((await value()) !== "switch @E2E switch ") fail(`mention not inserted: ${JSON.stringify(await value())}`);
await box.pressSequentially("now");
if ((await value()) !== "switch @E2E switch now") fail(`caret not after the mention: ${JSON.stringify(await value())}`);

await formattingSteps({ page, panel, shots, tag: "webkit", fail });

if (errors.length) fail(`page errors: ${errors.join("; ")}`);
await browser.close();
console.log("E2E WEBKIT PASS");
