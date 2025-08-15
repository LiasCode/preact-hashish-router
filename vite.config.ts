import preact from "@preact/preset-vite";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  server: {
    host: true,
  },
  resolve: {
    alias: {
      "@router": resolve(resolve(__dirname), "./dist/"),
    },
  },
  define: {
    "process.env.IS_PREACT": JSON.stringify("true"),
  },
});
