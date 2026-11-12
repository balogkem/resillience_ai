import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// In development, Vite forwards /api/* to FastAPI on port 8000.
// The browser only ever talks to one origin, so the API needs no CORS rules.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000",
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
