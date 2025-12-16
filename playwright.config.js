import { defineConfig } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";
import { devices } from "@playwright/test";

const isHeadless = process.env.HEADLESS !== "false";

const testDir = defineBddConfig({
  testDir: "test/generated",
  features: "test/features/**/*.feature",
  steps: "test/**/*.ts",
});

export default defineConfig({
  testDir,
  reporter: [
    ["html", { open: "never" }],
    ["json", { outputFile: "reports/cucumber.json" }],
  ],
  fullyParallel: true,
  workers: process.env.CI ? 2 : undefined,
  retries: 0,
  timeout: 120000,
  expect: {
    timeout: 60000,
  },
  use: {
    headless: isHeadless,
    viewport: { width: 1440, height: 900 },
  },

  projects: [
    {
      name: "Desktop",
      use: {
        viewport: { width: 1440, height: 900 },
        isMobile: false,
      },
    },
  ],
});
