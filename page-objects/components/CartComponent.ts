import { expect, Locator, Page, FrameLocator } from "@playwright/test";
import { BaseComponent } from "../base/BaseComponent";
import { PAYMENT } from "../../test/data-test/testData";

export class CartComponent extends BaseComponent {
    // =======================
    // BASIC LOCATORS
    // =======================
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
    readonly continueButton: Locator;

    // =======================
    // PAYMENT LOCATORS
    // =======================
    readonly cardNumberInput: Locator;
    readonly expiryMonthDropdown: Locator;
    readonly expiryYearDropdown: Locator;
    readonly expiryInput: Locator;
    readonly cvcInput: Locator;
    readonly placeOrderButton: Locator;
    readonly oldPlaceOrderButton: Locator;
    readonly newPlaceOrderButton: Locator;
    readonly creditCardContainer: Locator;
    readonly savedCardDropdown: Locator;
    readonly savedCardVisible: Locator; // Added per review
    readonly orderDetailLink: Locator;
    readonly orderNumberText: Locator; // Added per review

    // =======================
    // AFFIRM LOCATORS
    // =======================
    readonly affirmOption: Locator;
    readonly affirmFrame: FrameLocator;
    readonly affirmPhoneInput: Locator;
    readonly affirmOtpInput: Locator;
    readonly affirmContinueButton: Locator;
    readonly affirmPlans: Locator;
    readonly affirmPlanIndicator: Locator;
    readonly affirmPlanRadios: Locator;
    readonly affirmChoosePlanButton: Locator;
    readonly affirmDisclosureCheckbox: Locator;
    readonly affirmGenericSubmitButton: Locator;
    readonly affirmOtpContinueButton: Locator;


    // =======================
    // KLARNA LOCATORS
    // =======================
    readonly klarnaFrame: FrameLocator;
    readonly klarnaOption: Locator;
    readonly klarnaPhoneInput: Locator;
    readonly klarnaContinueButton: Locator;
    readonly klarnaOtpInput: Locator;
    readonly klarnaPlanRadios: Locator;
    readonly klarnaPlanContinueButton: Locator;
    readonly klarnaPayButton: Locator;

    // -----------------------
    // PAYPAL LOCATORS
    // -----------------------
    readonly paypalOption: Locator;
    // PayPal sub-pages require dynamic page targeting, 
    // but the selectors are now standard string-based references inside the functions.
    readonly paypalEmail: (page: Page) => Locator;
    readonly paypalPassword: (page: Page) => Locator;
    readonly paypalNextBtn: (page: Page) => Locator;
    readonly paypalLoginBtn: (page: Page) => Locator;
    readonly paypalPayBtn: (page: Page) => Locator;
    readonly paypalCompletePurchaseBtn: (page: Page) => Locator;

    // -----------------------
    // Order Confirmation
    // -----------------------
    readonly confirmationMessage: Locator;
    readonly confirmationContainer: Locator;

