import { defineConfig } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";

const testDir = defineBddConfig({
  testDir: "test/generated",
  features: "test/features/**/*.feature",
  steps: "test/**/*.ts",
});

export default defineConfig({
  testDir,
  reporter: "html",
  fullyParallel: true,
  workers: process.env.CI ? 1 : undefined,
  retries: 0,
  timeout: 60000,
});
