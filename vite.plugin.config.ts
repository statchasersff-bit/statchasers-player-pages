import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  build: {
    outDir: path.resolve(
      import.meta.dirname,
      "wordpress-plugin/statchasers-player-pages/assets"
    ),
    emptyOutDir: false,
    lib: {
      entry: path.resolve(import.meta.dirname, "client/src/wp-entry.tsx"),
      name: "SCPlayers",
      formats: ["es"],
      fileName: () => "players.js",
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) return "players.css";
          return assetInfo.name ?? "asset";
        },
        inlineDynamicImports: true,
      },
    },
    cssCodeSplit: false,
    minify: true,
    sourcemap: false,
  },
});