    constructor(page: Page, private paymentData = PAYMENT) {
        super(page, "body");

        // --- BASIC ---
        this.checkoutNowButton = page.locator('a.checkout:has-text("Checkout Now")');
        this.checkoutSignInButton = page.locator("#checkout-sign-in-submit-btn");
        this.emailField = page.locator("#UserEmail");

        this.firstNameInput = page.locator("#AccountShippingAddressFirstName");
        this.lastNameInput = page.locator("#AccountShippingAddressLastName");
        this.addressLine1Input = page.locator("#AccountShippingAddressAddressLine1");
        this.addressLine2Input = page.locator("#AccountShippingAddressAddressLine2");
        this.cityInput = page.locator("#AccountShippingAddressAddressCity");
        this.stateDropdown = page.locator("#AccountShippingAddressUsAddressRegion");
        this.zipCodeInput = page.locator("#AccountShippingAddressAddressPostalZip");
        this.phoneInput = page.locator("#AccountShippingAddressAddressShipPhonePrimary");
        this.shippingMethodDropdown = page.locator("#selectShipId");
        this.shippingContinueButton = page.locator("#add-shipping-address");

        // Centralized continue button locator used across multiple methods
        this.continueButton = page.locator(`#add-shipping-address, button:has-text("Continue"), button:has-text("Continue to Payment"), input[type="submit"]`).first();

        // --- CREDIT CARD & ORDER ---
        this.cardNumberInput = page.locator("#AppProductCardNumber");
        this.expiryMonthDropdown = page.locator("#AppProductExpiryMonth");
        this.expiryYearDropdown = page.locator("#AppProductExpiryYear");
        this.expiryInput = page.locator("#card-expiry-input");
        this.cvcInput = page.locator("#AppProductCvc").first();
        this.placeOrderButton = page.locator("#add-billing-address");
        this.oldPlaceOrderButton = page.locator("#add-billing-address");
        this.newPlaceOrderButton = page.locator("#affirm-place-order");
        this.creditCardContainer = page.locator("#credit-card-box-container");
        this.savedCardDropdown = page.locator("#AppProductSavedCard");
        this.savedCardVisible = page.locator("#AppProductSavedCard:not(.hide)"); // Defined in constructor per review
        this.orderDetailLink = page.locator("a.order-detail-link").first();
        this.orderNumberText = page.locator("text=/order\\s*(number|#)[:\\s]*\\w+/i"); // Defined in constructor per review

        // --- AFFIRM LOCATORS ---
        this.affirmOption = page.locator("label:has(#affirmpay-img)");
        this.affirmFrame = page.frameLocator('iframe[src*="affirm"]');
        this.affirmPhoneInput = this.affirmFrame.locator('[data-testid="phone-number-field"]');
        this.affirmOtpInput = this.affirmFrame.locator('[data-testid="phone-pin-field"]');
        this.affirmContinueButton = this.affirmFrame.locator('[data-testid="submit-button"]').filter({ hasText: /continue/i }).first();
        this.affirmPlans = this.affirmFrame.locator('label:has([data-testid="indicator"])');
        this.affirmPlanIndicator = this.affirmPlans.locator('[data-testid="indicator"]');
        this.affirmPlanRadios = this.affirmFrame.locator('input[type="radio"]');
        this.affirmChoosePlanButton = this.affirmFrame.getByTestId("continue-with-selected-term-button");
        this.affirmDisclosureCheckbox = this.affirmFrame.locator('[data-testid="disclosure-checkbox"]');
        this.affirmGenericSubmitButton = this.affirmFrame.locator('[data-testid="submit-button"]');
        this.affirmOtpContinueButton = this.affirmGenericSubmitButton.filter({ hasText: /confirm|continue|next/i }).first();


        // --- KLARNA ---
        this.klarnaFrame = page.frameLocator('iframe[src*="klarna"]');

        // click target (FIXED)
        this.klarnaOption = page.locator('label:has(#klarna-img)');

        // everything INSIDE iframe
        this.klarnaPhoneInput = this.klarnaFrame.locator("#phone");
        this.klarnaContinueButton = this.klarnaFrame.locator('#onContinue__text');

        this.klarnaOtpInput = this.klarnaFrame.locator("#otp_field");

        this.klarnaPlanRadios = this.klarnaFrame.locator('input[name="offers__group"]');
        this.klarnaPlanContinueButton = this.klarnaFrame.locator("#offers-selector-continue-button");

        this.klarnaPayButton = this.klarnaFrame
        .locator('#buy_button__text')
        .filter({ hasText: /pay with/i });

        // --- PAYPAL LOCATORS ---
        this.paypalOption = page.locator("#paypal-img");
        this.paypalEmail = (p: Page) => p.locator("#email");
        this.paypalPassword = (p: Page) => p.locator("#password");
        this.paypalNextBtn = (p: Page) => p.getByRole("button", { name: /^next$/i });
        this.paypalLoginBtn = (p: Page) => p.getByRole("button", { name: /^log in$/i });
        this.paypalPayBtn = (p: Page) => p.locator('[data-dd-action-name="Pay"]');
        this.paypalCompletePurchaseBtn = (p: Page) => p.getByTestId("submit-button-initial");

        // --- ORDER CONFIRMATION ---
        this.confirmationMessage = page.locator("text=/thank you for your order|order confirmed|order number|order #/i");
        this.confirmationContainer = page.locator('[class*="confirmation"], [id*="confirmation"], [data-testid*="confirmation"]');
    }

    async getCheckoutType(): Promise<"old" | "new"> {
        const url = this.page.url();
        if (url.includes("/checkout/shipping") || url.includes("/checkout/payment")) return "old";
        if (url.endsWith("/checkout")) return "new";
        throw new Error(`Unknown checkout type: ${url}`);
    }

