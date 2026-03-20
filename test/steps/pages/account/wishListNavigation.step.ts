import { WishListNavigationPage } from "../../../../page-objects/pages/Account/WishListNavigationPage";
import { ADMIN } from "../../../data-test/testData";
import { Given, Then, When } from "../../../fixtures/fixture";

Given('the user is on the {string} page', async ({ wishListNavigationPage }, pageName: string) => {
  await wishListNavigationPage.open();
});

Then("the page should display the heading {string}", async ({ wishListNavigationPage }, text: string) => {
  await wishListNavigationPage.verifyTitleHaveText(text);
});

Then("the page URL should contain {string}", async ({ wishListNavigationPage }, text: string) => {
   await wishListNavigationPage.verifyUrlContains(text);
});