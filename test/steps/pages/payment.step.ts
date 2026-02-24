import { Given, When, Then } from "../../fixtures/fixture";
import { expect } from "@playwright/test";
import {PAYMENT } from "../../data-test/testData";

Given("I am on home page", async ({ homePage }) => {
  await homePage.open();
});

When("I proceed to checkout", async ({ cartComponent }) => {
  await cartComponent.proceedToCheckout();
});

When("I enter guest user ID to proceed further", async ({ cartComponent }) => {
  await cartComponent.enterGuestEmail();
});

When("I Click on Checkout button", async ({ cartComponent }) => {
  await cartComponent.clickCheckoutSignIn();
});

When("I fill the shipping address details", async ({ cartComponent }) => {
  await cartComponent.fillShippingAddress();
});

When("I click on Continue to Payment", async ({ cartComponent }) => {
  await cartComponent.continueFromShippingIfNeeded();
});

When("I enter card details", async ({ cartComponent }) => {
  await cartComponent.enterCardDetails();
});

When("I proceed to checkout", async ({ cartComponent }) => {
  await cartComponent.proceedToCheckout();
});

When("I enter guest user ID to proceed further", async ({ cartComponent }) => {
  await cartComponent.enterGuestEmail(PAYMENT.email);
});

When("I Click on Checkout button", async ({ cartComponent }) => {
  await cartComponent.clickCheckoutSignIn();
});

When("I fill the shipping address details", async ({ cartComponent }) => {
  await cartComponent.fillShippingAddress(PAYMENT);
});

When("I click on Continue to Payment", async ({ cartComponent }) => {
  await cartComponent.continueToPayment();
});

When("I enter card details", async ({ cartComponent }) => {
  await cartComponent.enterCardDetails(PAYMENT);
});

When("I click on Place Order and verify confirmation", async ({ cartComponent }) => {
  const orderNumber = await cartComponent.placeOrder();
  console.log("Order successfully placed:", orderNumber);
});


 Then( "I should be redirected to the checkout {string} page",
  async ({ cartComponent }, pageType) => {
    await cartComponent.verifyCheckoutPage(pageType);
  }
);

Then("I should see the order confirmation page", async ({ cartComponent }) => {
  await cartComponent.verifyOrderConfirmation();
});

When("I enter card details for Logged In", async ({ cartComponent }) => {
  await cartComponent.enterPaymentForLoggedIn();
});

Then("I should see order confirmation", async ({ cartComponent }) => {
  await cartComponent.verifyOrderConfirmation();
});

Then("I should be redirected to the checkout page", async ({ cartComponent }) => {
  await cartComponent.verifyCheckoutPageLoaded();
});


When('I complete the Affirm payment flow', async ({ cartComponent }) => {
  await cartComponent.payWithAffirm();
});


When('I click on Place Order', async ({ cartComponent }) => {
  await cartComponent.placeOrder();
});

Then( "I should be redirected to the checkout page",
  async ({ page }) => {
    await expect(page).toHaveURL(/\/checkout\/sign-in/, {
      timeout: 30000
    });
  }
);


Then("I should be redirected to checkout payment page", async ({ page }) => {
  await expect(page).toHaveURL(/\/checkout$/, { timeout: 60000 });
});