    // =======================
    // CHECKOUT FLOW
    // =======================
    async proceedToCheckout() {
        await expect(this.checkoutNowButton).toBeVisible({ timeout: 30000 });
        // Promise.all ensures the listener for the URL change is active before the click occurs
        await Promise.all([
            this.page.waitForURL(/\/checkout/, { timeout: 90000 }),
            this.checkoutNowButton.click(),
        ]);
        await this.page.waitForLoadState("domcontentloaded");
        await this.page.waitForLoadState("networkidle");
    }

    async enterGuestEmail() {
        await expect(this.emailField).toBeVisible();
        await this.emailField.fill(this.paymentData.emailg);
    }

    async clickCheckoutSignIn() {
        await this.checkoutSignInButton.click();
        await this.page.waitForURL(
            (url) => {
                const href = url.toString();
                return href.includes("/checkout/shipping") || href.endsWith("/checkout");
            },
            { timeout: 90000 },
        );
        await this.page.waitForLoadState("domcontentloaded");
        await this.page.waitForLoadState("networkidle");
    }

    async fillShippingAddress() {
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
        await this.page.waitForTimeout(2000);
        console.log("Shipping form filled");
    }

    async continueFromShippingIfNeeded() {
        const currentUrl = this.page.url();
        if (!currentUrl.includes("/checkout/shipping") && !currentUrl.endsWith("/checkout")) return;
        await this.continueButton.waitFor({ state: "visible", timeout: 60000 });
        await expect(this.continueButton).toBeEnabled();
        await this.continueButton.scrollIntoViewIfNeeded();
        await this.continueButton.click({ force: true });
        await this.page.waitForURL(
            (url) => url.toString().includes("payment") || url.toString().includes("review") || url.toString().includes("checkout"),
            { timeout: 90000 },
        );
        await this.verifyPaymentPageLoaded();
    }

    async verifyPaymentPageLoaded() {
        await this.page.waitForLoadState("domcontentloaded");
        await Promise.race([
            this.cardNumberInput.waitFor({ state: "visible", timeout: 90000 }),
            this.cvcInput.waitFor({ state: "visible", timeout: 90000 }),
            this.savedCardVisible.waitFor({ state: "visible", timeout: 90000 }),
        ]);
        console.log("✅ Payment UI loaded");
    }

    // =======================
    // CREDIT CARD PAYMENT
    // =======================
    async enterCardDetails() {
        await this.ensureOnPaymentPage();
        await this.verifyPaymentPageLoaded();

        await this.cardNumberInput.fill(PAYMENT.CreditCard);

        if (await this.expiryInput.isVisible().catch(() => false)) {
            await this.expiryInput.fill(PAYMENT.Expiry);
        } else {
            await this.expiryMonthDropdown.selectOption({ value: PAYMENT.Month });
            await this.expiryYearDropdown.selectOption({ value: PAYMENT.Year });
        }

        await this.waitForCardValidation();

        await this.cvcInput.waitFor({ state: "visible", timeout: 60000 });
        await this.cvcInput.fill(PAYMENT.CVC);
        await this.cvcInput.press("Tab");

        console.log("✅ Card details entered successfully");
    }

    private async waitForCardValidation(timeout = 5000) {
        const start = Date.now();
        while (Date.now() - start < timeout) {
            const cardValid = await this.cardNumberInput.evaluate(
                (el) => el.classList.contains("valid") || el.getAttribute("data-valid") === "true"
            ).catch(() => false);

            const expiryValid = await this.expiryInput.evaluate(
                (el) => el.classList.contains("valid") || el.getAttribute("data-valid") === "true"
            ).catch(() => true);

            if (cardValid && expiryValid) return;
            await this.page.waitForTimeout(200);
        }
        console.warn("⚠️ Card validation not detected within timeout, proceeding anyway");
    }

    async enterPaymentForLoggedIn() {
        await this.ensureOnPaymentPage();
        await this.verifyPaymentPageLoaded();
        if (await this.savedCardDropdown.isVisible().catch(() => false)) {
            await this.savedCardDropdown.selectOption({ index: 1 });
        }
        if (await this.cvcInput.isVisible().catch(() => false)) {
            await this.cvcInput.fill(PAYMENT.CVC);
            await this.page.waitForTimeout(2000);
        }
    }

