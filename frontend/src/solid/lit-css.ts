// Stands in for "lit" in the Solid preview build only (see vite.solid.config.ts).
// styles.ts, the panel's shared CSS, is written with Lit's css tag, and importing it
// as it is pulled lit-html and Lit's reactive element into the Solid bundle: 19 kB of
// a 124 kB file, measured 2026-11-20, for a template tag the preview only reads text
// from. styles.ts has no ${} interpolation, so joining the strings is all css does here.
export function css(strings: TemplateStringsArray): { cssText: string; styleSheet: CSSStyleSheet } {
  const cssText = strings.join("");
  const styleSheet = new CSSStyleSheet();
  styleSheet.replaceSync(cssText);
  return { cssText, styleSheet };
}
