import { expect, Locator, Page } from "@playwright/test";
import { BaseComponent } from "../base/BaseComponent";
import { PAYMENT } from "../../test/data-test/testData";

export class CartComponent extends BaseComponent {

  // =========================
  // Checkout
  // =========================
  readonly checkoutNowButton: Locator;
  readonly checkoutSignInButton: Locator;
  readonly emailField: Locator;

  // =========================
  // Shipping
  // =========================
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressLine1Input: Locator;
  readonly addressLine2Input: Locator;
  readonly cityInput: Locator;
  readonly stateDropdown: Locator;
  readonly zipCodeInput: Locator;
  readonly phoneInput: Locator;
  readonly shippingMethodDropdown: Locator;
  readonly shippingContinueButton: Locator;

  // =========================
  // Payment
  // =========================
  readonly cardNumberInput: Locator;
  readonly expiryMonthDropdown: Locator;
  readonly expiryYearDropdown: Locator;
  readonly expiryInput: Locator;
  readonly cvcInput: Locator;
  readonly placeOrderButton: Locator;
  readonly creditCardContainer: Locator;

  constructor(page: Page, private paymentData = PAYMENT) {
    super(page, "body");

    // Checkout
    this.checkoutNowButton = page.locator('a.checkout:has-text("Checkout Now")');
    this.checkoutSignInButton = page.locator('#checkout-sign-in-submit-btn');
    this.emailField = page.locator('#UserEmail');

    // Shipping
    this.firstNameInput = page.locator('#AccountShippingAddressFirstName');
    this.lastNameInput = page.locator('#AccountShippingAddressLastName');
    this.addressLine1Input = page.locator('#AccountShippingAddressAddressLine1');
    this.addressLine2Input = page.locator('#AccountShippingAddressAddressLine2');
    this.cityInput = page.locator('#AccountShippingAddressAddressCity');
    this.stateDropdown = page.locator('#AccountShippingAddressUsAddressRegion');
    this.zipCodeInput = page.locator('#AccountShippingAddressAddressPostalZip');
    this.phoneInput = page.locator('#AccountShippingAddressAddressShipPhonePrimary');
    this.shippingMethodDropdown = page.locator('#selectShipId');
    this.shippingContinueButton = page.locator('#add-shipping-address');

    // Payment
    this.cardNumberInput = page.locator('#AppProductCardNumber');
    this.expiryMonthDropdown = page.locator('#AppProductExpiryMonth');
    this.expiryYearDropdown = page.locator('#AppProductExpiryYear');
    this.expiryInput = page.locator('#card-expiry-input');
    this.cvcInput = page.locator('#AppProductCvc');
    this.placeOrderButton = page.locator('#add-billing-address');
    this.creditCardContainer = page.locator('#credit-card-box-container');
  }

  // =====================================================
  // 🔎 CHECKOUT TYPE DETECTION
  // =====================================================
 async getCheckoutType(): Promise<"old" | "new"> {
    const url = this.page.url();

    if (url.includes("/checkout/shipping") || url.match("/checkout/payment")) {
      console.log("Detected OLD checkout");
      return "old";
    }

    if (url === "https://staging.ezcontacts.com/checkout" || url.match(/\/checkout$/)) {
      console.log("Detected NEW checkout");
      return "new";
    }

    throw new Error(`Unknown checkout type. Current URL: ${url}`);
  }

  // =====================================================
  // CHECKOUT NAVIGATION
  // =====================================================
async proceedToCheckout() {
  await expect(this.checkoutNowButton).toBeVisible({ timeout: 30000 });

  await Promise.all([
    this.page.waitForURL(/\/checkout/, { timeout: 90000 }),
    this.checkoutNowButton.click(),
  ]);

  // Wait for checkout page to stabilize
  await this.page.waitForLoadState("domcontentloaded");
  await this.page.waitForLoadState("networkidle");

  console.log("Checkout page fully loaded.");
}

async enterGuestEmail() {
  await expect(this.emailField).toBeVisible();
  await this.emailField.fill(PAYMENT.email);
}

async clickCheckoutSignIn() {
  await Promise.all([
    this.page.waitForLoadState("networkidle"),
    this.checkoutSignInButton.click(),
  ]);

  await this.page.waitForURL(
    (url) => {
      const href = url.toString();
      return (
        href.includes("/checkout/shipping") ||
        href.endsWith("/checkout")
      );
    },
    { timeout: 90000 }
  );

  // Extra stabilization
  await this.page.waitForLoadState("domcontentloaded");

  console.log("Navigated to shipping page successfully.");
}