    async placeOrder() {
        let placeOrderBtn: Locator | null = null;
        if ((await this.oldPlaceOrderButton.count()) > 0) placeOrderBtn = this.oldPlaceOrderButton;
        else if ((await this.newPlaceOrderButton.count()) > 0) placeOrderBtn = this.newPlaceOrderButton;

        if (!placeOrderBtn) throw new Error("Place order button not found");

        await placeOrderBtn.scrollIntoViewIfNeeded();
        await expect(placeOrderBtn).toBeVisible({ timeout: 60000 });
        await expect(placeOrderBtn).toBeEnabled({ timeout: 60000 });
        
        // Promise.all prevents the load state trigger from being missed during the click action
        await Promise.all([
            this.page.waitForLoadState("domcontentloaded"), 
            placeOrderBtn.click({ force: true })
        ]);
        await this.page.waitForLoadState("networkidle").catch(() => {});
    }

    async placeOrderAndVerify(): Promise<string | undefined> {
        await this.placeOrder();
        await Promise.race([
            this.page.waitForURL(/complete|confirmation|success/, { timeout: 180000 }),
            this.orderDetailLink.waitFor({ state: "visible", timeout: 180000 }),
        ]);
        await expect(this.orderDetailLink).toBeVisible({ timeout: 60000 });
        const text = await this.orderDetailLink.textContent();
        const orderNumber = text?.match(/\d+/)?.[0];
        return orderNumber;
    }

    // =======================
    // AFFIRM FLOW
    // =======================
    async payWithAffirm() {
        console.log("🔵 Starting Affirm flow...");
        await this.ensureOnPaymentPage();
        await this.verifyPaymentPageLoaded();

        await this.selectAffirmOption();
        await this.enterAffirmPhone();
        await this.enterAffirmOtp();
        await this.selectAffirmPlan();
        await this.chooseAffirmPlan();
        await this.handleAffirmDisclosure();
        await this.finalAffirmSubmit();

        console.log("🎉 Affirm flow completed!");
    }

    private async selectAffirmOption() {
        console.log("Selecting Affirm payment...");
        await this.affirmOption.waitFor({ state: "visible", timeout: 60000 });
        // Promise.all used to avoid race conditions between click and DOM updates
        await Promise.all([
            this.page.waitForLoadState("domcontentloaded"),
            this.affirmOption.click()
        ]);
    }

    private async enterAffirmPhone() {
        console.log("Entering phone...");
        await this.affirmPhoneInput.waitFor({ state: "visible", timeout: 60000 });
        await this.affirmPhoneInput.fill(this.paymentData.affirmPhone);
        await this.affirmContinueButton.click();
        console.log("✅ Phone submitted");
    }

    private async enterAffirmOtp() {
        console.log("Entering OTP...");
        await this.affirmOtpInput.waitFor({ state: "visible", timeout: 60000 });
        await this.affirmOtpInput.fill(this.paymentData.affirmOtp);

        await this.affirmOtpContinueButton.waitFor({ state: "visible", timeout: 60000 });
        for (let i = 0; i < 3; i++) {
            try {
                await this.affirmOtpContinueButton.click({ force: true });
                console.log("✅ OTP clicked");
                break;
            } catch {
                await this.page.waitForTimeout(1000);
            }
        }
    }

    private async selectAffirmPlan() {
        console.log("Selecting plan...");
        await this.affirmPlanRadios.first().waitFor({ state: "visible", timeout: 120000 });
        const count = await this.affirmPlanRadios.count();
        
        let selected = false;
        for (let i = 0; i < count; i++) {
            const radio = this.affirmPlanRadios.nth(i);
            try {
                await radio.scrollIntoViewIfNeeded();
                await radio.click({ force: true });
                await expect(radio).toBeChecked({ timeout: 5000 });
                selected = true;
                break;
            } catch {
                await this.page.waitForTimeout(1000);
            }
        }
        if (!selected) throw new Error("❌ No plan could be selected");
        await this.page.waitForTimeout(3000);
    }

    private async chooseAffirmPlan() {
        console.log("Choosing plan...");
        await this.affirmChoosePlanButton.waitFor({ state: "visible", timeout: 10000 });
        await this.affirmChoosePlanButton.click({ force: true });
        console.log("✅ Plan chosen");
    }

