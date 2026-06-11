import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// User page (ololonly.github.io) is served from the domain root, so base = "/".
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
});
