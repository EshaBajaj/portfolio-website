import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Dedicated port so this app never shares 5173 with other Vite projects (e.g. PORTAL).
const PORT = 5180;

export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    port: PORT,
    strictPort: true,
    open: "/",
    hmr: {
      port: PORT,
    },
  },
});