    private async handleAffirmDisclosure() {
        console.log("Handling disclosure checkbox...");

        // Wait for either checkbox OR final submit
        await Promise.race([
            this.affirmDisclosureCheckbox.waitFor({ state: "visible", timeout: 15000 }).catch(() => {}),
            this.affirmGenericSubmitButton.waitFor({ state: "visible", timeout: 15000 }),
        ]);

        // If checkbox is present → handle it
        if (await this.affirmDisclosureCheckbox.isVisible().catch(() => false)) {
            try {
                await this.affirmDisclosureCheckbox.check({ force: true });
                await expect(this.affirmDisclosureCheckbox).toBeChecked({ timeout: 5000 });
            } catch {
                // fallback click (very important for flaky UI)
                const el = await this.affirmDisclosureCheckbox.elementHandle();
                if (el) {
                    await el.evaluate((node: any) => node.click());
                }
            }
            console.log("✅ Checkbox handled");
        } else {
            console.log("ℹ️ Checkbox not displayed, skipping...");
        }
    }

    private async finalAffirmSubmit() {
        console.log("Clicking final confirm...");
        await this.affirmGenericSubmitButton.waitFor({ state: "visible", timeout: 20000 });
        await this.affirmGenericSubmitButton.click({ force: true });
        console.log("✅ Final confirm clicked");
    }

    // =======================
    // PAYPAL FLOW
    // =======================
    async payWithPaypal() {
        console.log("🔵 Starting PayPal flow...");
        await this.ensureOnPaymentPage();   
        await this.verifyPaymentPageLoaded();
        await this.paypalOption.waitFor({ state: "visible", timeout: 60000 });

        const paypalPage = await this.openPaypal();
        await this.loginToPaypal(paypalPage);
        await this.completePaypalPayment(paypalPage);
        await this.handlePostPayment(paypalPage);

        console.log("🎉 PayPal flow completed!");
    }

    private async openPaypal(): Promise<Page> {
        const [popup] = await Promise.all([
            this.page.waitForEvent("popup").catch(() => null),
            this.paypalOption.click(),
        ]);
        const paypalPage = popup || this.page;
        await paypalPage.waitForLoadState("domcontentloaded");
        console.log("✅ PayPal opened");
        return paypalPage;
    }

    private async loginToPaypal(paypalPage: Page) {
        const emailField = this.paypalEmail(paypalPage);
        await emailField.waitFor({ state: "visible", timeout: 60000 });
        await emailField.fill(this.paymentData.paypalEmail);

        const nextBtn = this.paypalNextBtn(paypalPage);
        if (await nextBtn.isVisible().catch(() => false)) {
            await nextBtn.click();
        }

        const passwordField = this.paypalPassword(paypalPage);
        await passwordField.waitFor({ state: "visible", timeout: 60000 });
        await passwordField.fill(this.paymentData.paypalPassword);

        const loginBtn = this.paypalLoginBtn(paypalPage);
        await loginBtn.click();
        console.log("➡️ Login clicked");
    }                    

    private async completePaypalPayment(paypalPage: Page) {
        const payBtn = this.paypalPayBtn(paypalPage);
        const completePurchaseBtn = this.paypalCompletePurchaseBtn(paypalPage);

        await Promise.race([
            payBtn.waitFor({ state: "visible", timeout: 90000 }).catch(() => {}),
            completePurchaseBtn.waitFor({ state: "visible", timeout: 90000 }),
        ]);

        if (await completePurchaseBtn.isVisible().catch(() => false)) {
            await completePurchaseBtn.click({ force: true });
        } else {
            await payBtn.click({ force: true });
        }
    }

    private async handlePostPayment(paypalPage: Page) {
        const popup = paypalPage !== this.page ? paypalPage : null;
        if (popup) {
            await popup.waitForEvent("close", { timeout: 120000 }).catch(() => {});
        }
        const pages = this.page.context().pages();
        this.page = pages[pages.length - 1];
        await this.page.waitForLoadState("domcontentloaded").catch(() => {});
        await this.page.waitForTimeout(5000);
        console.log("✅ Merchant page ready:", this.page.url());
    }

    // =======================
    // VERIFICATIONS
    // =======================
    async verifyCheckoutPageLoaded() {
        const url = this.page.url();
        if (!url.includes("/checkout")) throw new Error(`Expected checkout but got ${url}`);
    }

    async verifyCheckoutPage(pageType: string) {
        const type = pageType.toLowerCase();
        if (type === "payment") return this.verifyPaymentPageLoaded();
        if (type === "checkout") return this.verifyCheckoutPageLoaded();
        if (type === "sign-in") return expect(this.page).toHaveURL(/\/checkout\/sign-?in/, { timeout: 60000 });
        if (type === "shipping") {
            const url = this.page.url();
            if (!url.includes("/checkout/shipping") && !url.endsWith("/checkout")) throw new Error(`Expected shipping but got ${url}`);
            return;
        }
        throw new Error(`Unsupported checkout page type: ${pageType}`);
    }

