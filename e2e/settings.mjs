// The integration's settings inside the panel: the options flow drawn in the panel,
// a save that reloads the integration without leaving the panel, the jump to the
// integration's page, and that a household member gets neither.
// Usage: await settingsSteps({ page, panel, browser, ha, tokens, shots, fail, fill, box })

const API = "/api/config/config_entries/options/flow";

export async function settingsSteps({ page, panel, browser, ha, tokens, shots, fail, fill, box }) {
  const rest = async (method, path, body, token = tokens.access_token) => {
    const r = await fetch(`${ha}${path}`, {
      method,
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    return { status: r.status, body: await r.json().catch(() => null) };
  };
  const entryId = (await rest("GET", "/api/config/config_entries/entry?domain=llm_agent")).body[0]
    .entry_id;
  /** The saved options, read back through the same flow (HA has no other read of them). */
  const saved = async () => {
    const flow = (await rest("POST", API, { handler: entryId })).body;
    const form = (await rest("POST", `${API}/${flow.flow_id}`, { next_step_id: "settings" })).body;
    await rest("DELETE", `${API}/${flow.flow_id}`);
    const out = {};
    for (const f of form.data_schema)
      for (const g of f.schema ?? [f]) out[g.name] = g.description?.suggested_value ?? g.default;
    return out;
  };
  const sheet = panel.locator("llm-agent-settings");
  const gear = () => panel.getByRole("button", { name: "Panel settings" });
  const theme = async (value) => {
    if (!(await panel.locator(".prefs").count())) await gear().click();
    await panel.getByLabel("Theme").selectOption(value);
  };
  const openSettings = async () => {
    if (!(await panel.locator(".prefs").count())) await gear().click();
    await panel.getByRole("button", { name: "Integration settings" }).click();
    await sheet.getByRole("button", { name: "Settings", exact: true }).waitFor({ timeout: 15000 });
  };
  const openForm = async () => {
    await openSettings();
    await sheet.getByRole("button", { name: "Settings", exact: true }).click();
    await sheet.getByLabel("Tool calls per message").waitFor({ timeout: 15000 });
  };
  const noSideScroll = async (what) => {
    const wide = await sheet.evaluate((el) => {
      const body = el.shadowRoot.querySelector(".body");
      return body.scrollWidth - body.clientWidth;
    });
    if (wide > 1) fail(`${what} scrolls sideways by ${wide}px`);
  };

  // 21a. the menu and a form, in the dark theme
  await theme("dark");
  await openSettings();
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${shots}/llm-agent-12-settings-menu.png` });
  for (const item of ["Storage and spend", "Add a provider", "Edit a provider", "Export settings"])
    if (!(await sheet.getByRole("button", { name: item }).count())) fail(`menu has no "${item}"`);
  await sheet.getByRole("button", { name: "Settings", exact: true }).click();
  const steps = sheet.getByLabel("Tool calls per message");
  await steps.waitFor({ timeout: 15000 });
  if ((await steps.inputValue()) !== "25") fail(`max steps shows ${await steps.inputValue()}`);
  // a collapsed section opens, and its fields carry the translated labels and units
  const context = sheet.locator("details", { has: page.locator("summary", { hasText: "Context" }) });
  if (await context.evaluate((d) => d.open)) fail("the Context section should start collapsed");
  await context.locator("summary").click();
  await sheet.getByLabel("Recent turns never shortened").waitFor();
  if (!(await sheet.getByText("Ask before risky actions (recommended)").count()))
    fail("approval modes are not translated");
  await context.scrollIntoViewIfNeeded();
  await page.screenshot({ path: `${shots}/llm-agent-12b-settings-form-dark.png` });

  // 21b. HA validates, not the panel: a bad rule line comes back as the flow's error
  const rules = sheet.locator("details", { has: page.locator("summary", { hasText: "Approval rules" }) });
  await rules.locator("summary").click();
  const ruleBox = rules.locator("textarea");
  await ruleBox.fill("perhaps light.*");
  await sheet.getByRole("button", { name: "Submit" }).click();
  await sheet.getByText("These rule lines couldn't be read").waitFor({ timeout: 15000 });
  // the form HA sent back keeps what was typed
  if (!(await rules.evaluate((d) => d.open))) await rules.locator("summary").click();
  if ((await rules.locator("textarea").inputValue()) !== "perhaps light.*")
    fail("the form HA sent back lost the typed rule");
  await rules.locator("textarea").fill("");

  // 21c. a harmless change saves, reloads the integration, and the panel stays put
  await sheet.getByLabel("Tool calls per message").fill("31");
  await sheet.getByRole("button", { name: "Submit" }).click();
  await sheet.getByText("Saved. LLM Agent reloaded with the new settings.").waitFor({ timeout: 30000 });
  await page.screenshot({ path: `${shots}/llm-agent-12c-settings-saved.png` });
  if (!page.url().endsWith("/llm-agent")) fail(`the save left the panel for ${page.url()}`);
  const after = await saved();
  if (after.max_steps !== 31) fail(`max_steps read back as ${after.max_steps}`);
  if (after.approval_rules) fail(`the bad rule was saved: ${after.approval_rules}`);
  await sheet.getByRole("button", { name: "Back to chat" }).click();
  if (await sheet.count()) fail("the settings stayed open after Back to chat");
  // the reloaded integration answers in the same panel, without a page reload
  await panel.getByRole("button", { name: "New chat" }).first().click();
  await fill("please switch on the test switch");
  await box.press("Enter");
  await panel.getByText("Done, the test switch is on.").waitFor({ timeout: 30000 });

  // 21d. the light theme, then a phone
  await theme("light");
  await openForm();
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${shots}/llm-agent-12d-settings-form-light.png` });
  await sheet.getByRole("button", { name: "Close" }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  await openForm();
  const cost = sheet.locator("details", { has: page.locator("summary", { hasText: "Cost and limits" }) });
  if (!(await cost.evaluate((d) => d.open))) await cost.locator("summary").click();
  await page.waitForTimeout(300);
  await noSideScroll("the settings form at 390px");
  await page.screenshot({ path: `${shots}/llm-agent-12e-settings-phone.png` });
  await sheet.getByRole("button", { name: "Close" }).click();
  await page.setViewportSize({ width: 1280, height: 800 });
  await theme("auto");

  // 21e. Open in Home Assistant goes to the integration's page in the same app
  await page.evaluate(() => (window.stillHere = true));
  if (!(await panel.locator(".prefs").count())) await gear().click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${shots}/llm-agent-12-settings-gear.png` });
  await panel.getByRole("button", { name: "Open in Home Assistant" }).click();
  await page.waitForURL(/\/config\/integrations\/integration\/llm_agent$/, { timeout: 15000 });
  if (!(await page.evaluate(() => window.stillHere))) fail("Open in Home Assistant reloaded the page");
  await page.locator("ha-config-integration-page").waitFor({ timeout: 30000 });
  await page.getByText("LLM Agent").first().waitFor({ timeout: 30000 });
  await page.screenshot({ path: `${shots}/llm-agent-12f-integration-page.png` });
  await page.goBack();
  await box.waitFor({ timeout: 30000 });

  // 21f. a household member: HA refuses the flow API, and the panel shows neither entry
  const ws = await wsSession(ha, tokens.access_token);
  const user = await ws.call({
    type: "config/auth/create",
    name: "E2E member",
    group_ids: ["system-users"],
  });
  await ws.call({
    type: "config/auth_provider/homeassistant/create",
    user_id: user.user.id,
    username: "member",
    password: "member-pass-123",
  });
  ws.close();
  const memberTokens = await login(ha, "member", "member-pass-123");
  const refused = await rest("POST", API, { handler: entryId }, memberTokens.access_token);
  if (refused.status !== 401) fail(`a member opened the options flow: HTTP ${refused.status}`);
  // household chat on, so the member can open the panel at all
  const flow = (await rest("POST", API, { handler: entryId })).body;
  await rest("POST", `${API}/${flow.flow_id}`, { next_step_id: "settings" });
  const on = await rest("POST", `${API}/${flow.flow_id}`, {
    approval_mode: "ask_risky",
    household: { household_chat: true, member_daily_cap: 0.5 },
  });
  if (on.body?.type !== "create_entry") fail(`household chat not turned on: ${JSON.stringify(on.body)}`);
  const member = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await member.addInitScript((t) => localStorage.setItem("hassTokens", JSON.stringify(t)), memberTokens);
  let memberPanel;
  for (let i = 0; i < 20; i++) {
    // the panel is opened to members by the reload the save started
    await member.goto(`${ha}/llm-agent`);
    memberPanel = member.locator("llm-agent-panel");
    if (await memberPanel.locator(".composer").waitFor({ timeout: 5000 }).then(() => true, () => false))
      break;
  }
  // the popover must be open while its entries are counted, or no entry proves nothing
  const prefs = memberPanel.locator(".prefs");
  for (let i = 0; i < 10 && !(await prefs.getByLabel("Theme").isVisible()); i++) {
    if (!(await prefs.count())) await memberPanel.getByRole("button", { name: "Panel settings" }).click();
    await member.waitForTimeout(500);
  }
  if (!(await prefs.getByLabel("Theme").isVisible())) fail("the member's panel settings did not open");
  for (const name of ["Integration settings", "Open in Home Assistant"])
    if (await prefs.getByRole("button", { name }).count()) fail(`a member sees "${name}"`);
  await member.screenshot({ path: `${shots}/llm-agent-12g-member-prefs.png` });
  await member.close();
}

/** A WebSocket session on the HA API, for the calls that have no REST form. */
async function wsSession(ha, token) {
  const sock = new WebSocket(`${ha.replace(/^http/, "ws")}/api/websocket`);
  const pending = new Map();
  let id = 0;
  let authed;
  const ready = new Promise((r) => (authed = r));
  sock.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.type === "auth_required") sock.send(JSON.stringify({ type: "auth", access_token: token }));
    else if (msg.type === "auth_ok") authed();
    else if (msg.type === "result") {
      const p = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.success) p.resolve(msg.result);
      else p.reject(new Error(`${msg.error?.code}: ${msg.error?.message}`));
    }
  };
  await ready;
  return {
    call: (m) =>
      new Promise((resolve, reject) => {
        pending.set(++id, { resolve, reject });
        sock.send(JSON.stringify({ ...m, id }));
      }),
    close: () => sock.close(),
  };
}

/** Log in with a password the way the frontend does, and return its token JSON. */
async function login(ha, username, password) {
  const client_id = `${ha}/`;
  const post = async (path, body, form = false) => {
    const r = await fetch(`${ha}${path}`, {
      method: "POST",
      headers: { "content-type": form ? "application/x-www-form-urlencoded" : "application/json" },
      body: form ? new URLSearchParams(body).toString() : JSON.stringify(body),
    });
    if (!r.ok) throw new Error(`${path}: HTTP ${r.status} ${await r.text()}`);
    return r.json();
  };
  const flow = await post("/auth/login_flow", {
    client_id,
    handler: ["homeassistant", null],
    redirect_uri: client_id,
  });
  const done = await post(`/auth/login_flow/${flow.flow_id}`, { client_id, username, password });
  const tokens = await post(
    "/auth/token",
    { grant_type: "authorization_code", code: done.result, client_id },
    true,
  );
  return {
    ...tokens,
    hassUrl: ha,
    clientId: client_id,
    expires: Date.now() + tokens.expires_in * 1000,
  };
}
