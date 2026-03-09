import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: "jsx", // Treat .js files as JSX
    include: /.*\.(js|jsx)$/,
  },
  test: {
    globals: true,
    environment: "jsdom",
    testTimeout: 30000, // 30s global safety net - tests fail fast with 400ms internal timeouts
    include: ["tests/**/*.test.jsx", "tests/**/*.test.ts", "tests/**/*.test.tsx", "tests/**/*.test.js"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});