  // =====================================================
  // SHIPPING
  // =====================================================
  async fillShippingAddress() {
  await this.firstNameInput.fill(PAYMENT.firstName);
  await this.lastNameInput.fill(PAYMENT.lastName);
  await this.addressLine1Input.fill(PAYMENT.addressLine1);
  await this.addressLine2Input.fill(PAYMENT.addressLine2);
  await this.cityInput.fill(PAYMENT.city);
  await this.stateDropdown.selectOption({ label: PAYMENT.state });
  await this.zipCodeInput.fill(PAYMENT.zipCode);
  await this.phoneInput.fill(PAYMENT.phone);

  await this.phoneInput.press("Tab");

  await this.page.evaluate(() => {
    const active = document.activeElement as HTMLElement | null;
    if (active) active.blur();
  });

  await this.page.waitForTimeout(2000);
}
  async selectShippingMethod() {
    if (await this.shippingMethodDropdown.isVisible()) {
      const options = this.shippingMethodDropdown.locator("option");
      const count = await options.count();
      if (count > 1) {
        await this.shippingMethodDropdown.selectOption({ index: 1 });
      }
    }
  }

// 🔄 CONTINUE FROM SHIPPING (ULTRA SAFE OLD + NEW)
async continueFromShippingIfNeeded() {
  const currentUrl = this.page.url();

  // Only run if we're on shipping step
  if (
    !currentUrl.includes("/checkout/shipping") &&
    !currentUrl.match(/\/checkout$/)
  ) {
    console.log("Not on shipping page. Skipping continue.");
    return;
  }

  console.log("On shipping page. Waiting for shipping form...");

  // Ensure page is fully loaded
  await this.page.waitForLoadState("domcontentloaded");
  await this.page.waitForLoadState("networkidle");

  // Wait for shipping inputs to appear
  await this.page.locator('input:visible, select:visible').first().waitFor({
    state: "visible",
    timeout: 60000,
  });

  console.log("Shipping form detected.");

  // Ultra reliable Continue button locator (supports old + new checkout)
  const continueButton = this.page
    .locator(`
      #add-shipping-address,
      button:has-text("Continue"),
      button:has-text("Continue to Payment"),
      input[type="submit"]:has-text("Continue")
    `)
    .first();

  const count = await continueButton.count();

  if (count === 0) {
    throw new Error("Continue button not found on shipping page.");
  }

  // Wait until button becomes visible and enabled
  await continueButton.waitFor({
    state: "visible",
    timeout: 60000,
  });

 await expect(continueButton).toBeEnabled({ timeout: 60000 });

  console.log(
    "Continue button enabled state:",
    await continueButton.isEnabled().catch(() => false)
  );

  // Scroll into view (important for some checkout UIs)
  await continueButton.scrollIntoViewIfNeeded();

  console.log("Clicking Continue button...");

  await Promise.all([
    this.page.waitForLoadState("networkidle"),
    continueButton.click({ force: true }),
  ]);

  console.log("Continue clicked. Waiting for payment step...");

  // Wait for navigation to next step
  await this.page.waitForURL(
    (url) =>
      url.toString().includes("payment") ||
      url.toString().includes("review") ||
      url.toString().includes("checkout"),
    { timeout: 90000 }
  );

  // Ensure payment UI loads completely
  await this.page.waitForLoadState("domcontentloaded");
  await this.page.waitForLoadState("networkidle");

  // Wait for payment elements (old + new checkout)
  await this.page
    .locator(
      `
      #AppProductCardNumber,
      #AppProductSavedCard,
      #affirm-place-order
    `
    )
    .first()
    .waitFor({
      state: "visible",
      timeout: 60000,
    });

  console.log("Successfully moved to payment step.");
}

  async continueToPayment() {
    const type = await this.getCheckoutType();

    if (type === "old") {
      await this.selectShippingMethod();

      await this.page.evaluate(() =>
        window.scrollTo(0, document.body.scrollHeight)
      );

      await this.page.waitForTimeout(1500);

      await this.shippingContinueButton.click({ force: true });

      await this.page.waitForFunction(
        () => !window.location.href.includes("/checkout/shipping"),
        { timeout: 60000 }
      );

      return;
    }

    // NEW checkout
    await expect(this.shippingMethodDropdown).toBeVisible({ timeout: 60000 });
    await this.shippingFormContinueSafe();
  }

