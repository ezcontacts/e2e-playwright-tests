import { Given, When, Then } from "../../fixtures/fixture";

Given("the user is on the contact lens product detail page", async ({ contactLensesPage }) => {
  await contactLensesPage.open();
});

When("The product detail page loads successfully", async ({ CLContactLensPage }) => {
});

Then(" Then the product brand should be visible", async ({ CLContactLensPage }) => {
});

Then("Then the product {string} should be visible", async ({ CLContactLensPage }) => {
});
