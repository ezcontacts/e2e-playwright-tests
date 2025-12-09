import { Given, Then } from "../../fixtures/fixture";
import { ACCOUNT } from "../../data-test/accountData";

Then("I navigate to the login page", async ({ loginPage }) => {
  await loginPage.open();
});

Then("User enters a Yopmail email", async ({ loginPage }) => {
  await loginPage.clickOnMagicLinkButton();
  await loginPage.fillEmail(ACCOUNT.email);
});

Then("User clicks on the send login link button", async ({ loginPage }) => {
  await loginPage.clickOnSendLinkButton();
});

Given("opens the Yopmail inbox", async ({ yopmailPage }) => {
  await yopmailPage.open();
});

Given(
  "clicks the login link in the email and check email",
  async ({ yopmailPage }) => {
    await yopmailPage.fillLogin(ACCOUNT.email);
    await yopmailPage.clickOnRefreshButtonButton();
    await yopmailPage.verifyEmailIsExist();
  }
);
