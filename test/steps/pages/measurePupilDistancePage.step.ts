import { Given, Then } from "../../fixtures/fixture";

Given("I visit the Measure Pupil Distance page", async ({ measurePdActionsPage }) => {
  await measurePdActionsPage.open();
});

Then("I should see the page title {string}", async ({ measurePdActionsPage }, text) => {
  await measurePdActionsPage.verifyTitleText(text);
});

Then("I should see the instructions for online tool", async ({ measurePdActionsPage }) => {
  await measurePdActionsPage.verifyToolInstructionsIsVisible();
});

Then("I should see a button with text {string}", async ({ measurePdActionsPage }, text) => {
  await measurePdActionsPage.verifyButtonWithTextIsVisible(text);
});

Then("I should see a section titled {string}", async ({ measurePdActionsPage }, text) => {
  await measurePdActionsPage.verifySectionIsVisible(text);
});

Then("I should see the PD instructional video", async ({ measurePdActionsPage }) => {
  await measurePdActionsPage.verifyVideoIsVisible();
});

Then("The video should autoplay and be muted", async ({ measurePdActionsPage }) => {
  await measurePdActionsPage.verifyVideoAttributes();
});

Then("I should see the step text {string}", async ({ measurePdActionsPage }, text) => {
  await measurePdActionsPage.verifySectionIsVisible(text);
});
