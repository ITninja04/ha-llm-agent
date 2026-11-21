import solid from "@solidjs/vite-plugin";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

// The Solid 2.0 Notes preview, a build of its own so the Lit bundles never see the Solid
// compiler or runtime: their output is byte for byte what it was before this existed.
// Only the integration's hidden solid_preview option makes HA load this file.
export default defineConfig({
  plugins: [solid()],
  // styles.ts imports Lit's css tag; here it gets a 10 line stand-in (see the file)
  resolve: { alias: { lit: fileURLToPath(new URL("src/solid/lit-css.ts", import.meta.url)) } },
  build: {
    outDir: "../custom_components/llm_agent/www",
    emptyOutDir: false, // the Lit bundles and www/i18n live there too
    target: "es2022",
    sourcemap: false,
    lib: {
      entry: "src/solid/preview.tsx",
      formats: ["es"],
      fileName: () => "llm-agent-solid-preview.js",
    },
  },
});
