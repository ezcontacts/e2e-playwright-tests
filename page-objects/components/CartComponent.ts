import { expect, Locator, Page } from "@playwright/test";
import { BaseComponent } from "../base/BaseComponent";
import { PAYMENT } from "../../test/data-test/testData";

export class CartComponent extends BaseComponent {

  readonly checkoutNowButton: Locator;
  readonly checkoutSignInButton: Locator;
  readonly emailField: Locator;

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

  readonly cardNumberInput: Locator;
  readonly expiryMonthDropdown: Locator;
  readonly expiryYearDropdown: Locator;
  readonly expiryInput: Locator;
  readonly cvcInput: Locator;
  readonly placeOrderButton: Locator;
  readonly creditCardContainer: Locator;

  constructor(page: Page, private paymentData = PAYMENT) {
    super(page, "body");

    this.checkoutNowButton = page.locator('a.checkout:has-text("Checkout Now")');
    this.checkoutSignInButton = page.locator('#checkout-sign-in-submit-btn');
    this.emailField = page.locator('#UserEmail');

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

    this.cardNumberInput = page.locator('#AppProductCardNumber');
    this.expiryMonthDropdown = page.locator('#AppProductExpiryMonth');
    this.expiryYearDropdown = page.locator('#AppProductExpiryYear');
    this.expiryInput = page.locator('#card-expiry-input');

    // FIXED STRICT MODE ISSUE
    this.cvcInput = page.locator('#AppProductCvc').first();

    this.placeOrderButton = page.locator('#add-billing-address');
    this.creditCardContainer = page.locator('#credit-card-box-container');
  }

  async getCheckoutType(): Promise<"old" | "new"> {

    const url = this.page.url();

    if (url.includes("/checkout/shipping") || url.includes("/checkout/payment")) {
      return "old";
    }

    if (url.match(/\/checkout$/)) {
      return "new";
    }

    throw new Error(`Unknown checkout type: ${url}`);
  }

  async proceedToCheckout() {

    await expect(this.checkoutNowButton).toBeVisible({ timeout: 30000 });

    await Promise.all([
      this.page.waitForURL(/\/checkout/, { timeout: 90000 }),
      this.checkoutNowButton.click(),
    ]);

    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForLoadState("networkidle");

    console.log("Checkout page loaded");
  }

  async enterGuestEmail() {
    await expect(this.emailField).toBeVisible();
    await this.emailField.fill(PAYMENT.email);
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
      { timeout: 90000 }
    );

    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForLoadState("networkidle");

