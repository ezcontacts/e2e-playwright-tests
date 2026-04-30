import { Given, When, Then } from "../../../fixtures/fixture";

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
