import { ADMIN } from "../../../data-test/testData";
import { Given, Then, When } from "../../../fixtures/fixture";
import { DataTable } from "playwright-bdd";

Then('the page should display a message {string}', async ({ wishlistEmptyPage }, message: string) => {
  await wishlistEmptyPage.verifyMessageVisible(message);
});

Then('the page should display the following links:', async ({ wishlistEmptyPage }, dataTable: DataTable) => {
  const links = dataTable.raw().flat();
  await wishlistEmptyPage.verifyMultipleLinksVisible(links);
});