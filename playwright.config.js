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
  reporter,
  workers: 4,
  timeout: 120000,
  use: {
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "on-first-retry",

    ignoreHTTPSErrors: true,
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
      },
    }),
  ],
});