import { Given, When, Then } from "../../fixtures/fixture";

Given("the dynamic popup is closed if present", async ({ homePage }) => {
  await homePage.closeDynamicPopupIfPresent();
  await homePage.waitAndClosePopup();
});

When(
  'I have dismissed the "No Thanks" popup if present',
  async ({ homePage }) => {
    await homePage.clickOnNoThanksButton();
  }
);

Then("I should see the recommended products section", async ({ homePage }) => {
  await homePage.verifyListOfRecommendedProdsVisible();
});
