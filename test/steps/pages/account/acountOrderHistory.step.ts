import { DataTable } from "playwright-bdd";
import { Given, Then } from "../../../fixtures/fixture";

Given("the user is on the Order History page", async ({ accountOrderPage }) => {
  await accountOrderPage.clickOnFirstOrderDetails();
});

Then(
  "the order list should display the following column headers:",
  async ({ accountOrderPage }, dataTable: DataTable) => {
    const entries = dataTable.hashes();

    for (const { titel } of entries) {
      await accountOrderPage.verifyOrderTableTitleIsVisible(titel);
    }
  },
);
