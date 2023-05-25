import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

const mdx = await import("@mdx-js/rollup");

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_DEPLOY_PATH,
  optimizeDeps: {
    include: ["react/jsx-runtime"],
  },
  plugins: [
    react(),
    mdx.default({ remarkPlugins: [], providerImportSource: "@mdx-js/react" }),
  ],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        math: "always",
        relativeUrls: true,
        javascriptEnabled: true,
        paths: ["src", "src/styles"],
      },
    },
  },
  test: {
    environment: "happy-dom",
  },
});
