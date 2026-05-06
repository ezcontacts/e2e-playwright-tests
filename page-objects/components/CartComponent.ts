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

    // -----------------------
    // KLARNA LOCATORS
    // -----------------------
    readonly klarnaOption: Locator;
    readonly klarnaFrame: (page: Page) => FrameLocator;

    readonly klarnaPhoneInput: (p: Page | FrameLocator) => Locator;
    readonly klarnaContinueBtn: (p: Page | FrameLocator) => Locator;
    readonly klarnaOtpInput: (p: Page | FrameLocator) => Locator;
    readonly klarnaPlanRadio: (p: Page | FrameLocator) => Locator;
    readonly klarnaConfirmPlanBtn: (p: Page | FrameLocator) => Locator;
    readonly klarnaFinalPayBtn: (p: Page | FrameLocator) => Locator;

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


        // -----------------------
        // KLARNA LOCATORS
        // -----------------------
        this.klarnaOption = page.locator("#klarna-img");

        this.klarnaFrame = (p: Page) =>
            p.frameLocator('iframe[src*="klarna"], iframe[name*="klarna"]');

        this.klarnaPhoneInput = (p) =>
            p.locator('input[name="phone"], input[type="tel"]');

        this.klarnaContinueBtn = (p) =>
            p.locator('button:has-text("Continue"), button:has-text("Next")');

        this.klarnaOtpInput = (p) =>
            p.locator('input[name="otp_field"], input[name="otp"]');

        this.klarnaPlanRadio = (p) =>
            p.locator('input[name="offers__group"]');

        this.klarnaConfirmPlanBtn = (p) =>
            p.locator('[data-testid="confirm-and-pay"], #offers-selector-continue-button, button:has-text("Continue")');

        this.klarnaFinalPayBtn = (p) =>
            p.locator('#buy_button__text');
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

        await this.checkoutNowButton.click();

        // =========================
        // WAIT FOR ANY CHECKOUT STATE
        // =========================
        await this.page.waitForURL(/checkout/, { timeout: 90000 });

        // =========================
        // GUEST EMAIL STEP (ONLY IF PRESENT)
        // =========================
        const emailField = this.page.locator(
            '#UserEmail, input[type="email"], input[name="email"]'
        );

        if (await emailField.isVisible({ timeout: 5000 }).catch(() => false)) {
            await emailField.fill(this.paymentData.emailg);

            const continueBtn = this.page.locator(
                '#checkout-sign-in-submit-btn, button:has-text("Continue"), button:has-text("Next")'
            ).first();

            if (await continueBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
                await continueBtn.click();
            }

            // wait for shipping or checkout transition
            await this.page.waitForURL(/checkout/, { timeout: 90000 });
        }
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
    async verifyCheckoutPageLoaded(pageType?: "sign-in" | "shipping" | "payment" | "checkout") {
        const url = this.page.url();

        if (pageType === "sign-in") {
            if (!url.includes("/checkout/sign-in")) {
                throw new Error(`Expected sign-in page but got ${url}`);
            }
            return;
        }

        if (pageType === "shipping") {
            if (!url.includes("/checkout/shipping")) {
                throw new Error(`Expected shipping page but got ${url}`);
            }
            return;
        }

        if (pageType === "payment") {
            if (!url.includes("/checkout/payment")) {
                throw new Error(`Expected payment page but got ${url}`);
            }
            return;
        }

        // ✅ LOGGED-IN / DEFAULT FLOW FIX
        if (!url.includes("/checkout")) {
            throw new Error(`Expected checkout page but got ${url}`);
        }

        await expect(this.page.locator('nav.nav-list')).toBeVisible();
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


    private async getKlarnaContext(kp: Page): Promise<Page | FrameLocator> {
        const frame = this.klarnaFrame(kp);

        try {
            if (await frame.locator('input').first().isVisible({ timeout: 5000 })) {
                console.log("🔁 Klarna inside iframe");
                return frame;
            }
        } catch {}

        console.log("🌐 Klarna as full page");
        return kp;
    }

    // =========================
    // MAIN FLOW
    // =========================
    async payWithKlarna() {
        console.log("🟣 Starting Klarna flow...");

        await this.ensureOnPaymentPage();
        await this.verifyPaymentPageLoaded();

        // STEP 1: Open Klarna
        const [popup] = await Promise.all([
            this.page.waitForEvent("popup").catch(() => null),
            this.klarnaOption.click()
        ]);

        const kp = popup || this.page;

        await kp.waitForLoadState("domcontentloaded");
        await kp.waitForLoadState("networkidle");
        await kp.waitForTimeout(3000);

        console.log("✅ Klarna opened:", kp.url());

        // STEP 2: Resolve context
        const ctx = await this.getKlarnaContext(kp);

        // STEP 3: PHONE INPUT
        const phone = this.klarnaPhoneInput(ctx);

        await expect.poll(async () => await phone.count(), {
            timeout: 60000
        }).toBeGreaterThan(0);

        await phone.first().waitFor({ state: "visible" });
        await phone.first().click();
        await phone.first().fill(this.paymentData.klarnaPhone);

        console.log("📱 Phone entered");

        // STEP 4: CONTINUE
        const continueBtn = this.klarnaContinueBtn(ctx).first();

        await continueBtn.waitFor({ state: "visible", timeout: 60000 });

        await continueBtn.click().catch(async () => {
            await continueBtn.click({ force: true });
        });

        console.log("➡️ Continue clicked");

        // STEP 5: OTP INPUT (FIXED)
        const otp = this.klarnaOtpInput(ctx);

        await expect.poll(async () => await otp.count(), {
            timeout: 60000
        }).toBeGreaterThan(0);

        await otp.first().waitFor({ state: "visible", timeout: 60000 });

        // 🔥 Prevent phone field reuse
        await kp.waitForTimeout(1000);
        await kp.keyboard.press("Tab");

        await otp.first().click();
        await otp.first().fill("");
        await otp.first().type(this.paymentData.klarnaOtp, { delay: 100 });

        console.log("🔐 OTP entered");

        // STEP 6: OTP CONTINUE
        const otpContinue = this.klarnaConfirmPlanBtn(ctx).first();

        await otpContinue.waitFor({ state: "visible", timeout: 60000 });

        await otpContinue.click().catch(async () => {
            await otpContinue.click({ force: true });
        });

        console.log("✅ OTP Continue clicked");

        // STEP 7: PLAN (optional)
        const plan = this.klarnaPlanRadio(ctx);

        if (await plan.count().catch(() => 0)) {
            await plan.first().waitFor({ state: "attached", timeout: 30000 });
            console.log("📦 Plan detected");
        }

        // STEP 8: CONFIRM PLAN (optional)
        const confirm = this.klarnaConfirmPlanBtn(ctx);

        if (await confirm.count().catch(() => 0)) {
            await confirm.first().click({ force: true });
            console.log("➡️ Plan confirmed");
        }

        // STEP 9: FINAL PAY (ROBUST FIX)
        const payText = this.klarnaFinalPayBtn(ctx);

        await payText.first().waitFor({ state: "visible", timeout: 60000 });

        let clicked = false;

        // Try BUTTON parent
        const btnParent = payText.locator('xpath=ancestor::button').first();

        if (await btnParent.count().catch(() => 0)) {
            try {
                await btnParent.click();
                clicked = true;
            } catch {}
        }

        // Fallback: DIV role button
        if (!clicked) {
            const divParent = payText.locator('xpath=ancestor::div[@role="button"]').first();

            if (await divParent.count().catch(() => 0)) {
                try {
                    await divParent.click();
                    clicked = true;
                } catch {}
            }
        }

        // Final fallback
        if (!clicked) {
            await payText.first().click({ force: true });
        }

        console.log("💳 Pay clicked");

        // STEP 10: Redirect back
        if (popup) {
            await popup.waitForEvent("close", { timeout: 180000 }).catch(() => {});
        }

        const pages = this.page.context().pages();
        this.page = pages[pages.length - 1];

        await this.page.waitForLoadState("domcontentloaded").catch(() => {});
        await this.page.waitForTimeout(5000);

        console.log("🎉 Klarna flow completed!");
    }
}