import { MESSAGE } from "../../data-test/testData";
import { Given, Then, When } from "../../fixtures/fixture";

Given("I visit the homepage", async ({ homePage }) => {
  await homePage.open();
});

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

When('the user clicks on the wishlist option from the My Account menu', async () => {
 

});

Then('the Wish List page should be displayed', async () => {
  
});

Then('the page URL should contain ""', async () => {

});

Then('the page should display the heading as', async () => {
  
});


