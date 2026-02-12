import { MESSAGE } from "../../data-test/testData";
import { Given, test, Then, When } from "../../fixtures/fixture";

// TODO by M. Potrys: this step already exist
Given('the user is logged in', async ({ loginPage }) => {
  await loginPage.message.verifyConfirmationMessage(MESSAGE.successLogin);
});

// TODO by M. Potrys: this step already exist
Given('the user is on the My Account page', async ({myAccountPage}) => {
  await myAccountPage.open();
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

// TODO by M. Potrys: Corrected step name:
//'the page URL should contain {string}'
Then('the page URL should contain ""', async () => {

});

// TODO by M. Potrys: Corrected step name:
//'the page should display the heading as {string}'
Then('the page should display the heading as', async () => {
  
});