  private async shippingFormContinueSafe() {
    await this.shippingContinueButton.click();
    await expect(this.creditCardContainer).toBeVisible({ timeout: 60000 });
  }

  // =====================================================
  // PAYMENT
  // =====================================================
  async enterCardDetails() {

  const type = await this.getCheckoutType();

  if (type === "old") {
    console.log("Entering OLD checkout card details");

    await this.verifyPaymentPageLoaded();

    await this.cardNumberInput.fill(PAYMENT.CreditCard);
    await this.expiryMonthDropdown.selectOption({ value: PAYMENT.Month });
    await this.expiryYearDropdown.selectOption({ value: PAYMENT.Year });
    await this.cvcInput.fill(PAYMENT.CVC);

    return;
  }

  console.log("Entering NEW checkout card details");

  await this.cardNumberInput.fill(PAYMENT.CreditCard);
  await this.expiryInput.fill(PAYMENT.Expiry);
  await this.cvcInput.fill(PAYMENT.CVC);
}

  async verifyPaymentPageLoaded() {
    await this.page.waitForLoadState("domcontentloaded");

    const currentUrl = this.page.url();

    if (!currentUrl.includes("/payment") && !currentUrl.includes("/checkout")) {
      throw new Error(`Not on payment page. Current URL: ${currentUrl}`);
    }

    await expect(this.cardNumberInput).toBeVisible({ timeout: 60000 });
  }

