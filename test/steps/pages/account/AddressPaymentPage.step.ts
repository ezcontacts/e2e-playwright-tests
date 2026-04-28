import { Then, When } from "../../../fixtures/fixture";

When(
  'the user clicks on Add {string} link',
  async ({ addressAndPaymentPage }, type: string) => {
    await addressAndPaymentPage.clickAddLink(type);
  });

Then(
  'the {string} form should be displayed',
  async ({ addressAndPaymentPage }, formName: string) => {
    await addressAndPaymentPage.verifyFormDisplayed(formName);
  });

When(
  'the user enters card details with {string}, {string}, and {string}',
  async ({ addressAndPaymentPage }, cardNumber: string, month: string, year: string) => {
    await addressAndPaymentPage.enterCardDetails(cardNumber, month, year);
  });

When(
  'the user clicks on the {string} button', 
  async ({ addressAndPaymentPage }) => {
    await addressAndPaymentPage.clickButton();
  });

Then(
  'a {string} message should be displayed', 
  async ({ addressAndPaymentPage }, text: string) => {
    await addressAndPaymentPage.verifySuccessfulMessage(text);
  });

Then(
  'the user enters shipping address details', 
  async ({ addressAndPaymentPage }) => {
    await addressAndPaymentPage.FillCustomerAddressForm();
  });

Then(
  'the user enters billing address details', 
  async ({ addressAndPaymentPage }) => {
    await addressAndPaymentPage.FillCustomerAddressForm();
  });