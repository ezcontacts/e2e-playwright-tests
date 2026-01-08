import { defineConfig, devices } from "@playwright/test";
import { defineBddProject } from "playwright-bdd";

const htmlProject =
  process.env.PLAYWRIGHT_HTML_PROJECT_RUNTIME ??
  process.env.PLAYWRIGHT_HTML_PROJECT;

const reporter = htmlProject
  ? [
      [
        "html",
        {
          outputFolder: `playwright-report/${htmlProject}`,
          open: "never",
        },
      ],
    ]
  : [
      [
        "html",
        {
          open: "never",
        },
      ],
    ];

export default defineConfig({
  use: {
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "on-first-retry",
    ignoreHTTPSErrors: true,
  },

  reporter,

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
