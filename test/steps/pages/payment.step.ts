import { Given, When, Then } from "../../fixtures/fixture";
import { expect } from "@playwright/test";
import {PAYMENT } from "../../data-test/testData";

//
// -----------------------------
// HOME + NAVIGATION
// -----------------------------
//

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

When("I proceed to checkout", async ({ page }) => {
  const checkoutBtn = page.getByRole('link', { name: /checkout now/i });

 
  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('networkidle');

 
  await expect(checkoutBtn).toBeVisible({ timeout: 30000 });
  await expect(checkoutBtn).toBeEnabled();


  await Promise.all([
    page.waitForURL(/\/checkout\/sign-in/, { timeout: 30000 }),
    checkoutBtn.click()
  ]);

});


When("I enter guest user ID to proceed further", async ({ page }) => {
  const emailField = page.locator('#UserEmail');

  await expect(emailField).toBeVisible({ timeout: 30000 });
  await expect(emailField).toBeEnabled();

  await emailField.fill(PAYMENT.email);

  console.log("Guest email entered:", PAYMENT.email);
});


When("I Click on Checkout button", async ({ page }) => {
  const checkoutBtn = page.locator('#checkout-sign-in-submit-btn');

  await expect(checkoutBtn).toBeVisible({ timeout: 30000 });

  await checkoutBtn.click();

  // Wait for shipping section instead of exact URL
  await expect(page.locator('#add-shipping-address'))
    .toBeVisible({ timeout: 60000 });

  console.log("Checkout shipping page loaded");
});


When("I fill the shipping address details", async ({ page }) => {
  // First Name
  await expect(page.locator('#AccountShippingAddressFirstName'))
    .toBeVisible({ timeout: 30000 });
  await page.locator('#AccountShippingAddressFirstName')
    .fill(PAYMENT.firstName);

  // Last Name
  await page.locator('#AccountShippingAddressLastName')
    .fill(PAYMENT.lastName);

  // Address Line 1
  await page.locator('#AccountShippingAddressAddressLine1')
    .fill(PAYMENT.addressLine1);

  // Address Line 2
  await page.locator('#AccountShippingAddressAddressLine2')
    .fill(PAYMENT.addressLine2);

  // City
  await page.locator('#AccountShippingAddressAddressCity')
    .fill(PAYMENT.city);

  // State (Dropdown Select)
  await page.locator('#AccountShippingAddressUsAddressRegion')
    .selectOption({ label: PAYMENT.state });

  // Zip Code
  await page.locator('#AccountShippingAddressAddressPostalZip')
    .fill(PAYMENT.zipCode);

  // Mobile Number
  await page.locator('#AccountShippingAddressAddressShipPhonePrimary')
    .fill(PAYMENT.phone);

  console.log("Shipping details filled successfully");
});


When("I click on Continue to Payment", async ({ page }) => {
  const continueBtn = page.locator('#add-shipping-address');

  await expect(continueBtn).toBeEnabled({ timeout: 60000 });

  await continueBtn.click();

  console.log("After click URL:", page.url());

  // Wait for payment section to appear dynamically
  const creditCardSection = page.locator('#credit-card-box-container');

  await expect(creditCardSection)
    .toBeVisible({ timeout: 60000 });

  console.log("Payment section loaded");
});



When("I enter card details", async ({ page }) => {
  // Wait for credit card section to appear
  const creditCardSection = page.locator('#credit-card-box-container');
  await expect(creditCardSection).toBeVisible({ timeout: 60000 });
  console.log("Credit card section loaded");

  // Card Number
  const cardNumber = page.locator('#AppProductCardNumber');
  await expect(cardNumber).toBeVisible({ timeout: 60000 });
  await cardNumber.fill(PAYMENT.CreditCard);

  // Expiry
  const expiry = page.locator('#card-expiry-input');
  await expect(expiry).toBeVisible({ timeout: 60000 });
  await expiry.fill(PAYMENT.Expiry);

  // CVC
  const cvc = page.locator('#AppProductCvc');
  await expect(cvc).toBeVisible({ timeout: 60000 });
  await cvc.fill(PAYMENT.CVC);

  console.log("Card details entered successfully");
});

When("I click on Place Order and verify confirmation", async ({ page }) => {
  const placeOrderBtn = page.locator('#add-billing-address');

  await expect(placeOrderBtn).toBeVisible({ timeout: 60000 });
  await expect(placeOrderBtn).toBeEnabled();

  await placeOrderBtn.click();
  console.log("Place Order clicked");

  // Wait for the order confirmation heading (only stable element)
  const confirmationHeading = page.locator('h3.title', { hasText: /Thank You for Your Order/i }).first();
  await confirmationHeading.waitFor({ state: 'visible', timeout: 180000 });

  const orderNumberLink = confirmationHeading.locator('a.order-detail-link');
  await expect(orderNumberLink).toBeVisible({ timeout: 60000 });

  const orderNumber = await orderNumberLink.textContent();
  console.log("Order successfully placed. Order Number:", orderNumber);
});


Then(
  "I should be redirected to the checkout {string} page",
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


When('I complete the PayPal payment flow', async ({ cartComponent }) => {
  await cartComponent.payWithPaypal();
});


When('I click on Place Order', async ({ cartComponent }) => {
  await cartComponent.placeOrder();
});

Then("I should be redirected to the checkout page",
  async ({ page }) => {
    await expect(page).toHaveURL(/\/checkout\/sign-in/, {
      timeout: 30000
    });
  }
);


Then("I should be redirected to checkout payment page", async ({ page }) => {
  await expect(page).toHaveURL(/\/checkout$/, { timeout: 60000 });
});
