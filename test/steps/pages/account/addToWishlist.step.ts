import { Given, When, Then } from "../../../fixtures/fixture";
import { AccountMenu } from "../../../data-test/productTypes";

// TODO by M. Potrys: this eed delete
# Navigation to Wish List Page
# Scenario: Navigate to Wish List section
#   When the user clicks on the "Wish List" option from the My Account menu
 #  Then the Wish List page should be displayed
 #  And the page URL should contain "/account/wishlist"
 #  And the page should display the heading as "Wish List"


When("the user clicks on the {string} option from the My Account menu", async ({ addToWishListPage }, text: string) => {
  await addToWishListPage.menu.ClickOnMenuBtn(text);
});

// Then("the page should display the heading {string}", async ({ addToWishListPage }, text: string) => {
//   await addToWishListPage.verifyHeadingText(text);
// });

Then("Then the Wish List page should be displayed", async ({ addToWishListPage }) => {
  await addToWishListPage.verifyTitleHaveText(AccountMenu.WishList);
});

// Then("the page URL should contain URL as: {string}", async ({ addToWishListPage }, text: string) => {
//   await addToWishListPage.verifyUrlEndpoint(text);
// });