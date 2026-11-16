// The floating chat on ordinary HA pages: the button, the window with the real panel in
// it, a reply, a drag that survives a reload, navigation that keeps the chat, Esc, the
// more-info dialog above it, the phone sheet, the full panel, WebKit, and the option
// that turns it off. Runs last: it switches the button off for everyone at the end.
// Usage: node float.mjs <ha-url> <tokens-json-file> [screenshot-dir]
import { readFileSync } from "node:fs";
import { chromium, webkit } from "playwright";
import { composer } from "./composer.mjs";

const [ha, tokenFile, shots = "/tmp"] = process.argv.slice(2);
const tokens = JSON.parse(readFileSync(tokenFile, "utf8"));
let page;
const fail = async (msg) => {
  console.error("FAIL (float):", msg);
  if (page) await page.screenshot({ path: `${shots}/llm-agent-float-failure.png` }).catch(() => {});
  process.exit(1);
};
process.on("unhandledRejection", (err) => fail(String(err)));
process.on("uncaughtException", (err) => fail(String(err)));

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);
page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
await page.addInitScript((t) => localStorage.setItem("hassTokens", JSON.stringify(t)), tokens);

const float = page.locator("llm-agent-float");
const button = float.getByRole("button", { name: "LLM Agent" });
const win = float.locator(".win");
const panel = float.locator("llm-agent-panel");
const { box, fill } = composer(page, panel);
const rect = () => win.boundingBox();
// the stub answers a message that carries a page about the page (stub_openai.py page_reply)
const REPLY = /Hello from the stub model\.|I can see the .* page\.|The page block did not name the test switch\./;
/** HA's own way between pages (history.pushState plus location-changed), no reload. */
const navigate = (path) =>
  page.evaluate((p) => {
    history.pushState(null, "", p);
    window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
  }, path);
const setTheme = async (theme) => {
  await panel.getByRole("button", { name: "Panel settings" }).click();
  await panel.getByLabel("Theme").selectOption(theme);
  await panel.getByRole("button", { name: "Panel settings" }).click();
};

// 1. the button on the default dashboard, and the window with the panel in it
await page.goto(`${ha}/`);
await button.waitFor({ timeout: 60000 });
// the button can be up before HA has drawn the dashboard under it
await page.locator("hui-view").first().waitFor({ timeout: 60000 });
await page.waitForTimeout(800);
await page.screenshot({ path: `${shots}/llm-agent-float-1-button.png` });
await button.click();
await box.waitFor({ timeout: 30000 });
if (await button.isVisible()) fail("the button stayed up with the window open");
let r = await rect();
if (Math.round(r.width) !== 420 || Math.round(r.height) !== 620) fail(`window is ${r.width}x${r.height}, not 420x620`);
if ((await panel.getAttribute("embedded")) === null) fail("the panel in the window is not embedded");
// the title bar's buttons are in the title bar: the loader's own button styles once
// pulled them out to the corner of the screen, where nobody would find them
for (const name of ["Minimize", "Open the full panel", "Close"]) {
  const b = await float.getByRole("button", { name }).boundingBox();
  if (!b || b.x < r.x || b.x + b.width > r.x + r.width || b.y < r.y || b.y + b.height > r.y + 44)
    fail(`"${name}" is not in the title bar: ${JSON.stringify(b)} in ${JSON.stringify(r)}`);
}
if (await panel.locator("nav").isVisible().catch(() => false)) fail("the chat list sidebar shows in the window");
// the window tells the panel which page it is on, and the composer shows it as a chip
const chip = panel.locator(".page-chip");
await chip.waitFor({ timeout: 10000 });
const here = await page.evaluate(() => location.pathname + location.search);
if ((await chip.getAttribute("title"))?.split("\n")[0] !== here)
  fail(`chip on ${here} is for ${await chip.getAttribute("title")}`);

