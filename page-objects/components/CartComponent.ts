import { expect, Locator, Page, FrameLocator} from "@playwright/test";
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
  // -----------------------
  // AFFIRM LOCATORS
  // -----------------------
  readonly affirmOption: Locator;
  readonly affirmFrame: FrameLocator;
  readonly affirmPlanRadios: Locator;
  readonly affirmPhoneInput: Locator;
  readonly affirmOtpInput: Locator;
  readonly affirmContinueButton: Locator;
  readonly affirmPlans: Locator;
  readonly affirmPlanIndicator: Locator;
  readonly affirmChoosePlanButton: Locator;
  readonly affirmDisclosureCheckbox: Locator;
  readonly affirmGenericSubmitButton: Locator;

  // -----------------------
  // PAYPAL LOCATORS
  // -----------------------

  readonly paypalOption: Locator;
  readonly paypalEmail: Locator;
  readonly paypalPassword: Locator;
  readonly paypalNextBtn: Locator;
  readonly paypalLoginBtn: Locator;
  readonly paypalPayBtn: Locator;
  readonly paypalCompletePurchaseBtn: Locator;
  

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

    // AFFIRM
    this.affirmOption = page.locator('label:has(#affirmpay-img)');
    const frame = page.frameLocator('iframe[src*="affirm"]'); // keep FrameLocator
    this.affirmPhoneInput = frame.locator('[data-testid="phone-number-field"]'); // Locator
    this.affirmOtpInput = frame.locator('[data-testid="phone-pin-field"]'); // Locator
    this.affirmContinueButton = frame
      .locator('[data-testid="submit-button"]')
      .filter({ hasText: /continue/i })
      .first();
    this.affirmPlans = frame.locator('label:has([data-testid="indicator"])'); // Locator
    this.affirmPlanIndicator = this.affirmPlans.locator('[data-testid="indicator"]'); // Locator
    this.affirmChoosePlanButton = frame.locator('[data-testid="continue-with-selected-term-button"]'); // Locator
    this.affirmDisclosureCheckbox = frame.locator('input[type="checkbox"]'); // Locator
    this.affirmGenericSubmitButton = frame
      .locator('[data-testid="submit-button"]')
      .filter({ hasText: /accept|confirm|continue|next|review/i })
      .first();

    this.affirmFrame = page.frameLocator('iframe[src*="affirm"]');

    this.affirmContinueButton = this.affirmFrame.locator('[data-testid="submit-button"]');

    this.affirmPlanRadios = this.affirmFrame.locator('input[type="radio"]');

    this.affirmChoosePlanButton = this.affirmFrame.getByTestId("continue-with-selected-term-button");
    this.affirmDisclosureCheckbox = this.affirmFrame.locator('[data-testid="disclosure-checkbox"]');

    this.affirmGenericSubmitButton = this.affirmFrame.locator('[data-testid="submit-button"]');
    // PayPal
    this.paypalOption = page.locator('#paypal-img');

    // These will be used inside popup context dynamically
    this.paypalEmail = page.locator('#email');
    this.paypalPassword = page.locator('#password');

    // FIXED buttons (no strict mode issue)
    this.paypalNextBtn = page.getByRole('button', { name: /^next$/i });
    this.paypalLoginBtn = page.getByRole('button', { name: /^log in$/i });

    // Final buttons
    this.paypalPayBtn = page.locator('[data-dd-action-name="Pay"]');
    this.paypalCompletePurchaseBtn = page.getByTestId('submit-button-initial');
    }

  private async stepWait() {
  await this.page.waitForTimeout(2000);
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

  const email = PAYMENT.emailg; // ✅ correct way
  await this.emailField.fill(email);

  console.log("Using guest email:", email);
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

 // =======================
// VERIFY ORDER CONFIRMATION
// =======================
async verifyOrderConfirmation() {

  console.log("🔍 Verifying order confirmation...");

  await this.page.waitForLoadState("domcontentloaded");

  // ✅ URL check (fast signal)
  const urlMatched = await this.page.waitForURL(
    /confirmation|complete|success/,
    { timeout: 20000 }
  ).then(() => true).catch(() => false);

  if (urlMatched) {
    console.log("✅ URL indicates confirmation page");
  } else {
    console.log("⚠️ URL did not change");
  }

  // ✅ Confirmation text
  const confirmationMessage = this.page.locator(
    "text=/thank you for your order|order confirmed|order number|order #/i"
  );

  const textVisible = await confirmationMessage.first().waitFor({
    state: "visible",
    timeout: 20000,
  }).then(() => true).catch(() => false);

  if (textVisible) {
    console.log("✅ Confirmation text found");
  } else {
    console.log("⚠️ Confirmation text NOT found");
  }

  // ✅ Order number (strong signal)
  const orderNumber = this.page.locator(
    "text=/order\\s*(number|#)[:\\s]*\\w+/i"
  );

  const orderExists = await orderNumber.first().isVisible().catch(() => false);

  if (orderExists) {
    console.log("✅ Order number detected");
  }

  // ❌ Fail only if EVERYTHING failed
  if (!urlMatched && !textVisible && !orderExists) {
    throw new Error("❌ Order confirmation not detected");
  }

  console.log("🎉 Order confirmation verified");
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



  async placeOrder() {

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

  // ✅ FIX: Handle navigation properly
  await Promise.all([
    this.page.waitForLoadState("domcontentloaded"),
    placeOrderBtn.click({ force: true })
  ]);

  console.log("Place order clicked");

  // Optional safe wait
  await this.page.waitForLoadState("networkidle").catch(() => {});
}


// =======================
// AFFIRM PAYMENT FLOW
// =======================
async payWithAffirm() {
  console.log("🔵 Starting Affirm flow...");

  await this.verifyPaymentPageLoaded();

  // =======================
  // SELECT AFFIRM OPTION
  // =======================
  console.log("Selecting Affirm payment...");

  await this.affirmOption.waitFor({ state: "visible", timeout: 60000 });

  await Promise.all([
    this.page.waitForLoadState("domcontentloaded"),
    this.affirmOption.click()
  ]);

  let frame = this.page.frameLocator('iframe[src*="affirm"]');

  // =======================
  // STEP 1: PHONE
  // =======================
  console.log("Entering phone...");

  await this.affirmPhoneInput.waitFor({ state: "visible", timeout: 60000 });
  await this.affirmPhoneInput.fill(this.paymentData.affirmPhone);

  let continueBtn = frame.locator('[data-testid="submit-button"]')
    .filter({ hasText: /continue/i })
    .first();

  await continueBtn.waitFor({ state: "visible" });
  await continueBtn.click({ force: true });

  console.log("✅ Phone submitted");

  // =======================
  // STEP 2: OTP (RETRY SAFE)
  // =======================
  console.log("Entering OTP...");

  await this.affirmOtpInput.waitFor({ state: "visible", timeout: 60000 });
  await this.affirmOtpInput.fill(this.paymentData.affirmOtp);

  let otpContinue = frame.locator('[data-testid="submit-button"]')
    .filter({ hasText: /confirm|continue|next/i })
    .first();

  await otpContinue.waitFor({ state: "visible" });

  for (let i = 0; i < 3; i++) {
    try {
      await otpContinue.click({ force: true });
      console.log("✅ OTP clicked");
      break;
    } catch {
      console.log("Retrying OTP click...");
      await this.page.waitForTimeout(1000);

      frame = this.page.frameLocator('iframe[src*="affirm"]');
      otpContinue = frame.locator('[data-testid="submit-button"]')
        .filter({ hasText: /confirm|continue|next/i })
        .first();
    }
  }

  console.log("✅ OTP submitted");

  // =======================
  // STEP 3: PLAN SELECTION
  // =======================
  console.log("Waiting for plan radio button...");

  frame = this.page.frameLocator('iframe[src*="affirm"]');

  const radios = frame.locator('input[type="radio"]');
  await radios.first().waitFor({ state: "visible", timeout: 120000 });

  const count = await radios.count();
  console.log(`Found ${count} plans`);

  let selected = false;

  for (let i = 0; i < count; i++) {
    const radio = radios.nth(i);

    try {
      await radio.scrollIntoViewIfNeeded();
      await radio.click({ force: true });

      await expect(radio).toBeChecked({ timeout: 5000 });

      console.log(`✅ Plan ${i + 1} selected`);
      selected = true;
      break;
    } catch {
      console.log(`Retrying plan ${i + 1}...`);
      await this.page.waitForTimeout(1000);
    }
  }

  if (!selected) {
    throw new Error("❌ No plan could be selected");
  }

  // stabilization (VERY IMPORTANT)
  await this.page.waitForTimeout(3000);

// =======================
// STEP 4: CHOOSE PLAN (ROBUST SCROLL FIX)
// =======================
console.log("Waiting for 'Choose plan' button...");

let visible = false;
const endTime = Date.now() + 120000;

while (Date.now() < endTime) {
  try {
    // 🔥 ALWAYS re-fetch frame (iframe reload safe)
    const frame = this.page.frameLocator('iframe[src*="affirm"]');
    const chooseBtn = frame.getByTestId("continue-with-selected-term-button");

    // check if visible
    if (await chooseBtn.isVisible().catch(() => false)) {
      await expect(chooseBtn).toBeEnabled({ timeout: 10000 });

      await chooseBtn.scrollIntoViewIfNeeded().catch(() => {});
      await this.page.waitForTimeout(500);

      await chooseBtn.click({ force: true });

      console.log("✅ Plan chosen");
      visible = true;
      break;
    }

    // 🔥 SCROLL STRATEGY (KEY FIX)
    await frame.locator("body").evaluate((el) => {
      el.scrollTop += 400;   // controlled scroll
    });

    await this.page.waitForTimeout(700);

  } catch {
    // iframe reload fallback
    await this.page.waitForTimeout(1000);
  }
}

if (!visible) {
  throw new Error("❌ Choose plan button not found even after scrolling");
}

  // =======================
  // STEP 5: CHECKBOX / CONFIRM
  // =======================
  console.log("Handling disclosure / confirm...");

  await Promise.race([
    this.affirmDisclosureCheckbox.waitFor({ state: "visible", timeout: 15000 }).catch(() => {}),
    this.affirmGenericSubmitButton.waitFor({ state: "visible", timeout: 15000 })
  ]);

  if (await this.affirmDisclosureCheckbox.isVisible().catch(() => false)) {
    console.log("✅ Checkbox detected");

    try {
      await this.affirmDisclosureCheckbox.check({ force: true });
      await expect(this.affirmDisclosureCheckbox).toBeChecked({ timeout: 5000 });
    } catch {
      const el = await this.affirmDisclosureCheckbox.elementHandle();
      if (el) await el.evaluate((node: any) => node.click());
    }
  }

  // =======================
  // STEP 6: FINAL CONFIRM
  // =======================
  console.log("Clicking final confirm...");

  await this.affirmGenericSubmitButton.waitFor({ state: "visible", timeout: 20000 });

  for (let i = 0; i < 3; i++) {
    try {
      await this.affirmGenericSubmitButton.scrollIntoViewIfNeeded();
      await this.affirmGenericSubmitButton.click({ force: true });

      console.log("✅ Final confirm clicked");
      break;
    } catch {
      console.log("Retrying final confirm...");
      await this.page.waitForTimeout(1500);

      frame = this.page.frameLocator('iframe[src*="affirm"]');
    }
  }

  console.log("🎉 Affirm flow completed!");
}


async payWithPaypal() {
  console.log("🔵 Starting PayPal flow...");

  await this.paypalOption.waitFor({ state: "visible", timeout: 60000 });

  // =======================
  // HANDLE POPUP OR SAME TAB
  // =======================
  let paypalPage;

  const [popup] = await Promise.all([
    this.page.waitForEvent("popup").catch(() => null),
    this.paypalOption.click()
  ]);

  paypalPage = popup || this.page;

  await paypalPage.waitForLoadState("domcontentloaded");

  console.log("✅ PayPal opened");

  // =======================
  // EMAIL
  // =======================
  const emailField = paypalPage.locator('#email');

  await emailField.waitFor({ state: "visible", timeout: 60000 });
  await emailField.fill(this.paymentData.paypalEmail);

  console.log("✅ Email entered");

  // =======================
  // NEXT (IF PRESENT)
  // =======================
  const nextBtn = paypalPage.getByRole('button', { name: /^next$/i });

  if (await nextBtn.isVisible().catch(() => false)) {
    await nextBtn.click();
    console.log("➡️ Clicked Next");
  }

  // =======================
  // PASSWORD
  // =======================
  const passwordField = paypalPage.locator('#password');

  await passwordField.waitFor({ state: "visible", timeout: 60000 });
  await passwordField.fill(this.paymentData.paypalPassword);

  console.log("✅ Password entered");

  // =======================
  // LOGIN (STRICT FIX)
  // =======================
  const loginBtn = paypalPage.getByRole('button', { name: /^log in$/i });

  await loginBtn.waitFor({ state: "visible", timeout: 60000 });
  await loginBtn.click();

  console.log("➡️ Login clicked");

  // =======================
  // WAIT FOR PAYMENT SCREEN
  // =======================
  const payBtn = paypalPage.locator('[data-dd-action-name="Pay"]');
  const completePurchaseBtn = paypalPage.locator('[data-testid="submit-button-initial"]');

  await Promise.race([
    payBtn.waitFor({ state: "visible", timeout: 90000 }).catch(() => {}),
    completePurchaseBtn.waitFor({ state: "visible", timeout: 90000 })
  ]);

  console.log("✅ Payment screen ready");

  // =======================
  // CLICK PAY / COMPLETE PURCHASE
  // =======================
  if (await completePurchaseBtn.isVisible().catch(() => false)) {
    console.log("➡️ First-time user detected");

    await completePurchaseBtn.click({ force: true });

    console.log("✅ Complete Purchase clicked");

  } else {
    console.log("➡️ Regular Pay flow");

    await payBtn.click({ force: true });

    console.log("✅ Pay clicked");
  }

  // 🚨 DO NOT USE paypalPage AFTER THIS POINT

  // =======================
  // HANDLE POPUP CLOSE OR REDIRECT
  // =======================
  if (popup) {
    console.log("⏳ Waiting for PayPal popup to close...");

    await popup.waitForEvent("close", { timeout: 120000 }).catch(() => {});

    console.log("✅ Popup closed");
  } else {
    console.log("⏳ Waiting for redirect in same tab...");

    await this.page.waitForLoadState("domcontentloaded", {
      timeout: 120000
    }).catch(() => {});
  }

  // =======================
  // STABILIZE MERCHANT PAGE (CRITICAL FIX)
  // =======================
  console.log("⏳ Stabilizing merchant page...");

  await this.page.waitForTimeout(5000); // buffer for backend processing
  await this.page.waitForLoadState("networkidle").catch(() => {});
  await this.page.waitForTimeout(5000);

  console.log("✅ Merchant page ready");

  console.log("🎉 PayPal flow completed!");
}
}