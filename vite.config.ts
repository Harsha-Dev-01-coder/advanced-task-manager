import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command, mode }) => ({
  base:
    mode === "github-pages" && command === "build"
      ? "/advanced-task-manager/"
      : "/",
  plugins: [react(), tailwindcss()],
}));