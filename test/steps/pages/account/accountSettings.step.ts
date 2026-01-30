import { DataTable } from "playwright-bdd";
import { Given, When, Then } from "../../../fixtures/fixture";
import { generateAccountField } from "../../../../utils/user_helper";
import { MESSAGE } from "../../../data-test/testData";
import { AccountInfo } from "../../../../page-objects/pages/Account/AcountInfoPage";
import { AccountInfoFields } from "../../../data-test/productTypes";

let fieldValue: string;
let accountInfo: AccountInfo;

When(
  "the user clicks on the {string} link",
  async ({ accountSettingsPage }) => {
    await accountSettingsPage.clickEditLink();
  }
);

When("the user updates the {string} field with valid data", async ({ accountSettingsPage }, fieldName: string) => {
  fieldValue = generateAccountField(fieldName);
  await accountSettingsPage.fillSettingEditField(fieldName, fieldValue);
});

When("the user has updated valid account details:", async ({ accountSettingsPage }, table: DataTable) => {
  const entries = table.hashes();
  for (const { Field } of entries) {
    const value = generateAccountField(Field);
    await accountSettingsPage.fillSettingEditField(Field, value);
  }

  await accountSettingsPage.fillConfirmEmailField();
});

When('the user clicks the {string} button', async ({ accountSettingsPage }, buttonName: string) => {
  await accountSettingsPage.clickSettingBtn(buttonName);
});

Then("the user is on the My Account page", async ({ loginPage, accountInfoPage }) => {
  await loginPage.message.verifyConfirmationMessage(MESSAGE.successLogin);
  accountInfo = await accountInfoPage.getAccountInfo();
});

Then("the user should be redirected to {string}", async ({ accountSettingsPage }, url: string) => {
  await accountSettingsPage.verifyUrlEndpoint(url);
});

Then(
  "the following fields should be visible in read-only mode:",
  async ({ accountSettingsPage }, dataTable: DataTable) => {
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

Then("the {string} field should reflect the updated value", async ({ accountSettingsPage }, fieldName: string) => {
  await accountSettingsPage.verifySettingEditField(fieldName, fieldValue);
});

Then("the changes should not be saved", async ({ accountInfoPage }) => {
  await accountInfoPage.verifyAccountInfoFieldValue(AccountInfoFields.FirstName, accountInfo.firstName);
  await accountInfoPage.verifyAccountInfoFieldValue(AccountInfoFields.LastName, accountInfo.lastName);
  await accountInfoPage.verifyAccountInfoFieldValue(AccountInfoFields.Phone, accountInfo.phone);
  await accountInfoPage.verifyAccountInfoFieldValue(AccountInfoFields.Email, accountInfo.email);
  await accountInfoPage.verifyAccountInfoFieldValue(AccountInfoFields.EmailSignUp, accountInfo.emailSignUp);
});