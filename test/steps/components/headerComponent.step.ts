import { Then, When } from "../../fixtures/fixture";

When("the user clicks on the {string} link in the header section", async ({ homePage }, text: string) => {
  await homePage.header.clickOnLinkWithText(text);
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

Then("I should see the lowest price guarantee link", async ({ homePage }) => {
  await homePage.header.verifyLowestPriceLinkVisible();
});

Then("I should see free shipping info", async ({ homePage }) => {
  await homePage.header.verifyFreeShopingLinkVisible();
});

Then("I should see promo banner or tag if available", async ({ homePage }) => {
  await homePage.header.verifyFreeShopingLinkVisible();
});

Then("I should see the terms of service", async ({ homePage }) => {
  await homePage.header.verifySpecialTopMessageVisible();
});

Then("the user should see the {string} link in the header section", async ({ homePage }, text: string) => {
  await homePage.header.verifyLinkWithTextVisible(text);
});
