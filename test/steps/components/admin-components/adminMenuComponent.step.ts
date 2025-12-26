import { Given, When, Then } from "../../../fixtures/fixture";

When(
  "I click on the {string} navigation tab",
  async ({ adminPanelPage }, tab) => {
    await adminPanelPage.menu.clickOnTab(tab);
  }
);

