import { Given, test, Then, When } from "../../../fixtures/fixture";
import { DataTable } from "playwright-bdd";

When("the user clicks on the {string} option from the My Account menu", async ({ addToWishListPage }, text: string) => {
  await addToWishListPage.menu.ClickOnMenuBtn(text);
});

Then("the page should display the heading {string}", async ({ addToWishListPage }, text: string) => {
  //await addToWishListPage.verifyHeadingText(text);
  await addToWishListPage.verifyTitleHaveText(text);
});

Then("the page URL should contain {string}", async ({ addToWishListPage }, text: string) => {
   await addToWishListPage.verifyUrlContains(text);
});

Then("the page should display the heading as {string}", async ({ addToWishListPage }, text: string) => {
  await addToWishListPage.verifyTitleHaveText(text);
});
// Completed -> # Navigation to Wish List Page

Given("the user is on the {string} page",async ({ addToWishListPage }) => {
    await addToWishListPage.open();
  }
);

Then('the page should display a message {string}',async ({ addToWishListPage }, message: string) => {
    await addToWishListPage.verifyMessageVisible(message);
  }
);

Then('the following links should be visible:',async ({ addToWishListPage }, dataTable: DataTable) => {
    const links = dataTable.raw().flat();
    await addToWishListPage.verifyMultipleLinksVisible(links);
  }
);
// Completed -> # When the wishlist is empty.