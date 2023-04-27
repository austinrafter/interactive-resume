import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

const mdx = await import("@mdx-js/rollup")

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ["react/jsx-runtime"],
  },
  plugins: [react(), mdx.default({ remarkPlugins: [] })],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },

});