// 2. a message and its reply, in the same store as the panel
await panel.getByRole("button", { name: "New chat" }).first().click();
await fill("float question");
await box.press("Enter");
await panel.locator(".msg.assistant", { hasText: REPLY }).waitFor({ timeout: 30000 });
// HA's generated Overview (the home panel) is a dashboard with what it shows: the stub
// answers "I can see ..." only when the page block it received names the test switch
const overview = await panel.evaluate((p) => p.pageContext);
if (overview?.kind !== "dashboard" || overview?.summary !== "Overview")
  fail(`Overview read as ${overview?.kind} "${overview?.summary}"`);
if (!JSON.stringify(overview.details).includes("input_boolean.e2e_switch"))
  fail(`Overview page context lists no test switch: ${JSON.stringify(overview.details)}`);
const answer = await panel.locator(".msg.assistant").last().innerText();
if (!/I can see the .* page\./.test(answer)) fail(`the page block on Overview did not name the test switch: ${answer}`);
await setTheme("light");
await page.waitForTimeout(300);
await page.screenshot({ path: `${shots}/llm-agent-float-2-open-light.png` });
await setTheme("dark");
await page.waitForTimeout(300);
await page.screenshot({ path: `${shots}/llm-agent-float-3-open-dark.png` });
await setTheme("auto");

// 3. dragged by the title bar, and back in the same place after a reload
const bar = float.locator(".bar .name");
const from = await bar.boundingBox();
const sx = from.x + 20;
const sy = from.y + from.height / 2;
await page.mouse.move(sx, sy);
await page.mouse.down();
await page.mouse.move(sx - 200, sy - 80, { steps: 8 });
await page.mouse.move(sx - 400, sy - 120, { steps: 8 });
await page.mouse.up();
const moved = await rect();
if (Math.abs(moved.x - (r.x - 400)) > 2 || Math.abs(moved.y - (r.y - 120)) > 2)
  fail(`drag moved the window to ${moved.x},${moved.y} from ${r.x},${r.y}`);
await page.reload();
await box.waitFor({ timeout: 60000 });
r = await rect();
if (Math.abs(r.x - moved.x) > 1 || Math.abs(r.y - moved.y) > 1)
  fail(`after a reload the window is at ${r.x},${r.y}, not ${moved.x},${moved.y}`);
await panel.getByText("float question").first().waitFor({ timeout: 15000 });

// 4. HA navigation keeps the window, the same panel and the chat, and updates the page context
await page.evaluate(() => {
  window.stillHere = true;
  document.querySelector("llm-agent-float").shadowRoot.querySelector("llm-agent-panel").marker = 1;
});
await navigate("/config/integrations");
await page.locator("ha-config-integrations").waitFor({ state: "attached", timeout: 30000 });
const kept = await page.evaluate(() => {
  const p = document.querySelector("llm-agent-float").shadowRoot.querySelector("llm-agent-panel");
  return { reloaded: !window.stillHere, same: p?.marker === 1 };
});
if (kept.reloaded) fail("navigation reloaded the page");
if (!kept.same) fail("navigation replaced the panel in the window");
if (!(await win.isVisible())) fail("the window closed on navigation");
await panel.locator(".msg.assistant", { hasText: REPLY }).first().waitFor({ timeout: 5000 });
const ctxPath = () => panel.evaluate((p) => p.pageContext?.path);
// HA moves /config/integrations on to /config/integrations/dashboard by itself
const onIntegrations = async () => (await ctxPath())?.startsWith("/config/integrations");
for (let i = 0; i < 30 && !(await onIntegrations()); i++) await page.waitForTimeout(100);
if (!(await onIntegrations())) fail(`page context path is ${await ctxPath()}`);
for (let i = 0; i < 30 && !(await chip.getAttribute("title"))?.startsWith("/config/integrations"); i++)
  await page.waitForTimeout(100);
if (!(await chip.getAttribute("title"))?.startsWith("/config/integrations"))
  fail(`the chip did not follow navigation: ${await chip.getAttribute("title")}`);
await page.waitForTimeout(500);
await page.screenshot({ path: `${shots}/llm-agent-float-4-integrations.png` });

