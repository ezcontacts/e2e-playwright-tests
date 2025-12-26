import { MESSAGE } from "../../../data-test/testData";
import { Given, When, Then } from "../../../fixtures/fixture";

Given("I visit the admin panel page", async ({ adminPanelPage }) => {
  await adminPanelPage.open();
});

When(
  "I enter valid email and password",
  async ({ adminPanelPage }) => {
    await adminPanelPage.adminLogin.enterValidEmail();
    await adminPanelPage.adminLogin.enterValidPassword();
    await adminPanelPage.adminLogin.clickOnSignInBtn();
  }
);

Then(
  "I should be redirected to the dashboard",
  async ({ adminPanelPage }) => {
    await adminPanelPage.verifySuccessfulMessage(MESSAGE.successLogin);
  }
);

