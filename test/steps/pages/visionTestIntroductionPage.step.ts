import { Given, Then, When } from "../../fixtures/fixture";

Given("I visit the Online Vision Introduction Test page", async ({ visionTestIntroductionPage }) => {
  await visionTestIntroductionPage.open();
});

When(
  "I provide my current prescription",
  async ({ visionTestIntroductionPage }) => {
    await visionTestIntroductionPage.fillCurrentPrescription();
  }
);

When("I click {string} button", async ({ visionTestIntroductionPage }, text) => {
  await visionTestIntroductionPage.clickOnTestBtn(text);
});


Then("I should see the vision test introduction", async ({ visionTestIntroductionPage }) => {
  await visionTestIntroductionPage.verifyTitleIsVisible();
});

Then("I should see the pre-test requirements page", async ({ visionTestIntroductionPage }) => {
  await visionTestIntroductionPage.verifyPreTestHeaderIsVisible();
});