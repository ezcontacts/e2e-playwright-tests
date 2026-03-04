import { Given, Then, When } from "../../fixtures/fixture";
import { ACCOUNT, MESSAGE, PAYMENT } from "../../data-test/testData";
import { DataTable } from "playwright-bdd";

Given("I navigate to the login page for payment", async ({ loginPage }) => {
  await loginPage.open();
});

Given("opens the Yopmail inbox for payment", async ({ yopmailPage }) => {
  await yopmailPage.open();
});

Given('I am logged in', async ({ homePage }) => {
  await homePage.open(); 
});

When("User enters a Yopmail email for payment", async ({ loginPage }) => {
  await loginPage.clickOnMagicLinkBtn();
  await loginPage.fillEmail(PAYMENT.email);
});

When("User clicks on the send login link button for payment", async ({ loginPage }) => {
  await loginPage.clickOnSendLinkBtn();
});

When("User opens the Yopmail inbox for the email", async ({ yopmailPage }) => {
  await yopmailPage.openInbox(PAYMENT.email);
});

When(
  "User navigates using the magic login link",
  async ({ yopmailPage }) => {
    await yopmailPage.openMagicLinkFromLatestEmail(PAYMENT.email);
  }
);

When("User opens magic link from Yopmail email", async ({ yopmailPage }) => {
  const magicLinkUrl: string =
    await yopmailPage.getMagicLinkFromLatestEmail();

  await yopmailPage.navigateToMagicLink(magicLinkUrl);
});

When('User clicks the received email in inbox', async ({ yopmailPage }) => {
  await yopmailPage.clickLatestEmail();
});

When('User extracts the magic login link from the email', async ({ yopmailPage }) => {
  await yopmailPage.extractMagicLink("login-with-token");
});



Then(
  "I should see the following login options for payment:",
  async ({ loginPage }, dataTable: DataTable) => {
    const entries = dataTable.hashes();

    for (const { provider } of entries) {
      await loginPage.verifySingInMethodIsVisible(provider);
    }
  }
);

Then("I should see the login success message for payment", async ({ loginPage, page }) => {
  await loginPage.message.verifyConfirmationMessage(MESSAGE.YopmailsuccessLogin);

  // Save login state
 // await page.context().storageState({ path: 'google-session.json' });
});
