import { Given, When, Then } from "../../../fixtures/fixture";

Then(
  "the transaction history list should be visible",
  async ({ ezPointsPage }) => {
    await ezPointsPage.verifyTableIsVisible();
  },
);

Then(
  "the {string} column should be visible in the transaction table",
  async ({ ezPointsPage }, text: string) => {
    await ezPointsPage.verifyColumnIsVisible(text);
  },
);
