import { DataTable } from "playwright-bdd";
import { Given, Then } from "../../../fixtures/fixture";

Given("the user is on the Order Details page", async ({ accountOrderPage }) => {
  await accountOrderPage.clickOnFirstOrderDetails();
});

Then(
  "the Order details have the following informations",
  async ({ accountOrderPage }, dataTable: DataTable) => {
    const entries = dataTable.hashes();

    for (const { OrderDate } of entries) {
      await accountOrderPage.miniOrderRow(OrderDate);
    }
  },
);