    async verifyOrderConfirmation() {
        console.log("🔍 Verifying order confirmation...");
        const pages = this.page.context().pages();
        this.page = pages[pages.length - 1];

        await this.page.waitForLoadState("domcontentloaded").catch(() => {});
        await this.page.waitForTimeout(5000);

        const isConfirmed = await this.page.waitForFunction(() => {
            return (
                /confirmation|complete|success/i.test(window.location.href) ||
                document.body.innerText.match(/thank you|order confirmed|order number|order #/i)
            );
        }, { timeout: 60000 }).then(() => true).catch(() => false);

        if (!isConfirmed) {
            const textVisible = await this.confirmationMessage.first().isVisible().catch(() => false);
            const orderExists = await this.orderDetailLink.isVisible().catch(() => false);
            if (!textVisible && !orderExists) throw new Error("❌ Order confirmation not detected");
        }
        console.log("✅ Order confirmation detected");
    }

    async ensureOnPaymentPage() {
        const url = this.page.url();
        if (url.includes("/checkout/payment") || url.endsWith("/checkout")) return;

        if (url.includes("/checkout/shipping")) {
            await this.continueButton.waitFor({ state: "visible", timeout: 60000 });
            // Promise.all prevents missing the URL transition triggered by the click
            await Promise.all([
                this.page.waitForURL(/checkout\/(payment|review)|\/checkout$/, { timeout: 90000 }),
                this.continueButton.click({ force: true }),
            ]);
            await this.page.waitForLoadState("domcontentloaded");
        }
    }


    async payWithKlarna() {
        console.log("🟣 Starting Klarna flow...");

        await this.ensureOnPaymentPage();
        await this.verifyPaymentPageLoaded();

        await this.selectKlarnaOption();
        await this.enterKlarnaPhone();
        await this.enterKlarnaOtp();
        await this.selectKlarnaPlan();
        await this.confirmKlarnaPayment();

        console.log("🎉 Klarna flow completed!");
    }


    private async selectKlarnaOption() {
        console.log("Selecting Klarna...");

        await this.page.waitForLoadState("networkidle");

        await this.klarnaOption.waitFor({ state: "visible", timeout: 60000 });
        await this.klarnaOption.scrollIntoViewIfNeeded();

        await this.klarnaOption.click({ force: true });

        // 🔥 CRITICAL: wait for Klarna iframe
        await this.page.waitForSelector('iframe[src*="klarna"]', { timeout: 60000 });

        console.log("✅ Klarna option selected");
    }


    private async enterKlarnaPhone() {
        console.log("Entering Klarna phone...");

        await this.klarnaPhoneInput.waitFor({ state: "visible", timeout: 60000 });

        await this.klarnaPhoneInput.fill(this.paymentData.klarnaPhone);

        await this.klarnaContinueButton.click();

        console.log("✅ Phone submitted");
    }


    private async enterKlarnaOtp() {
        console.log("Entering Klarna OTP...");

        await this.klarnaOtpInput.waitFor({ state: "visible", timeout: 60000 });

        await this.klarnaOtpInput.fill(this.paymentData.klarnaOtp);

        await this.page.waitForTimeout(2000);
    }


    private async selectKlarnaPlan() {
        console.log("Selecting Klarna plan...");

        await this.klarnaPlanRadios.first().waitFor({ state: "visible", timeout: 120000 });

        const count = await this.klarnaPlanRadios.count();
        let selected = false;

        for (let i = 0; i < count; i++) {
            const radio = this.klarnaPlanRadios.nth(i);

            try {
                await radio.scrollIntoViewIfNeeded();
                await radio.click({ force: true });

                await expect(radio).toBeChecked({ timeout: 5000 });

                selected = true;
                break;
            } catch {
                await this.page.waitForTimeout(1000);
            }
        }

        if (!selected) throw new Error("❌ No Klarna plan selected");

        await this.klarnaPlanContinueButton.click({ force: true });

        console.log("✅ Plan selected");
    }


    private async confirmKlarnaPayment() {
        console.log("Confirming Klarna payment...");

        await this.klarnaPayButton.waitFor({ state: "visible", timeout: 60000 });

        await this.klarnaPayButton.click({ force: true });

        await this.page.waitForLoadState("networkidle").catch(() => {});

        console.log("✅ Payment confirmed");
    }
}