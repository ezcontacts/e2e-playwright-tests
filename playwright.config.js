import { defineConfig, devices } from "@playwright/test";
import { defineBddProject } from "playwright-bdd";

const htmlProject =
  process.env.PLAYWRIGHT_HTML_PROJECT_RUNTIME ??
  process.env.PLAYWRIGHT_HTML_PROJECT ??
  "default";

const jsonReport =
  process.env.PLAYWRIGHT_JSON_OUTPUT_NAME ?? "reports/report.json";

const reporter = [
  ["json", { outputFile: jsonReport }],
  [
    "html",
    {
      outputFolder: `playwright-report/${htmlProject}`,
      open: "never",
    },
  ],
];

export default defineConfig({
  reporter,
  workers: 2,
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
