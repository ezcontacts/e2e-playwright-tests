import { Given, Then, When } from "../../fixtures/fixture";
import { ACCOUNT, MESSAGE } from "../../data-test/accountData";
import { DataTable } from "playwright-bdd";

Given("I navigate to the login page", async ({ loginPage }) => {
  await loginPage.open();
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

Given("I visit the login page", async ({ loginPage }) => {
  await loginPage.open();
});

When("User enters a Yopmail email", async ({ loginPage }) => {
  await loginPage.clickOnMagicLinkBtn();
  await loginPage.fillEmail(ACCOUNT.email);
});

When("User clicks on the send login link button", async ({ loginPage }) => {
  await loginPage.clickOnSendLinkBtn();
});

When('I click the Google login button', async ({ loginPage }) => {
  await loginPage.clickOnGoogleLoginBtn();
});

Then(
  "I should see the following login options:",
  async ({ loginPage }, dataTable: DataTable) => {
    const entries = dataTable.hashes();

    for (const { provider } of entries) {
      await loginPage.verifySingInMethodIsVisible(provider);
    }
  }
);

Then('I should see the login success message', async ({ loginPage }) => {
  await loginPage.message.verifyConfirmationMessage(MESSAGE.successLogin);
});

