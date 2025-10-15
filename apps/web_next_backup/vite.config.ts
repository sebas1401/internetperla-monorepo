import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@internetperla/ui": path.resolve(__dirname, "../../packages/ui/src"),
      "@internetperla/shared-dtos": path.resolve(__dirname, "../../packages/shared-dtos/index.ts")
    }
  },
  server: {
    port: 3001,
    open: true
  },
  preview: {
    port: 3001,
    open: true
  }
});
