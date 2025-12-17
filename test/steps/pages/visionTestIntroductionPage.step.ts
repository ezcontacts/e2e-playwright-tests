import { Given, Then, When } from "../../fixtures/fixture";

Then("I should see the vision test introduction", async ({ visionTestIntroductionPage }) => {
  await visionTestIntroductionPage.verifyTitleIsVisible();
});
