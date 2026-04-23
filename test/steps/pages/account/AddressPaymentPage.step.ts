import { ACCOUNT_MENU_LINKS, ADMIN } from "../../../data-test/testData";
import { Given, Then, When } from "../../../fixtures/fixture";

When('the user clicks on Add {string} link',async ({ addressAndPaymentPage }, type: string) => {
    await addressAndPaymentPage.clickAddLink(type);
  });

Then('the {string} form should be displayed', async ({ addressAndPaymentPage }, formName: string) => {
    await addressAndPaymentPage.verifyFormVisible(formName);
  });

When('the user enters card details with {string}, {string}, and {string}',async ({ addressAndPaymentPage }, cardNumber: string, month: string, year: string) => {
    await addressAndPaymentPage.enterCardDetails();
  }
);