  // =====================================================
  // PLACE ORDER (OLD + NEW)
  // =====================================================
 async placeOrderAndVerify() {
  console.log("Starting order verification...");

  const oldBtn = this.page.locator("#add-billing-address");
  const newBtn = this.page.locator("#affirm-place-order");

  let placeOrderBtn: Locator | null = null;

  if (await oldBtn.count() > 0) {
    placeOrderBtn = oldBtn;
  } else if (await newBtn.count() > 0) {
    placeOrderBtn = newBtn;
  } else {
    console.log("Place Order button not found, assuming already on confirmation page");
  }

  // Handle blocking modal if present
  const blockingModal = this.page.locator("#content-blocking-modal");
  if (await blockingModal.isVisible().catch(() => false)) {
    console.log("Blocking modal detected, waiting for it to disappear...");
    await blockingModal.waitFor({ state: "hidden", timeout: 60000 }).catch(() => {});
  }

  // Click place order if still present
  if (placeOrderBtn) {
    const visible = await placeOrderBtn.isVisible().catch(() => false);
    const enabled = await placeOrderBtn.isEnabled().catch(() => false);

    if (visible && enabled) {
      console.log("Clicking Place Order...");
      await placeOrderBtn.scrollIntoViewIfNeeded();

      await expect(placeOrderBtn).toBeVisible({ timeout: 60000 });
      await expect(placeOrderBtn).toBeEnabled({ timeout: 60000 });

      await Promise.all([
  this.page.waitForLoadState("networkidle"),
  placeOrderBtn.click({ force: true })
]);
    } else {
      console.log("Button already clicked or navigation started.");
    }
  }

console.log("Waiting for order confirmation...");

// Wait until either confirmation element OR URL appears
await this.page.waitForLoadState("domcontentloaded");
await this.page.waitForLoadState("networkidle");

await Promise.race([
  this.page.waitForURL(/complete|confirmation|success/, { timeout: 180000 }),
  this.page.locator("a.order-detail-link").first().waitFor({
    state: "visible",
    timeout: 180000
  })
]);

// After navigation settles, locate element again (fresh DOM)
const orderLink = this.page.locator("a.order-detail-link").first();

await expect(orderLink).toBeVisible({ timeout: 60000 });

const text = await orderLink.textContent();
const orderNumber = text?.match(/\d+/)?.[0];

console.log("Order confirmed:", orderNumber);

return orderNumber;
}
///********************************* */
async enterPaymentForLoggedIn() {
  const currentUrl = this.page.url();
  console.log("Current URL:", currentUrl);

  // ===== OLD CHECKOUT SHIPPING PAGE =====
  if (currentUrl.includes("/checkout/shipping")) {
    console.log("OLD checkout detected - Shipping page");

    const continueBtn = this.page.locator("#add-shipping-address");
    await continueBtn.scrollIntoViewIfNeeded();

    await Promise.all([
      this.page.waitForURL("**/checkout/payment", { timeout: 60000 }),
      continueBtn.click()
    ]);
  }

  // ===== PAYMENT PAGE =====
  await this.page.waitForLoadState("domcontentloaded");

  const savedCardDropdown = this.page.locator("#AppProductSavedCard");

  if (await savedCardDropdown.isVisible().catch(() => false)) {
    console.log("OLD checkout - selecting saved card");
    await savedCardDropdown.selectOption({ index: 1 });
  } else {
    console.log("NEW checkout detected - skipping saved card dropdown");
  }

  // ===== ENTER CVC =====
  const cvcField = this.page.locator("#AppProductCvc").first();
  await cvcField.waitFor({ state: "visible", timeout: 60000 });

  await cvcField.click();
  await cvcField.clear();
  await cvcField.type(PAYMENT.CVC, { delay: 200 }); // <- use PAYMENT here

  await this.page.waitForTimeout(500);
  console.log("CVC entered successfully");

  // ===== PLACE ORDER BUTTON DETECTION =====
  const oldBtn = this.page.locator("#add-billing-address");
  const newBtn = this.page.locator("#affirm-place-order");

  let placeOrderBtn: Locator | null = null;

  if (await oldBtn.count() > 0) {
    placeOrderBtn = oldBtn;
  } else if (await newBtn.count() > 0) {
    placeOrderBtn = newBtn;
  }

  // ===== CLICK PLACE ORDER =====
  if (placeOrderBtn) {
    await placeOrderBtn.scrollIntoViewIfNeeded();
    await expect(placeOrderBtn).toBeEnabled({ timeout: 60000 });

    console.log("Clicking Place Order...");
    await Promise.all([
      this.page.waitForLoadState("domcontentloaded"),
      placeOrderBtn.click({ force: true })
    ]);

    console.log("Waiting for order confirmation...");
  }

  console.log("Waiting for order confirmation page...");

  // ===== WAIT FOR ORDER CONFIRMATION =====
  const orderLink = this.page.locator("a.order-detail-link").first();

  await orderLink.waitFor({
    state: "visible",
    timeout: 180000
  });

  const text = await orderLink.textContent();
  const orderNumber = text?.match(/\d+/)?.[0];

  console.log("Order confirmed:", orderNumber);

  return orderNumber;
}

async verifyCheckoutPageLoaded() {
  const currentUrl = this.page.url();

  if (!currentUrl.includes("/checkout")) {
    throw new Error(
      `Expected to be somewhere in checkout flow, but landed on: ${currentUrl}`
    );
  }

  console.log(`User is in checkout flow: ${currentUrl}`);
}


async verifyCheckoutPage(pageType: string) {

  await this.page.waitForLoadState("domcontentloaded");

  const currentUrl = this.page.url();
  const type = pageType.toLowerCase();

  if (type === "payment") {
    await this.verifyPaymentPageLoaded();
    return;
  }

  if (type === "checkout") {
    if (!currentUrl.includes("/checkout")) {
      throw new Error(`Expected checkout but landed on: ${currentUrl}`);
    }
    return;
  }

  if (type === "sign-in") {
    await expect(this.page).toHaveURL(/\/checkout\/sign-?in/, {
      timeout: 60000,
    });
    return;
  }

  if (type === "shipping") {
    if (
      !currentUrl.includes("/checkout/shipping") &&
      !currentUrl.match(/\/checkout$/)
    ) {
      throw new Error(`Expected shipping page but landed on: ${currentUrl}`);
    }
    return;
  }

  throw new Error(`Unsupported checkout page type: ${pageType}`);
}





async verifyOrderConfirmation() {

  await this.page.waitForLoadState("domcontentloaded");

  const currentUrl = this.page.url();

  if (
    !currentUrl.includes("success") &&
    !currentUrl.includes("confirmation") &&
    !currentUrl.includes("thank")
  ) {
    throw new Error(`Not on confirmation page. URL: ${currentUrl}`);
  }

  const confirmationMessage = this.page.locator(
    "text=/thank you|order number|order #/i"
  );

  await confirmationMessage.first().waitFor({
    state: "visible",
    timeout: 60000,
  });

  console.log("Order confirmation page verified.");
}
  
 }
