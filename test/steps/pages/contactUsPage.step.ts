import { ACCOUNT } from "../../data-test/accountData";
import { Given, When, Then } from "../../fixtures/fixture";

Given("I visit the Contact Us page", async ({ contactUsPage }) => {
  await contactUsPage.open();
});

When(
  "I click on the {string} link in the Contact Us page",
  async ({ contactUsPage }, topic) => {
    await contactUsPage.clickOnTopic(topic);
  }
);

When("I open the topic dropdown", async ({ contactUsPage }) => {
  await contactUsPage.openTopicDropdown();
});

When(
  "I close the error modal by clicking button",
  async ({ contactUsPage }) => {
    await contactUsPage.closeErrorModal();
  }
);

When(
  "I enter {string} email in the Contact Us form",
  async ({ contactUsPage }, email) => {
    await contactUsPage.enterEmail(email);
  }
);

When(
  "I enter {string} name in the Contact Us form",
  async ({ contactUsPage }, value) => {
    await contactUsPage.enterName(value);
  }
);

When(
  "I enter {string} message in the Contact Us form",
  async ({ contactUsPage }, value) => {
    await contactUsPage.enterMessage(value);
  }
);

When(
  "I fill in the Contact Us form with valid details",
  async ({ contactUsPage }) => {
    await contactUsPage.enterEmail(ACCOUNT.email);
    await contactUsPage.enterName(ACCOUNT.name);
    await contactUsPage.enterMessage(ACCOUNT.message);
  }
);

Then("I should see the available contact topics", async ({ contactUsPage }) => {
  await contactUsPage.verifyAvailableTopics();
});

Then("I submit the form", async ({ contactUsPage }) => {
  await contactUsPage.clickOnSubmitBtn();
});

Then(
  "I should see a message indicating {string}",
  async ({ contactUsPage }, value) => {
    await contactUsPage.verifyErrorMessage(value);
  }
);

Then(
  "I should see a confirmation message indicating {string}",
  async ({ contactUsPage }, value) => {
    await contactUsPage.message.verifyConfirmationMessage(value);
  }
);

Then(
  "I should see an email error message indicating {string}",
  async ({ contactUsPage }, value) => {
    await contactUsPage.verifyEmailErrorMessage(value);
  }
);

Then(
  "I should be able to select {string}",
  async ({ contactUsPage }, value) => {
    await contactUsPage.verifyDropdownSelectedValue(value);
  }
);

Then("the form fields should be cleared", async ({ contactUsPage }) => {
  await contactUsPage.verifyClearedForm();
});
