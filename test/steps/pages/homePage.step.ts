import { Given, Then } from "../../fixtures/fixture";

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

Then("I should see the recommended products section", async ({ homePage }) => {
  await homePage.verifyListOfRecommendedProdsVisible();
});
