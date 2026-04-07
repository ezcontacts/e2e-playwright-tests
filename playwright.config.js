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
  retries: process.env.CI ? 1 : 0,
  timeout: 180_000,
  expect: {
    timeout: 60000,
  },
  use: {
    headless: isHeadless,
    viewport: { width: 1440, height: 900 },
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: "desktop",
<<<<<<< HEAD
      features: "test/features/**/*.feature",
      steps: ["test/steps/**/*.ts", "test/fixtures/fixture.ts"],
      outputDir: "test/generated/desktop",
=======
>>>>>>> 8e08bbb63f34037b2d893fd50c8a4f0d924399ad
      use: {
        viewport: { width: 1440, height: 900 },
        isMobile: false,
      },
    },
    {
      name: "mobile",
<<<<<<< HEAD
      features: "test/features/**/*.feature",
      steps: ["test/steps/**/*.ts", "test/fixtures/fixture.ts"],
      outputDir: "test/generated/mobile",
=======
>>>>>>> 8e08bbb63f34037b2d893fd50c8a4f0d924399ad
      use: {
        ...devices["iPhone 14"],
      },
    },
  ],
});
