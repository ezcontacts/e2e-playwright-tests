import { ADMIN } from "../../../data-test/testData";
import { Given, Then, When } from "../../../fixtures/fixture";
import { DataTable } from "playwright-bdd";

When(
  'the user clicks the "Remove" link for a product',
  async ({ wishListRemovePage }) => {
    await wishListRemovePage.clickRemoveLinkForFirstProduct();
  },
);

Then(
  "a confirmation popup should be displayed with the message {string}",
  async ({ wishListRemovePage }, message: string) => {
    await wishListRemovePage.verifyRemoveConfirmationPopup(message);
  },
);

When(
  "the user clicks {string} button on the confirmation popup",
  async ({ wishListRemovePage }, button: string) => {
    await wishListRemovePage.confirmRemoveProduct();
  },
);

Then(
  "the page should display the message {string}",
  async ({ wishListRemovePage }, message: string) => {
    await wishListRemovePage.verifyMessageVisible(message);
  },
);
