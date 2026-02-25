import { Given, When, Then } from "../../fixtures/fixture";
import { expect } from "@playwright/test";
import { PAYMENT } from "../../data-test/testData";

//
// 🏠 HOME
//
Given("I am on home page", async ({ homePage }) => {
  await homePage.open();
});

//
// 🛒 CHECKOUT FLOW
//
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
  await cartComponent.continueFromShippingIfNeeded();
});

//
// 💳 PAYMENT
//
When("I enter card details", async ({ cartComponent }) => {
  await cartComponent.enterCardDetails(PAYMENT);
});

When(
  "I click on Place Order and verify confirmation",
  async ({ cartComponent }) => {
    const orderNumber = await cartComponent.placeOrderAndVerify();
    console.log("Order successfully placed:", orderNumber);
  }
);

//
// 🔎 GENERIC CHECKOUT PAGE VALIDATION (OLD + NEW)
//
Then(
  "I should be redirected to the checkout {string} page",
  async ({ cartComponent }, pageType: string) => {
    const page = cartComponent.page;
    await page.waitForLoadState("domcontentloaded");

    const currentUrl = page.url();
    const type = pageType.toLowerCase();

    // 🔹 PAYMENT PAGE
    if (type === "payment") {
      await cartComponent.verifyPaymentPageLoaded();
      return;
    }

    // 🔹 GENERIC CHECKOUT FLOW
    if (type === "checkout") {
      if (!currentUrl.includes("/checkout")) {
        throw new Error(
          `Expected to be somewhere in checkout flow, but landed on: ${currentUrl}`
        );
      }
      return;
    }

    // 🔹 SIGN-IN PAGE
    if (type === "sign-in") {
      await expect(page).toHaveURL(/\/checkout\/sign-?in/, {
        timeout: 60000,
      });
      return;
    }

    // 🔹 SHIPPING PAGE (OLD + NEW SUPPORT)
    if (type === "shipping") {
      if (
        !currentUrl.includes("/checkout/shipping") &&
        !currentUrl.match(/\/checkout$/)
      ) {
        throw new Error(
          `Expected shipping step but landed on: ${currentUrl}`
        );
      }
      return;
    }

    throw new Error(`Unsupported checkout page type: ${pageType}`);
  }
);

//
// 🔹 LEGACY CHECKOUT VALIDATION
//
Then("I should be redirected to the checkout page", async ({ page }) => {
  await page.waitForLoadState("domcontentloaded");

  const currentUrl = page.url();

  if (!currentUrl.includes("/checkout")) {
    throw new Error(
      `Expected to be somewhere in checkout flow, but landed on: ${currentUrl}`
    );
  }

  console.log(`User is in checkout flow: ${currentUrl}`);
});

//
// 🧾 PLACE ORDER (GENERIC)
//
When("I click on Place Order", async ({ cartComponent, page }) => {
  await Promise.all([
    page.waitForLoadState("networkidle"),
    cartComponent.placeOrderButton.click(),
  ]);
});

//
// 🎉 CONFIRMATION PAGE (OLD + NEW SUPPORT)
//
Then("I should see the order confirmation page", async ({ page }) => {
  await page.waitForLoadState("domcontentloaded");

  const currentUrl = page.url();

  // Accept multiple possible confirmation URL patterns
  if (
    !currentUrl.includes("success") &&
    !currentUrl.includes("confirmation") &&
    !currentUrl.includes("thank")
  ) {
    throw new Error(
      `Not on confirmation page. Current URL: ${currentUrl}`
    );
  }

  // Support both old + new confirmation UI
  const confirmationMessage = page.locator(
    "text=/thank you|order number|order #/i"
  );

  await confirmationMessage.first().waitFor({
    state: "visible",
    timeout: 60000,
  });

  console.log("Order confirmation page verified successfully.");
});