    console.log("Navigated to shipping page");
  }

  async fillShippingAddress() {

    console.log("Waiting for shipping form...");

    await this.firstNameInput.waitFor({ state: "visible", timeout: 60000 });

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

    await this.page.waitForTimeout(1500);

    console.log("Shipping form filled");
  }

  async continueFromShippingIfNeeded() {

    const currentUrl = this.page.url();

    if (
      !currentUrl.includes("/checkout/shipping") &&
      !currentUrl.match(/\/checkout$/)
    ) {
      return;
    }

    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForLoadState("networkidle");

    const continueButton = this.page.locator(`
      #add-shipping-address,
      button:has-text("Continue"),
      button:has-text("Continue to Payment"),
      input[type="submit"]
    `).first();

    await continueButton.waitFor({ state: "visible", timeout: 60000 });

    await expect(continueButton).toBeEnabled();

    await continueButton.scrollIntoViewIfNeeded();

    await continueButton.click({ force: true });

    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForLoadState("networkidle");

    await this.page.waitForURL(
      (url) =>
        url.toString().includes("payment") ||
        url.toString().includes("review") ||
        url.toString().includes("checkout"),
      { timeout: 90000 }
    );

    await this.verifyPaymentPageLoaded();
  }

  async verifyPaymentPageLoaded() {

    await this.page.waitForLoadState("domcontentloaded");

    const currentUrl = this.page.url();

    if (!currentUrl.includes("/payment") && !currentUrl.includes("/checkout")) {
      throw new Error(`Not on payment page: ${currentUrl}`);
    }

    const cardNumber = this.page.locator("#AppProductCardNumber");
    const cvcField = this.page.locator("#AppProductCvc").first();
    const savedCardVisible = this.page.locator("#AppProductSavedCard:not(.hide)");

    await Promise.race([
      cardNumber.waitFor({ state: "visible", timeout: 90000 }),
      cvcField.waitFor({ state: "visible", timeout: 90000 }),
      savedCardVisible.waitFor({ state: "visible", timeout: 90000 })
    ]);

    console.log("Payment UI loaded");
  }

  async enterCardDetails() {

    const type = await this.getCheckoutType();

    if (type === "old") {

      await this.verifyPaymentPageLoaded();

      await this.cardNumberInput.fill(PAYMENT.CreditCard);
      await this.expiryMonthDropdown.selectOption({ value: PAYMENT.Month });
      await this.expiryYearDropdown.selectOption({ value: PAYMENT.Year });

      await this.cvcInput.waitFor({ state: "visible", timeout: 60000 });
      await this.cvcInput.fill(PAYMENT.CVC);

      return;
    }

    await this.cardNumberInput.waitFor({ state: "visible", timeout: 90000 });

    await this.cardNumberInput.fill(PAYMENT.CreditCard);

    if (await this.expiryInput.isVisible().catch(() => false)) {
      await this.expiryInput.fill(PAYMENT.Expiry);
    } else {
      await this.expiryMonthDropdown.selectOption({ value: PAYMENT.Month });
      await this.expiryYearDropdown.selectOption({ value: PAYMENT.Year });
    }

    await this.cvcInput.waitFor({ state: "visible", timeout: 60000 });
    await this.cvcInput.fill(PAYMENT.CVC);
  }

  async placeOrderAndVerify() {

    const oldBtn = this.page.locator("#add-billing-address");
    const newBtn = this.page.locator("#affirm-place-order");

    let placeOrderBtn: Locator | null = null;

    if (await oldBtn.count() > 0) {
      placeOrderBtn = oldBtn;
    } else if (await newBtn.count() > 0) {
      placeOrderBtn = newBtn;
    }

    if (!placeOrderBtn) {
      throw new Error("Place order button not found");
    }

    await placeOrderBtn.scrollIntoViewIfNeeded();

    await expect(placeOrderBtn).toBeVisible({ timeout: 60000 });
    await expect(placeOrderBtn).toBeEnabled({ timeout: 60000 });

    await placeOrderBtn.click({ force: true });

    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForLoadState("networkidle");

    await Promise.race([
      this.page.waitForURL(/complete|confirmation|success/, { timeout: 180000 }),
      this.page.locator("a.order-detail-link").first().waitFor({
        state: "visible",
        timeout: 180000
      })
    ]);

    const orderLink = this.page.locator("a.order-detail-link").first();

    await expect(orderLink).toBeVisible({ timeout: 60000 });

    const text = await orderLink.textContent();
    const orderNumber = text?.match(/\d+/)?.[0];

    console.log("Order confirmed:", orderNumber);

    return orderNumber;
  }

  async enterPaymentForLoggedIn() {

    const currentUrl = this.page.url();

    if (currentUrl.includes("/checkout/shipping")) {

      const continueBtn = this.page.locator("#add-shipping-address");

      if (await continueBtn.isVisible().catch(() => false)) {

        await continueBtn.scrollIntoViewIfNeeded();

        await continueBtn.click();

        await this.page.waitForURL(/checkout\/payment/, { timeout: 60000 });
      }
    }

    await this.verifyPaymentPageLoaded();

    const savedCardDropdown = this.page.locator("#AppProductSavedCard");

    if (await savedCardDropdown.isVisible().catch(() => false)) {
      await savedCardDropdown.selectOption({ index: 1 });
    }

    const cvcField = this.page.locator("#AppProductCvc").first();

    if (await cvcField.isVisible().catch(() => false)) {
      await cvcField.fill(PAYMENT.CVC);
    }
  }

  async verifyCheckoutPageLoaded() {

    await this.page.waitForLoadState("domcontentloaded");

    const currentUrl = this.page.url();

    if (!currentUrl.includes("/checkout")) {
      throw new Error(`Expected checkout flow but landed on: ${currentUrl}`);
    }

    console.log("Checkout page verified:", currentUrl);
  }

  async verifyOrderConfirmation() {

    await this.page.waitForLoadState("domcontentloaded");

    const confirmationMessage = this.page.locator(
      "text=/thank you|order number|order #/i"
    );

    await confirmationMessage.first().waitFor({
      state: "visible",
      timeout: 60000,
    });

    console.log("Order confirmation verified");
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

}