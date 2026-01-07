import { ACCOUNT } from "../../data-test/testData";
import { When, Then } from "../../fixtures/fixture";

When("I click on promotion button", async ({ homePage }) => {
    await homePage.promotion.clickOnBubbleBtnIfVisible();
  }
);

When("I click on continue button", async ({ homePage }) => {
    await homePage.promotion.clickOnContinueBtn();
  }
);

When("I enter invalide value in the field", async ({ homePage }) => {
    await homePage.promotion.fillEmailField(ACCOUNT.invalideMobileNumber);
  }
);

When("I enter valide email in the email field", async ({ homePage }) => {
    await homePage.promotion.fillEmailField(ACCOUNT.email);
  }
);

When("I enter valide mobile number in the field", async ({ homePage }) => {
    await homePage.promotion.fillEmailField(ACCOUNT.mobileNumber);
  }
);

Then("I should see the red strip indicating {string}", async ({ homePage }, text) => {
    await homePage.promotion.verifyPromoteText(text);
  }
);

Then("I should see the error message {string} if the popup is present", async ({ homePage }, text) => {
    await homePage.promotion.verifyErrorMessage(text);
  }
);

Then("I should see the legal information", async ({ homePage }, text) => {
    await homePage.promotion.verifyLegalInformationIsVisible();
  }
);
