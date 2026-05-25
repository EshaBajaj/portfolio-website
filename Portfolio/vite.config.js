import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages project site: https://<user>.github.io/portfolio-website/
const REPO_NAME = "portfolio-website";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === "serve" ? "/" : `/${REPO_NAME}/`,
}));
