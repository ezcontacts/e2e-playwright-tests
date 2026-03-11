import { Given, test, Then, When } from "../../fixtures/fixture"

Given(
  "the user lands on the Contact Lenses detail page",
  async ({ CLContactLensPage }) => {
    await CLContactLensPage.open();
  }
);

When(
  "the product detail page loads successfully",
  async ({ CLContactLensPage }) => {
    await CLContactLensPage.verifyProductDetailPageLoaded();
  }
);

When(
  'the user lands on the {string} detail page',
  async ({ CLContactLensPage }, pageName: string) => {
    await CLContactLensPage.openProductDetailPage(pageName);
  }
);

Then(
  'the page should display the text as {string}',
  async ({ CLContactLensPage }, text: string) => {
    await CLContactLensPage.verifyTextVisible(text);
  }
);

Then(
  "the product brand should be visible",
  async ({ CLContactLensPage }) => {
    await CLContactLensPage.verifyProductBrandVisible();
  }
);

Then(
  "the product name should be visible",
  async ({ CLContactLensPage }) => {
    await CLContactLensPage.verifyProductNameVisible();
  }
);