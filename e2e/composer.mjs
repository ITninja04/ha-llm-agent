// The chat box is a Markdown editor (frontend/src/composer.ts), not a textarea, so the
// textarea helpers (fill, inputValue) do not apply. These helpers and steps are shared by
// panel.mjs (Chromium) and webkit.mjs, because caret handling inside shadow roots differs
// between the two engines and the iPhone app is WebKit.

/** The box, and how to read and replace its text the way a person would. */
export function composer(page, panel) {
  const box = panel.locator(".composer .box");
  // The text as shown: one element per line, as the person sees it, not the editor's model.
  const value = () => box.evaluate((el) => [...el.children].map((line) => line.textContent).join("\n"));
  // Select everything and paste over it. A paste is how multi-line text gets into a chat
  // box; typing it would run the editor's list continuation on every new line.
  const fill = async (text) => {
    await box.focus();
    await page.keyboard.press("ControlOrMeta+a");
    await box.evaluate((el, t) => {
      const data = new DataTransfer();
      data.setData("text/plain", t);
      const ev = new ClipboardEvent("paste", { clipboardData: data, bubbles: true, cancelable: true, composed: true });
      if (!ev.clipboardData) throw new Error("this browser drops clipboardData from a constructed paste event");
      el.dispatchEvent(ev);
    }, text);
  };
  // Computed styles of the first element inside the box that matches `sel`, or null.
  const style = (sel, props) =>
    box.evaluate(
      (el, [sel, props]) => {
        const hit = el.querySelector(sel);
        if (!hit) return null;
        const cs = getComputedStyle(hit);
        return Object.fromEntries(props.map((p) => [p, cs.getPropertyValue(p)]));
      },
      [sel, props],
    );
  return { box, value, fill, style };
}

async function setTheme(panel, theme, fail) {
  if (!(await panel.locator(".prefs").count()))
    await panel.getByRole("button", { name: "Panel settings" }).click();
  await panel.getByLabel("Theme").selectOption(theme);
  await panel.locator(".messages").click({ position: { x: 20, y: 300 } }); // outside the popover
  if (await panel.locator(".prefs").count()) fail("panel settings stayed open after an outside click");
  await panel.page().waitForTimeout(400); // colour transitions
}

const transparent = (c) => !c || c === "transparent" || /rgba\(0, 0, 0, 0\)/.test(c);

/** Ozzie's acceptance list for the box: each kind of Markdown is styled while it is typed,
 * before anything is sent. Fails on the first item that shows as plain text. */
