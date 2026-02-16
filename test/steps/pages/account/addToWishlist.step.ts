import { Given, test, Then, When } from "../../../fixtures/fixture";

// TODO by M. Potrys: this step already exist -- Done, Marked this line as commented.
/*
Given('the user is logged in', async ({ loginPage }) => {
  await loginPage.message.verifyConfirmationMessage(MESSAGE.successLogin);
});

// TODO by M. Potrys: this step already exist -- Done, Marked this line as commented.
 
Given('the user is on the My Account page', async ({myAccountPage}) => {
  await myAccountPage.open();
});
*/

/* -------------------- Scenario Steps -------------------- */
// This step has the incorrect name wishlist it should be "Wish List" or {string}.  -- Done.
// That is why it will not be linked to the test in .feature. 
// Corrected step name:
//'the user clicks on the {string} option from the My Account menu'
// P.S. After an erroneous launch, Playwright usually writes the correct format for the missing steps itself.


When("the user clicks on the {string} option from the My Account menu", async ({ addToWishListPage }, text: string) => {
  await addToWishListPage.menu.ClickOnMenuBtn(text);
});

Then("the page should display the heading {string}", async ({ addToWishListPage }, text: string) => {
  await addToWishListPage.verifyHeadingText(text);
});

Then("the page URL should contain {string}", async ({ addToWishListPage }, text: string) => {
   await addToWishListPage.verifyUrlContains(text);
});

Then("the page should display the heading as {string}", async ({ addToWishListPage }, text: string) => {
  await addToWishListPage.verifyHeadingText(text);
});

Then('the page should display a message {string}',async ({ addToWishListPage }, message: string) => {
   await addToWishListPage.verifyWishListIsEmpty(message);
 });

  Then('a link to {string}, {string}, {string} should be visible', async ({ addToWishListPage }, link1: string, link2: string, link3: string) => {
    await addToWishListPage.verifyMultipleLinksVisible([
      link1,
      link2,
      link3,
    ]);
  }
);
