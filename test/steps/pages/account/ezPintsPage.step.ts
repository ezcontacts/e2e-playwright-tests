import { AccountMenu } from "../../../data-test/productTypes";
import { Given, When, Then } from "../../../fixtures/fixture";

Then("the page should display the heading {string}", async ({ ezPointsPage }, text: string) => {
  await ezPointsPage.verifyHeadingText(text);
});

Then("the transaction history list should be visible", async ({ ezPointsPage }) => {
  await ezPointsPage.verifyTableIsVisible();
});

Then("the {string} column should be visible in the transaction table", async ({ ezPointsPage }, text: string) => {
  await ezPointsPage.verifyColumnIsVisible(text);
});
