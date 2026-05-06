import { Given, When, Then } from "../../../fixtures/fixture";

Then("the user has saved prescriptions", async ({ rxVerificationPage }) => {
  await rxVerificationPage.verifyPrescriptionBlockIsExists();
});

Then(
  "the {string} link should be visible and enabled",
  async ({ rxVerificationPage }, text: string) => {
    await rxVerificationPage.verifyaddNewPrescriptionBtn(text);
  },
);

Then(
  "the page should display the following informational text:",
  async ({ rxVerificationPage }, text: string) => {
    await rxVerificationPage.verifyPrescriptionText(text);
  },
);

Then(
  "a list of saved prescription records should be displayed",
  async ({ rxVerificationPage }) => {
    await rxVerificationPage.verifyPrescriptionBlocksIsVisible();
  },
);

Then(
  "the {string} prescription action link should be visible",
  async ({ rxVerificationPage }, text: string) => {
    await rxVerificationPage.verifyActionIsVisible(text);
  },
);
