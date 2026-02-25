import { expect, Locator, Page } from "@playwright/test";
import { BaseComponent } from "../base/BaseComponent";

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

  constructor(page: Page) {
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
private async getCheckoutType(): Promise<"old" | "new"> {
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
      this.page.waitForURL(/\/checkout/, { timeout: 80000 }),
      this.checkoutNowButton.click(),
    ]);
  }

  async enterGuestEmail(email: string) {
    await expect(this.emailField).toBeVisible();
    await this.emailField.fill(email);
  }

async clickCheckoutSignIn() {
  await this.checkoutSignInButton.click();

  await this.page.waitForURL(
    (url) => {
      const href = url.toString();
      return (
        href.includes("/checkout/shipping") ||
        href.endsWith("/checkout")
      );
    },
    { timeout: 60000 }
  );

  console.log("Navigated to shipping page successfully.");
}

  // =====================================================
  // SHIPPING
  // =====================================================
  async fillShippingAddress(data: any) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.addressLine1Input.fill(data.addressLine1);
    await this.addressLine2Input.fill(data.addressLine2);
    await this.cityInput.fill(data.city);
    await this.stateDropdown.selectOption({ label: data.state });
    await this.zipCodeInput.fill(data.zipCode);
    await this.phoneInput.fill(data.phone);

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

  // Wait for any visible input or select to confirm page loaded
  await this.page.locator('input:visible, select:visible').first().waitFor({
    state: "visible",
    timeout: 30000,
  });

  console.log("Looking for Continue button...");

  // NEW ULTRA-RELIABLE locator
  const continueButton = this.page.locator(`
    #add-shipping-address, 
    button:has-text("Continue"), 
    button:has-text("Continue to Payment"),
    input[type="submit"]:has-text("Continue")
  `).first();

  const count = await continueButton.count();
  if (count === 0) {
    throw new Error("Continue button not found on shipping page.");
  }

  await continueButton.waitFor({ state: "visible", timeout: 30000 });

  // Log if the button is enabled
  console.log("Continue button enabled state:", await continueButton.isEnabled());

  // Force click to bypass any overlay issues
  await continueButton.click({ force: true });

  console.log("Clicked Continue. Waiting for next step...");

  // Wait until URL changes to payment, review, or checkout (covers old + new)
  await this.page.waitForURL(
    (url) =>
      url.toString().includes("payment") ||
      url.toString().includes("review") ||
      url.toString().includes("checkout"),
    { timeout: 60000 }
  );

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
  async enterCardDetails(data: any) {
    const type = await this.getCheckoutType();

    if (type === "old") {
      console.log("Entering OLD checkout card details");

      await this.verifyPaymentPageLoaded();

      await this.cardNumberInput.fill(data.CreditCard);
      await this.expiryMonthDropdown.selectOption({ value: data.Month });
      await this.expiryYearDropdown.selectOption({ value: data.Year });
      await this.cvcInput.fill(data.CVC);
      return;
    }

    console.log("Entering NEW checkout card details");

    await this.cardNumberInput.fill(data.CreditCard);
    await this.expiryInput.fill(data.Expiry);
    await this.cvcInput.fill(data.CVC);
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
    await this.placeOrderButton.scrollIntoViewIfNeeded();
    await expect(this.placeOrderButton).toBeEnabled();

    await Promise.all([
      this.page.waitForLoadState("networkidle"),
      this.placeOrderButton.click(),
    ]);

    await this.page.waitForTimeout(3000);

    // OLD checkout confirmation
    const oldOrderLink = this.page.locator("a.order-detail-link").first();
    if (await oldOrderLink.count() > 0) {
      await oldOrderLink.waitFor({ state: "visible", timeout: 180000 });
      const text = await oldOrderLink.textContent();
      return text?.match(/\d+/)?.[0];
    }

    // NEW checkout confirmation
    const newHeading = this.page.locator(
      "h3.title",
      { hasText: /Thank You for Your Order/i }
    ).first();

    if (await newHeading.count() > 0) {
      await newHeading.waitFor({ state: "visible", timeout: 180000 });
      const text = await newHeading.locator("a").first().textContent();
      return text?.match(/\d+/)?.[0];
    }

    throw new Error("Order confirmation not detected.");
  }
 }
