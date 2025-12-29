import { ORDER } from "../../../data-test/testData";
import { Given, When, Then } from "../../../fixtures/fixture";

When(
  "I search for the order by order number",
  async ({ adminPanelPage }) => {
    await adminPanelPage.searchOrder.enterSearchField(ORDER.orderNumber);
  }
);

When(
  "I select the order",
  async ({ adminPanelPage }) => {
    await adminPanelPage.searchOrder.clickRowInDataTable(ORDER.orderNumber);
  }
);

Then(
  "I should see the order search results",
  async ({ adminPanelPage }) => {
    await adminPanelPage.searchOrder.verifyExistRowInDataTable(ORDER.orderNumber);
  }
);

