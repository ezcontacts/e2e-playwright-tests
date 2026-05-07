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

Then("the default shipping option should remain selected", async ({ checkoutPage }) => {
    await checkoutPage.verifySelectedShippingOptionRemains();
});