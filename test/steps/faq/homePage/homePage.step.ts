import { Given, Then } from "../../../fixtures/fixture";

Then(
  'I have dismissed the "No Thanks" popup if present',
  async ({ homePage }) => {
    await homePage.clickOnNoThanksButton();
  }
);

Given("the dynamic popup is closed if present", async ({ homePage }) => {
  await homePage.closeDynamicPopupIfPresent();
  await homePage.waitAndClosePopup();
});

Then("I should see the main image", async ({ homePage }) => {
  await homePage.header.verifyMainImageIsVisible();
});

Then("I should see the search bar", async ({ homePage }) => {
  await homePage.header.verifySearchBarVisible();
});

Then("I should see the top navigation menu", async ({ homePage }) => {
  await homePage.header.verifyNavBarVisible();
});

Then("I should see the cart icon", async ({ homePage }) => {
  await homePage.header.verifyCartVisible();
});

Then("I should see the recommended products section", async ({ homePage }) => {
  await homePage.verifyListOfRecommendedProdsVisible();
});
