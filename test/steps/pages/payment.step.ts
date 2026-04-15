import { Given, When, Then } from "../../fixtures/fixture";
import { expect } from "@playwright/test";

//
// -----------------------------
// HOME + NAVIGATION
// -----------------------------
//

Given("I am on home page", async ({ homePage }) => {
  await homePage.open();
});

When("I proceed to checkout", async ({ sunglassesPage }) => {
  await sunglassesPage.cart.proceedToCheckout();
});

When("I enter guest user ID to proceed further", async ({ sunglassesPage }) => {
  await sunglassesPage.cart.enterGuestEmail();
});

When("I Click on Checkout button", async ({ sunglassesPage }) => {
  await sunglassesPage.cart.clickCheckoutSignIn();
});

When("I fill the shipping address details", async ({ sunglassesPage }) => {
  await sunglassesPage.cart.fillShippingAddress();
});

When("I click on Continue to Payment", async ({ sunglassesPage }) => {
  await sunglassesPage.cart.continueFromShippingIfNeeded();
});

When("I enter card details", async ({ sunglassesPage }) => {
  await sunglassesPage.cart.enterCardDetails();
});

When("I enter card details for Logged In", async ({ sunglassesPage }) => {
  await sunglassesPage.cart.enterPaymentForLoggedIn();
});

When("I complete the Affirm payment flow", async ({ sunglassesPage }) => {
  await sunglassesPage.cart.payWithAffirm();
});

When("I complete the PayPal payment flow", async ({ sunglassesPage }) => {
  await sunglassesPage.cart.payWithPaypal();
});

When("I click on Place Order", async ({ sunglassesPage }) => {
  await sunglassesPage.cart.placeOrder();
});

When(
  "I click on Place Order and verify confirmation",
  async ({ sunglassesPage }) => {
    await sunglassesPage.cart.placeOrderAndVerify();
  },
);

Then(
  "I should be redirected to the checkout page",
  async ({ sunglassesPage }) => {
    await sunglassesPage.cart.verifyCheckoutPageLoaded();
  },
);

Then("I should see order confirmation", async ({ sunglassesPage }) => {
  await sunglassesPage.cart.verifyOrderConfirmation();
});

Then(
  "I should be redirected to the checkout {string} page",
  async ({ sunglassesPage }, pageType) => {
    await sunglassesPage.cart.verifyCheckoutPage(pageType);
  },
);

Then("I should be redirected to checkout payment page", async ({ page }) => {
  await expect(page).toHaveURL(/\/checkout$/, { timeout: 60000 });
});