// 5. a more-info dialog opens above the window and refreshes the page context
await panel.evaluate((p) => (p.pageContext = undefined));
await page.evaluate(() =>
  document.querySelector("home-assistant").dispatchEvent(
    new CustomEvent("hass-more-info", {
      detail: { entityId: "input_boolean.e2e_switch" },
      bubbles: true,
      composed: true,
    }),
  ),
);
await page.locator("ha-more-info-dialog").waitFor({ state: "attached", timeout: 15000 });
await page.waitForTimeout(800);
for (let i = 0; i < 30 && !(await ctxPath()); i++) await page.waitForTimeout(100);
if (!(await ctxPath())) fail("opening more-info did not refresh the page context");
const onTop = await page.evaluate(([x, y]) => {
  let el = document.elementFromPoint(x, y);
  while (el?.shadowRoot) {
    const inner = el.shadowRoot.elementFromPoint(x, y);
    if (!inner || inner === el) break;
    el = inner;
  }
  for (let n = el; n; n = n.parentElement ?? n.getRootNode().host) if (n.localName === "llm-agent-float") return true;
  return false;
}, [r.x + r.width / 2, r.y + 60]);
await page.screenshot({ path: `${shots}/llm-agent-float-5-more-info.png` });
if (onTop) fail("the window is drawn above HA's more-info dialog");
await page.keyboard.press("Escape");
await page.locator("ha-more-info-dialog").waitFor({ state: "detached", timeout: 15000 }).catch(() => {});
if (!(await win.isVisible())) fail("closing the more-info dialog closed the window");

// 6. Esc: the @ list takes the first press, the window the second
await fill("");
await box.pressSequentially("@e2e_sw");
await panel.locator("ul.mentions li").first().waitFor({ timeout: 10000 });
await box.press("Escape");
if (!(await win.isVisible())) fail("Esc closed the window while the @ list was open");
if (await panel.locator("ul.mentions").count()) fail("Esc did not close the @ list");
await box.press("Escape");
await button.waitFor({ timeout: 5000 });
if (await win.isVisible()) fail("Esc did not close the window");

// 7. minimize leaves the title bar; restore brings the chat back
await button.click();
await box.waitFor({ timeout: 10000 });
await float.getByRole("button", { name: "Minimize" }).click();
if ((await rect()).height > 60) fail(`a minimized window is ${(await rect()).height}px tall`);
if (await button.isVisible()) fail("the button shows while the window is minimized");
await float.getByRole("button", { name: "Restore" }).click();
await box.waitFor({ timeout: 5000 });

// 8. the full panel opens in place, with the same chats, and has no button of its own
await float.getByRole("button", { name: "Open the full panel" }).click();
await page.waitForURL(/\/llm-agent$/, { timeout: 15000 });
if (!(await page.evaluate(() => window.stillHere))) fail("Open the full panel reloaded the page");
const full = page.locator("ha-panel-custom llm-agent-panel");
await full.locator(".composer").waitFor({ timeout: 30000 });
await full.getByText("float question").first().waitFor({ timeout: 15000 });
await page.waitForTimeout(1500); // longer than the button's once-a-second check
if (await button.isVisible()) fail("the button shows on the LLM Agent panel");
if (await win.isVisible()) fail("the window shows on the LLM Agent panel");

