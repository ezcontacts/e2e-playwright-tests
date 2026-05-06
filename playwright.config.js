import { defineConfig, devices } from "@playwright/test";
import { defineBddProject } from "playwright-bdd";

const project = process.env.ENV_PLATFORM ?? "default";

const reporter = [
  ["json", { outputFile: `reports/${project}/report.json` }],
  [
    "html",
    {
      outputFolder: `playwright-report/${project}`,
      open: "never",
    },
  ],
];

export default defineConfig({
  reporter,
  workers: 4,
  timeout: 280_000,
  use: {
    headless: true,
    launchOptions: {
      args: [
        "--disable-blink-features=AutomationControlled",
        "--no-sandbox",
        "--disable-dev-shm-usage"
      ]
    },
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "only-on-failure",

    ignoreHTTPSErrors: true,
    actionTimeout: 20_000,
  },

  projects: [
    defineBddProject({
      name: "desktop",
      features: "test/features/**/*.feature",
      steps: ["test/steps/**/*.ts", "test/fixtures/fixture.ts"],
      outputDir: "test/generated/desktop",
      use: {
        viewport: { width: 1440, height: 900 },
        isMobile: false,
      },
    }),

    defineBddProject({
      name: "mobile",
      features: "test/features/**/*.feature",
      steps: ["test/steps/**/*.ts", "test/fixtures/fixture.ts"],
      outputDir: "test/generated/mobile",
      use: {
        ...devices["iPhone 14"],
        launchOptions: {
          args: ["--window-size=390,844"],
        },
      },
    }),
  ],
});
