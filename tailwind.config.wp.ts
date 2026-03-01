import baseConfig from "./tailwind.config";
import type { Config } from "tailwindcss";

export default {
  ...baseConfig,
  important: ".scpp-root",
} satisfies Config;
