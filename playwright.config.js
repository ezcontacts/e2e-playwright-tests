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


// const { defineConfig, devices } = require("@playwright/test");
// const { defineBddProject } = require("playwright-bdd");
// const xrayReporter = require("xray-cucumber-playwright-bdd");

// const htmlProject = process.env.PLAYWRIGHT_HTML_PROJECT_RUNTIME || "default";

// const reporter = [
//   ["json", { outputFile: `reports/cucumber-${htmlProject}.json` }],
//   //["json", { outputFile: `reports/report-${htmlProject}.json` }],
//   ["html", { outputFolder: `playwright-report/${htmlProject}`, open: "never" }],
//   [
//     xrayReporter,
//     {
//       jiraUrl: process.env.XRAY_JIRA_URL,
//       clientId: process.env.XRAY_CLIENT_ID,
//       clientSecret: process.env.XRAY_CLIENT_SECRET,
//       projectKey: process.env.XRAY_PROJECT,
//       testPlan: process.env.XRAY_TESTPLAN,
//       outputFile: `reports/xray-${htmlProject}.json`
//     }
//   ]
// ];

// module.exports = defineConfig({
//   reporter,
//   workers: 4,
//   timeout: 120000,
//   use: {
//     headless: true,
//     screenshot: "only-on-failure",
//     video: "retain-on-failure",
//     trace: "on-first-retry",
//     ignoreHTTPSErrors: true,
//   },
//   projects: [
//     defineBddProject({
//       name: "desktop",
//       features: "test/features/**/*.feature",
//       steps: ["test/steps/**/*.ts", "test/fixtures/fixture.ts"],
//       outputDir: "test/generated/desktop",
//       use: { viewport: { width: 1440, height: 900 }, isMobile: false },
//     }),
//     defineBddProject({
//       name: "mobile",
//       features: "test/features/**/*.feature",
//       steps: ["test/steps/**/*.ts", "test/fixtures/fixture.ts"],
//       outputDir: "test/generated/mobile",
//       use: { ...devices["iPhone 14"] },
//     }),
//   ],
// });