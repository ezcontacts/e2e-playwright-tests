import { DataTable } from "playwright-bdd";
import { Given, Then } from "../../fixtures/fixture";

Then(
  "the {string} filter toggle should exist",
  async ({ eyeglassesPage }, label: string) => {
    await eyeglassesPage.fillter.verifyInStockIsVisible();
  }
);

Then(
  "I should see gender filter options for:",
  async ({ eyeglassesPage }, dataTable: DataTable) => {
    const entries = dataTable.hashes();

    for (const { gender } of entries) {
      await eyeglassesPage.fillter.verifyGenderLabelIsVisible(gender);
    }
  }
);

Then(
  "I should see frame type filters including:",
  async ({ eyeglassesPage }, dataTable: DataTable) => {
    const entries = dataTable.hashes();

    for (const { gender } of entries) {
      await eyeglassesPage.fillter.verifyTypeLabelIsVisible(gender);
    }
  }
);

Then("I should see the brand search input", async ({ eyeglassesPage }) => {
  await eyeglassesPage.fillter.verifySearchFieldIsVisible();
});

Then(
  "I should see a list of brand checkboxes under the brand filter",
  async ({ eyeglassesPage }) => {
    await eyeglassesPage.fillter.verifyBrandMustBeExist();
  }
);
