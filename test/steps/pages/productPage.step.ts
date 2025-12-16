import { Given, Then } from "../../fixtures/fixture";

Then("I should see the product title", async ({ productPage }) => {
  await productPage.verifyProductTitleIsVisible();
});

Then("I should see the price", async ({ productPage }) => {
  await productPage.verifyPriceIsVisible();
});

Then("I should see at least one product image", async ({ productPage }) => {});

Then("I should see the frame color dropdown", async ({ productPage }) => {});

Then("I should see the size information", async ({ productPage }) => {});

Then("I should see the {string} button", async ({ productPage }, value) => {});

Then("I should see shipping availability text", async ({ productPage }) => {});

Then(
  "I should see the Affirm badge if product price is over $50",
  async ({ productPage }) => {}
);
