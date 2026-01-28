import { DataTable } from "playwright-bdd";
import { Given, When, Then } from "../../../fixtures/fixture";

let fieldValue: string;

When(
  "the user clicks on the {string} link",
  async ({ accountSettingsPage }) => {
    await accountSettingsPage.clickOnEditLink();
  }
);

Then("the user should be redirected to {string}", async ({ accountSettingsPage }, url: string) => {
  await accountSettingsPage.verifyUrlEndpoint(url);
});

Then("the following fields should be visible in read-only mode:", async ({ accountSettingsPage }, dataTable: DataTable) => {
  const entries = dataTable.hashes();

  for (const { Field } of entries) {
    await accountSettingsPage.verifyFieldIsVisible(Field);
  }
});

Then(
  "all fields should be pre-filled with logged-in user details",
  async ({ accountSettingsPage }) => {
    await accountSettingsPage.verifyFieldValueIsVisible();
  }
);

Then(
  "the {string} link should be visible",
  async ({ accountSettingsPage }) => {
    await accountSettingsPage.verifyEditLinkIsVisible();
  }
);

Then(
  "the Account Settings page should be displayed",
  async ({ accountSettingsPage }) => {
    await accountSettingsPage.verifyUrl();
  }
);

Then("the following sections should be displayed:", async ({ accountSettingsPage }, dataTable: DataTable) => {
  const entries = dataTable.hashes();

  for (const { SectionName } of entries) {
    await accountSettingsPage.verifySelectionIsVisible(SectionName);
  }
});

Then("the following action buttons should be visible:", async ({ accountSettingsPage }, dataTable: DataTable) => {
  await accountSettingsPage.verifyCancelBtnIsVisible();
  await accountSettingsPage.verifySaveChangesBtnIsVisible();
});

When("the user updates the {string} field with valid data", async ({ accountSettingsPage }, fieldName: string) => {

});
