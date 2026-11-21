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
    lib: {
      entry: "src/panel.ts",
      formats: ["es"],
      fileName: () => "llm-agent-panel.js",
    },
  },
});