// 9. a phone: a sheet that fills most of the screen and does not drag, and a button
// clear of HA's tab bar and floating buttons
await page.setViewportSize({ width: 390, height: 844 });
await navigate("/config/integrations");
await page.locator("ha-config-integrations").waitFor({ state: "attached", timeout: 30000 });
await button.waitFor({ timeout: 10000 });
await page.waitForTimeout(1500);
const overlap = await page.evaluate(() => {
  const btn = document.querySelector("llm-agent-float").shadowRoot.querySelector(".fab").getBoundingClientRect();
  const found = [];
  const walk = (root) => {
    for (const el of root.querySelectorAll("*")) {
      if (el.localName === "ha-fab" || el.getAttribute("slot") === "fab" || el.id === "tabbar") found.push(el);
      if (el.shadowRoot) walk(el.shadowRoot);
    }
  };
  walk(document);
  return found
    .map((el) => ({ name: el.localName + (el.id ? `#${el.id}` : ""), r: el.getBoundingClientRect() }))
    .filter(({ r }) => r.width && r.height && r.left < btn.right && r.right > btn.left && r.top < btn.bottom && r.bottom > btn.top)
    .map(({ name }) => name);
});
await page.screenshot({ path: `${shots}/llm-agent-float-6-phone-button.png` });
if (overlap.length) fail(`the button covers ${overlap.join(", ")} on a phone`);
await button.click();
await box.waitFor({ timeout: 10000 });
r = await rect();
if (r.x !== 0 || Math.round(r.width) !== 390 || r.height < 844 * 0.8 || Math.round(r.y + r.height) !== 844)
  fail(`the phone sheet is ${JSON.stringify(r)}`);
const top = await bar.boundingBox();
await page.mouse.move(top.x + 20, top.y + 10);
await page.mouse.down();
await page.mouse.move(top.x + 20, top.y + 200, { steps: 8 });
await page.mouse.up();
if (Math.abs((await rect()).y - r.y) > 1) fail("the phone sheet moved when dragged");
await page.screenshot({ path: `${shots}/llm-agent-float-7-phone-open.png` });
await page.setViewportSize({ width: 1280, height: 800 });

// 10. the open window in WebKit (Safari and the iPhone app)
const wk = await webkit.launch();
const wkPage = await wk.newPage({ viewport: { width: 1280, height: 800 } });
wkPage.on("pageerror", (e) => errors.push(`webkit: ${e}`));
await wkPage.addInitScript((t) => {
  localStorage.setItem("hassTokens", JSON.stringify(t));
  localStorage.setItem("llm-agent-float", JSON.stringify({ state: "open", w: 420, h: 620 }));
}, tokens);
await wkPage.goto(`${ha}/`);
const wkPanel = wkPage.locator("llm-agent-float llm-agent-panel");
await wkPanel.locator(".composer .box").waitFor({ timeout: 60000 });
await wkPanel.getByText("float question").first().waitFor({ timeout: 15000 }).catch(() => {});
await wkPage.waitForTimeout(500);
await wkPage.screenshot({ path: `${shots}/llm-agent-float-8-webkit.png` });
const wkRect = await wkPage.locator("llm-agent-float .win").boundingBox();
if (!wkRect || Math.round(wkRect.width) !== 420) fail(`WebKit window is ${JSON.stringify(wkRect)}`);
await wk.close();

// 11. the option off: open pages drop the button at once, new pages never load it
const API = "/api/config/config_entries/options/flow";
const rest = async (method, path, body) => {
  const res = await fetch(`${ha}${path}`, {
    method,
    headers: { authorization: `Bearer ${tokens.access_token}`, "content-type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  return res.json().catch(() => null);
};
await float.getByRole("button", { name: "Close" }).click();
await button.waitFor({ timeout: 5000 });
const entryId = (await rest("GET", "/api/config/config_entries/entry?domain=llm_agent"))[0].entry_id;
const flow = await rest("POST", API, { handler: entryId });
await rest("POST", `${API}/${flow.flow_id}`, { next_step_id: "settings" });
const off = await rest("POST", `${API}/${flow.flow_id}`, {
  approval_mode: "ask_risky",
  household: { float_button: false },
});
if (off?.type !== "create_entry") fail(`option not saved: ${JSON.stringify(off)}`);
await button.waitFor({ state: "hidden", timeout: 15000 });
await page.goto(`${ha}/`);
await page.locator("home-assistant").waitFor({ state: "attached", timeout: 30000 });
await page.waitForTimeout(3000);
if (await float.count()) fail("a new page still loaded the floating chat with the option off");
await page.screenshot({ path: `${shots}/llm-agent-float-9-off.png` });

if (errors.length) fail(`page errors: ${errors.join("; ")}`);
await browser.close();
console.log("E2E FLOAT PASS");