export async function formattingSteps({ page, panel, shots, tag, fail }) {
  const { box, value, fill, style } = composer(page, panel);
  await panel.getByRole("button", { name: "New chat" }).first().click();
  const base = await box.evaluate((el) => {
    const cs = getComputedStyle(el);
    return { size: parseFloat(cs.fontSize), font: cs.fontFamily, color: cs.color };
  });

  // 1. a heading is larger and bold
  await fill("");
  await box.pressSequentially("# Living room");
  const h1 = await style(".TMH1", ["font-size", "font-weight"]);
  if (!h1) fail(`a typed heading is not styled as one: ${await box.innerHTML()}`);
  if (parseFloat(h1["font-size"]) < base.size * 1.2) fail(`heading is not larger: ${h1["font-size"]} vs ${base.size}px`);
  if (Number(h1["font-weight"]) < 600) fail(`heading is not bold: ${h1["font-weight"]}`);

  // 2. * and - lines are list items: the marker is accented and wrapped text hangs past it
  await fill("");
  await box.pressSequentially("* lamp");
  await box.press("Shift+Enter");
  await box.pressSequentially("fan");
  if ((await value()) !== "* lamp\n* fan") fail(`list did not continue: ${JSON.stringify(await value())}`);
  if ((await box.locator(".TMUL").count()) !== 2) fail("* lines are not list items");
  await fill("");
  await box.pressSequentially("- porch");
  const li = await style(".TMUL", ["padding-left"]);
  const marker = await style(".TMMark_TMUL", ["color", "font-weight"]);
  if (!li || !marker) fail("a - line is not a list item");
  if (parseFloat(li["padding-left"]) <= 0) fail("a list item has no hanging indent");
  if (marker.color === base.color) fail("the list marker looks like plain text");

  // 3. a fenced block and inline code are monospace on a shaded background
  await fill("");
  await box.pressSequentially("```");
  await box.press("Shift+Enter");
  await box.pressSequentially("yaml: 1");
  await box.press("Shift+Enter");
  await box.pressSequentially("```");
  const fenced = await style(".TMFencedCodeBacktick", ["font-family", "background-color"]);
  if (!fenced) fail(`a fenced block is not styled as code: ${await box.innerHTML()}`);
  if (!/mono/i.test(fenced["font-family"]) || fenced["font-family"] === base.font)
    fail(`fenced code is not monospace: ${fenced["font-family"]}`);
  if (transparent(fenced["background-color"])) fail("fenced code has no shaded background");
  await fill("");
  await box.pressSequentially("run `ls` now");
  const code = await style("code.TMCode", ["font-family", "background-color"]);
  if (!code) fail("inline code is not styled as code");
  if (!/mono/i.test(code["font-family"])) fail(`inline code is not monospace: ${code["font-family"]}`);
  if (transparent(code["background-color"])) fail("inline code has no shaded background");

  // 4. bold and italic
  await fill("");
  await box.pressSequentially("**bold** and _italic_");
  const strong = await style("strong.TMStrong", ["font-weight"]);
  const em = await style("em.TMEm", ["font-style"]);
  if (!strong || Number(strong["font-weight"]) < 600) fail("**bold** is not bold");
  if (!em || em["font-style"] !== "italic") fail("_italic_ is not italic");

  // 5. a picked entity shows as a pill, while the stored draft keeps the exact id
  await fill("");
  await box.pressSequentially("turn on @e2e_sw");
  await panel.locator("ul.mentions li", { hasText: "input_boolean.e2e_switch" }).waitFor({ timeout: 10000 });
  await box.press("Enter");
  const pill = box.locator(".TMMention");
  if ((await pill.count()) !== 1 || (await pill.innerText()) !== "@E2E switch")
    fail(`the picked name is not a pill: ${await box.innerHTML()}`);
  if (transparent((await style(".TMMention", ["background-color"]))["background-color"]))
    fail("the mention pill has no background");
  const drafts = await page.evaluate(() =>
    Object.keys(localStorage)
      .filter((k) => k.startsWith("llm-agent-drafts-"))
      .map((k) => localStorage.getItem(k))
      .join(""),
  );
  if (!drafts.includes("turn on input_boolean.e2e_switch")) fail(`the stored draft lost the id: ${drafts}`);

  // Text that looks like HTML is shown as text, never turned into elements.
  await page.evaluate(() => delete window.__xss);
  await fill('<img src=x onerror="window.__xss=1"> <b>not bold</b>');
  await page.waitForTimeout(200);
  if (await box.locator("img, b").count()) fail("typed HTML became elements in the box");
  if (await page.evaluate(() => window.__xss)) fail("typed HTML ran a script");

  // Screenshots of everything at once: light and dark at desktop width, and a phone.
  const sample = [
    "# Living room",
    "* lamp",
    "- porch light",
    "**bold** and _italic_ with `inline code`",
    "```",
    "light: on",
    "```",
    "turn on @E2E switch please",
  ].join("\n");
  await fill(sample);
  if ((await value()) !== sample) fail(`pasted text changed: ${JSON.stringify(await value())}`);
  if ((await box.locator(".TMMention").count()) !== 1) fail("a pasted known name is not a pill");
  const composerBox = panel.locator(".composer");
  for (const theme of ["light", "dark"]) {
    await setTheme(panel, theme, fail);
    await composerBox.screenshot({ path: `${shots}/llm-agent-12-composer-${tag}-${theme}.png` });
  }
  const size = page.viewportSize();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(300);
  await composerBox.screenshot({ path: `${shots}/llm-agent-12-composer-${tag}-phone.png` });
  const right = (await composerBox.boundingBox()).x + (await composerBox.boundingBox()).width;
  if (right > 391) fail(`composer wider than the phone: ${right}`);
  await page.setViewportSize(size);
  await setTheme(panel, "auto", fail);
  await fill("");
}
