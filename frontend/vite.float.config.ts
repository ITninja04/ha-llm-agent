import { defineConfig } from "vite";

// The floating chat, built apart from the panel so neither build splits shared code into
// a hashed chunk file. llm-agent-float.js is the loader HA puts on every page;
// llm-agent-float-window.js is loaded by it on first open and loads the panel itself.
export default defineConfig({
  build: {
    outDir: "../custom_components/llm_agent/www",
    emptyOutDir: false, // the panel bundle and www/i18n live there too
    target: "es2022",
    sourcemap: false,
    lib: {
      entry: {
        "llm-agent-float": "src/float.ts",
        "llm-agent-float-window": "src/floatwindow.ts",
      },
      formats: ["es"],
      fileName: (_format, name) => `${name}.js`,
    },
  },
});
