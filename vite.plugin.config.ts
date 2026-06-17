import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
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
  // Use the WordPress Tailwind config so every utility is scoped under
  // `.scpp-root` and marked !important. Without this the host theme's CSS
  // overrides the tool's styles and elements render as unstyled text.
  // (Mirrors vite.config.wp.ts; if omitted, Vite falls back to the default
  // postcss.config.js → tailwind.config.ts which lacks the scoping.)
  css: {
    postcss: {
      plugins: [
        tailwindcss({ config: "./tailwind.config.wp.ts" }),
        autoprefixer(),
      ],
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
