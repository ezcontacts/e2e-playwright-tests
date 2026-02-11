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
  ]
];

export default defineConfig({

  testDir,
  reporter: [
    ["html", { open: "never" }],
    ["json", { outputFile: "reports/cucumber.json" }],

  ],
  fullyParallel: true,
  workers: process.env.CI ? 2 : undefined,
  retries: process.env.CI ? 1 : 0,
  timeout: 100000,
  expect: {
    timeout: 60000,
  },
  use: {
    headless: isHeadless,
    viewport: { width: 1440, height: 900 },
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    ignoreHTTPSErrors: true,
  },
  reporter,
  workers: 4,
  timeout: 120_000,
  use: {
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "on-first-retry",

    ignoreHTTPSErrors: true,
    actionTimeout: 20_000,

  },

  projects: [
    defineBddProject({
      name: "desktop",
      features: "test/features/**/*.feature",
      steps: [
        "test/steps/**/*.ts",
        "test/fixtures/fixture.ts",
      ],
      outputDir: "test/generated/desktop",
      use: {
        viewport: { width: 1440, height: 900 },
        isMobile: false,
      },
    }),

    defineBddProject({
      name: "mobile",
      features: "test/features/**/*.feature",
      steps: [
        "test/steps/**/*.ts",
        "test/fixtures/fixture.ts",
      ],
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
