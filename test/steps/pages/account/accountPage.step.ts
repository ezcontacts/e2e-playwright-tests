import { DataTable } from "playwright-bdd";
import { AccountMenu } from "../../../data-test/productTypes";
import { Given, When, Then } from "../../../fixtures/fixture";

When("the user selects {string} from the My Account menu", async ({ accountPage }, text: string) => {
  await accountPage.menu.ClickOnMenuBtn(text);
});

Then("the Ez Points page should be displayed", async ({ accountPage }) => {
  await accountPage.verifyTitleHaveText(AccountMenu.EzPoints);
});

Then("the page URL should contain URL as: {string}", async ({ accountPage }, text: string) => {
  await accountPage.verifyUrlEndpoint(text);
});

Then("the {string} option should be selected by default", async ({ accountPage }, text: string) => {
  await accountPage.verifyTitleHaveText(AccountMenu.AccountSettings);
});

Then("the page should display the label {string}", async ({ accountPage }, text: string) => {
  await accountPage.verifySubtitleHaveText(text);
});

Then("below to that it should display the label as {string}", async ({ accountPage }, text: string) => {
  await accountPage.verifyTitleHaveText(text);
});

Then("the following menu options should be displayed:", async ({ accountPage }, dataTable: DataTable) => {
  const entries = dataTable.hashes();

  for (const { MenuOption } of entries) {
    await accountPage.menu.verifyMenuOption(MenuOption);
  }
});