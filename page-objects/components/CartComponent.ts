import { expect, Locator, Page} from "@playwright/test";
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
  readonly affirmPhoneInput: Locator;
  readonly affirmOtpInput: Locator;
  readonly affirmContinueButton: Locator;
  readonly affirmPlans: Locator;
  readonly affirmPlanIndicator: Locator;
  readonly affirmChoosePlanButton: Locator;
  readonly affirmDisclosureCheckbox: Locator;
  readonly affirmGenericSubmitButton: Locator;
  

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
    }

  private async stepWait() {
  await this.page.waitForTimeout(2000);
  }



async clickOnCheckoutNowButton(): Promise<void> {
    // Ensure visible & enabled
    await expect(this.checkoutNowButton).toBeVisible({ timeout: 15000 });
    await expect(this.checkoutNowButton).toBeEnabled();

    // Listen for new page if clicking opens a new tab
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'), // Waits for new page if opened
      this.checkoutNowButton.click(),           // Click triggers navigation
    ]).catch(() => [this.page]); // fallback if no new page opens

    // Wait for URL load in the correct page context
    await newPage.waitForURL(/checkout/, { timeout: 30000 });
    await newPage.waitForLoadState('networkidle');
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

    const frame = this.page.frameLocator('iframe[src*="affirm"]');

    // =======================
    // STEP 1: PHONE
    // =======================
    console.log("Entering phone...");

    const phoneField = frame.getByTestId("phone-number-field");
    await phoneField.waitFor({ state: "visible", timeout: 60000 });
    await phoneField.fill(this.paymentData.affirmPhone);

    const phoneContinue = frame.locator('[data-testid="submit-button"]')
      .filter({ hasText: /continue/i })
      .first();

    await phoneContinue.waitFor({ state: "visible" });

    await Promise.all([
      this.page.waitForLoadState("domcontentloaded"),
      phoneContinue.click({ force: true })
    ]);

    console.log("✅ Phone submitted");

    // =======================
    // STEP 2: OTP
    // =======================
    console.log("Entering OTP...");

    const otpField = frame.getByTestId("phone-pin-field");
    await otpField.waitFor({ state: "visible", timeout: 60000 });
    await otpField.fill(this.paymentData.affirmOtp);

    const otpContinue = frame.locator('[data-testid="submit-button"]')
      .filter({ hasText: /confirm|continue|next/i })
      .first();

    await otpContinue.waitFor({ state: "visible" });

    await Promise.all([
      this.page.waitForLoadState("domcontentloaded"),
      otpContinue.click({ force: true })
    ]);

    console.log("✅ OTP submitted");

  // =======================
  // STEP 3: PLAN (FIXED FOR IFRAME RELOAD)
  // =======================
  console.log("Waiting for plan options to load...");

  // 🔥 RE-GET FRAME (critical fix)
  const freshFrame = this.page.frameLocator('iframe[src*="affirm"]');

  const planIndicators = freshFrame.locator('[data-testid="indicator"]');

  // wait until at least one plan is visible
  await planIndicators.first().waitFor({ state: "visible", timeout: 90000 });

  // buffer for UI stabilization
  await this.page.waitForTimeout(3000);

  console.log("Selecting plan...");

  const plan = freshFrame.locator('label:has([data-testid="indicator"])').first();

  await plan.waitFor({ state: "visible", timeout: 60000 });

  await plan.click({ force: true });

  console.log("✅ Plan selected");

  // =======================
  // STEP 4: CHOOSE PLAN (WAIT PROPERLY)
  // =======================
  console.log("Waiting for 'Choose plan' button...");

  const choosePlan = frame.getByTestId("continue-with-selected-term-button");

  // wait for button visible
  await choosePlan.waitFor({ state: "visible", timeout: 60000 });

  await expect(choosePlan).toBeEnabled({ timeout: 60000 });


  // extra buffer (important for Affirm UI)
  await this.page.waitForTimeout(1500);

  await Promise.all([
    this.page.waitForLoadState("domcontentloaded"),
    choosePlan.click({ force: true })
  ]);

  console.log("✅ Plan chosen");

    // =======================
    // STEP 5: HANDLE CHECKBOX OR DIRECT CONFIRM
    // =======================
    console.log("Handling disclosure / confirm...");

    const checkboxInput = frame.locator('[data-testid="disclosure-checkbox"]');
    const confirmBtn = frame.locator('[data-testid="submit-button"]')
      .filter({ hasText: /accept|confirm|continue|next|review/i })
      .first();

    // Wait for either checkbox OR confirm button
    await Promise.race([
      checkboxInput.waitFor({ state: "visible", timeout: 15000 }).catch(() => {}),
      confirmBtn.waitFor({ state: "visible", timeout: 15000 })
    ]);

    // ===== CHECKBOX FLOW =====
    if (await checkboxInput.isVisible().catch(() => false)) {
      console.log("✅ Checkbox detected");

      try {
        // 🔥 ONLY CLICK INPUT (NO LABEL / NO TEXT)
        await checkboxInput.check({ force: true });

        await expect(checkboxInput).toBeChecked({ timeout: 5000 });

        console.log("✅ Checkbox checked safely");
      } catch (err) {
        console.log("⚠️ Checkbox check failed, fallback JS");

        const el = await checkboxInput.elementHandle();
        if (el) {
          await el.evaluate((node: any) => node.click());
        }
      }
    } else {
      console.log("ℹ️ No checkbox, direct confirm flow");
    }

    // =======================
    // STEP 6: FINAL CONFIRM
    // =======================
    console.log("Clicking final confirm...");

    await confirmBtn.waitFor({ state: "visible", timeout: 20000 });

    await Promise.all([
      this.page.waitForLoadState("domcontentloaded"),
      confirmBtn.click({ force: true })
    ]);

    console.log("✅ Final confirm clicked");

    // =======================
    // STEP 7: CONFIRMATION
    // =======================
    console.log("Waiting for confirmation...");

    await this.page.waitForLoadState("domcontentloaded");

    await this.page.waitForURL(/complete|confirmation|success/, {
      timeout: 60000
    }).catch(() => {
      console.log("⚠️ Confirmation URL not detected");
    });

    await this.page.locator("text=/thank you|order number|order #/i")
      .first()
      .waitFor({ state: "visible", timeout: 60000 })
      .catch(() => console.log("⚠️ Confirmation text not found"));

    // =======================
    // STEP 8: VERIFY ORDER
    // =======================
    await this.verifyOrderConfirmation();

    console.log("🎉 Affirm flow completed!");
  }
}

