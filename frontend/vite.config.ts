import solid from "@solidjs/vite-plugin";
import { defineConfig } from "vite";

// One self-contained ES module, served by the integration from www/.
// The Solid compiler sees only .tsx files (its default filter); the Lit views still in
// .ts files are compiled as before while the panel moves over one element at a time.
export default defineConfig({
  plugins: [solid()],
  build: {
    outDir: "../custom_components/llm_agent/www",
    emptyOutDir: false, // www/i18n holds the translations
    target: "es2022",
    sourcemap: false,
    // Vite's own minify option leaves whitespace alone in lib mode with es output, but
    // the bundler's output minifier does not: measured 2026-11-20 it took the panel from
    // 111765 to 102648 bytes gzipped, with Lit and Solid both still in it.
    rolldownOptions: { output: { minify: true } },
    lib: {
      entry: "src/panel.tsx",
      formats: ["es"],
      fileName: () => "llm-agent-panel.js",
    },
  },
});
