import { DataTable } from "playwright-bdd";
import { Given, Then } from "../../../fixtures/fixture";

let orderId: string;

Given("the user is on the Order Details page", async ({ accountOrderPage }) => {
  orderId = await accountOrderPage.clickOnFirstOrderDetails();
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

Then("the payment section should be visible", async ({ accountOrderPage }) => {
  await accountOrderPage.verifyPaymentTitle();
});

Then(
  "the Print Invoice \\(PDF) link should be visible",
  async ({ accountOrderPage }) => {
    await accountOrderPage.verifyInvoicePDFLink();
  },
);

Then(
  "the payment method should be visible",
  async ({ accountOrderPage }, dataTable: DataTable) => {
    const entries = dataTable.hashes();

    for (const { method } of entries) {
      await accountOrderPage.verifyPaymantContent(method);
    }
  },
);

Then(
  "the {string} information should be visible",
  async ({ accountOrderPage }, name: string) => {
    await accountOrderPage.verifyPaymantContent(name);
  },
);

Then(
  "the order total section should be visible",
  async ({ accountOrderPage }, dataTable: DataTable) => {
    const entries = dataTable.hashes();

    for (const { section } of entries) {
      await accountOrderPage.verifyOrderPaymantContent(section);
    }
  },
);

Then(
  "the user can see the Shipping Method and Track my Package link",
  async ({ accountOrderPage }) => {
    await accountOrderPage.verifyTrackPackageLinkIsVisible();
  },
);

Then(
  "the user can see the {string} options",
  async ({ accountOrderPage }, service: string, dataTable: DataTable) => {
    const entries = dataTable.hashes();

    for (const { info } of entries) {
      await accountOrderPage.verifyServiceLink(service, info);
    }
  },
);

Then(
  "the {string} option from Narvar should be visible",
  async ({ accountOrderPage }, name: string) => {
    await accountOrderPage.verifyReturnBtn(name);
  },
);

Then(
  "the order status message {string} should be displayed",
  async ({ accountOrderPage }, name: string) => {
    await accountOrderPage.verifyOrderTitle(name);
  },
);

Then(
  "the order progress states should be visible in the following order:",
  async ({ accountOrderPage }, dataTable: DataTable) => {
    const entries = dataTable.hashes();

    for (const { name } of entries) {
      await accountOrderPage.verifyOrderStatus(name);
    }
  },
);

Then(
  "the order item details section should be displayed",
  async ({ accountOrderPage }) => {
    await accountOrderPage.verifyOrderDetailsIsVisible();
  },
);

Then(
  "the page URL should contain {string}",
  async ({ accountOrderPage }, urlPart: string) => {
    await accountOrderPage.verifyContainsUrlEndpoint(`${urlPart}${orderId}`);
  },
);

Then(
  "the Order Details page should be displayed",
  async ({ accountOrderPage }) => {
    await accountOrderPage.verifyPaymentTitle();
  },
);
