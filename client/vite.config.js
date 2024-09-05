import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:8800",
    },
  },
  build: {
    rollupOptions: {
      external: [
        "mysql2",
        "events",
        "stream",
        "buffer",
        "safer-buffer",
        "iconv-lite",
      ],
    },
  },
});
