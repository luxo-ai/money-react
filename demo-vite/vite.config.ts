import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  optimizeDeps: {
    // prevent esbuild prebundle so Vite handles CSS Modules in your lib
    exclude: ["money-react"], // <-- your package name here
  },
  plugins: [react()],
});
