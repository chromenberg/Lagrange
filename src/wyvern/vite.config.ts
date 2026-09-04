import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  build: {
    outDir: "../../build/",
    emptyOutDir: true,
    cssCodeSplit: true,
    rolldownOptions: {
      treeshake: true,
      output: {
        codeSplitting: true,
        minify: {
          codegen: {
            removeWhitespace: true,
          },
          mangle: {
            toplevel: true
          }
        },
        chunkFileNames: "assets/[hash:16].js",
      },
    },
    chunkSizeWarningLimit: 500,
    cssMinify: "lightningcss",
    
    minify: true,
  },
  root: "./",
});
