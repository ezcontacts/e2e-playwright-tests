import { Given, When, Then } from "../../fixtures/fixture";

Then("I should proceed to the checkout page", async ({ checkoutPage }) => {
    await checkoutPage.verifyUrl();
});

Then("the selected shipping address should be displayed", async ({ checkoutPage }) => {
    await checkoutPage.verifyShippingAddressIsVisible();
});

Then("the shipping options applicable to {string} should be displayed", async ({ checkoutPage }, country) => {
    await checkoutPage.verifyShippingOptionsForCountry(country);
});

Then("the user should be able to open available shipping options", async ({ checkoutPage }) => {
    await checkoutPage.openAllShippingOptions();
});

Then("the user should be able to select one of the available shipping options", async ({ checkoutPage }) => {
    await checkoutPage.selectAvailableShippingOption();
});

Then("the user should be able to select created shipping options", async ({ checkoutPage, addressAndPaymentPage }) => {
    await checkoutPage.selectCreatedShippingAddress(
        addressAndPaymentPage.savedCity!,
        addressAndPaymentPage.savedState!,
        addressAndPaymentPage.savedZip!
    );
});

Then("the default shipping option should remain selected", async ({ checkoutPage }) => {
    await checkoutPage.verifySelectedShippingOptionRemains();
});

When("the user updates the shipping address country to {string}", async ({ checkoutPage }, country: string) => {
    await checkoutPage.updateShippingAddressCountry(country);
});

Then("the previously displayed shipping options should no longer be available", async ({ checkoutPage }) => {
    await checkoutPage.verifyPreviousShippingOptionsNoLongerAvailable();
});