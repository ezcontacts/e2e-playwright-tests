import { MESSAGE } from "../../data-test/testData";
import { Given, Then, When } from "../../fixtures/fixture";

// This step already exists in other file you don't need to redefine it here
Given("I visit the homepage", async ({ homePage }) => {
  await homePage.open();
});

// This step already exists in other file you don't need to redefine it here
Given("I navigate to the login page", async ({ loginPage }) => {
  await loginPage.open();
  await loginPage.clickOnGoogleLoginBtn();

});

Given('the user is logged in', async ({ loginPage }) => {
  await loginPage.message.verifyConfirmationMessage(MESSAGE.successLogin);
});


Given('the user is on the My Account page', async () => {

});

/* -------------------- Scenario Steps -------------------- */
// This step has the incorrect name wishlist it should be "Wish List" or {string}.
// That is why it will not be linked to the test in .feature.
// Corrected step name:
//'the user clicks on the {string} option from the My Account menu'
// P.S. After an erroneous launch, Playwright usually writes the correct format for the missing steps itself.
When('the user clicks on the wishlist option from the My Account menu', async () => {
 

});

Then('the Wish List page should be displayed', async () => {
  
});

// Corrected step name:
//'the page URL should contain {string}'
Then('the page URL should contain ""', async () => {

});

// Corrected step name:
//'the page should display the heading as {string}'
Then('the page should display the heading as', async () => {
  
});


