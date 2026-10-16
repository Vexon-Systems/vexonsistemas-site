import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.ts",
  fullyParallel: true,
  use: {
    baseURL: "http://127.0.0.1:3002",
    trace: "on-first-retry",
  },
  webServer: {
    command:
      "node node_modules/wrangler/bin/wrangler.js pages dev out --ip 127.0.0.1 --port 3002 --show-interactive-dev-session=false",
    url: "http://127.0.0.1:3002",
    reuseExistingServer: false,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
