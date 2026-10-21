import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests", timeout: 45000, workers: 1,
  use: { baseURL: "http://127.0.0.1:3100", browserName: "chromium", headless: true },
  webServer: { command: "npm run start", url: "http://127.0.0.1:3100", reuseExistingServer: true, timeout: 60000 },
  reporter: [["list"]], outputDir: "test-results"
});
