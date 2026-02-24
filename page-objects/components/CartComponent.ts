import { expect, Locator, Page } from "@playwright/test";
import { BaseComponent } from "../base/BaseComponent";

export class CartComponent extends BaseComponent {
  readonly checkoutNowButton: Locator;

  constructor(page: Page) {
    super(page, "body"); // use body as root
    // Robust locator for your checkout button

    // TODO by Potrys M: You can use ths.locator() method on this.within()
    this.checkoutNowButton = page.locator('a.checkout:has-text("Checkout Now")');
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


  async proceedToCheckout() {
    const checkoutBtn = this.page.getByRole('link', { name: /checkout now/i });

    await expect(checkoutBtn).toBeVisible({ timeout: 30000 });

    await Promise.all([
      this.page.waitForURL(/\/checkout\/sign-in/, { timeout: 30000 }),
      checkoutBtn.click()
    ]);
  }

  async enterGuestEmail(email: string) {
    //TODO by Potrys M: You need to move the locator to the beginning
    // of the class and reuse it here. This will allow you to reuse one
    // locator in several places and change it in one place if the frontend ever changes. 
    const emailField = this.page.locator('#UserEmail');

    await expect(emailField).toBeVisible();
    await emailField.fill(email);
  }

  async clickCheckoutSignIn() {
    // TODO by Potrys M: You need to move the locator to the beginning
    // of the class and reuse it here.
    const checkoutBtn = this.page.locator('#checkout-sign-in-submit-btn');
    await checkoutBtn.click();

    // TODO by Potrys M: You need to move the locator to the beginning
    // of the class and reuse it here.
    await expect(this.page.locator('#add-shipping-address'))
      .toBeVisible({ timeout: 60000 });
  }

  async fillShippingAddress(data: any) {
    // TODO by Potrys M: You need to move the locator to the beginning
    // of the class and reuse it here.
    await this.page.locator('#AccountShippingAddressFirstName').fill(data.firstName);
    await this.page.locator('#AccountShippingAddressLastName').fill(data.lastName);
    await this.page.locator('#AccountShippingAddressAddressLine1').fill(data.addressLine1);
    await this.page.locator('#AccountShippingAddressAddressLine2').fill(data.addressLine2);
    await this.page.locator('#AccountShippingAddressAddressCity').fill(data.city);
    await this.page.locator('#AccountShippingAddressUsAddressRegion')
      .selectOption({ label: data.state });
    await this.page.locator('#AccountShippingAddressAddressPostalZip').fill(data.zipCode);
    await this.page.locator('#AccountShippingAddressAddressShipPhonePrimary')
      .fill(data.phone);
  }

  async continueToPayment() {
    // TODO by Potrys M: You need to move the locator to the beginning
    // of the class and reuse it here.
    const continueBtn = this.page.locator('#add-shipping-address');
    await continueBtn.click();

    // TODO by Potrys M: You need to move the locator to the beginning
    // of the class and reuse it here.
    await expect(this.page.locator('#credit-card-box-container'))
      .toBeVisible({ timeout: 60000 });
  }

  async enterCardDetails(data: any) {
    // TODO by Potrys M: You need to move the locator to the beginning
    // of the class and reuse it here.
    await this.page.locator('#AppProductCardNumber').fill(data.CreditCard);
    await this.page.locator('#card-expiry-input').fill(data.Expiry);
    await this.page.locator('#AppProductCvc').fill(data.CVC);
  }

  async placeOrder() {
    // TODO by Potrys M: You need to move the locator to the beginning
    // of the class and reuse it here.
    const placeOrderBtn = this.page.locator('#add-billing-address');
    await placeOrderBtn.click();

    const confirmationHeading = this.page.locator(
      'h3.title',
      { hasText: /Thank You for Your Order/i }
    ).first();

    await confirmationHeading.waitFor({ state: 'visible', timeout: 180000 });

    const orderNumber = await confirmationHeading
      .locator('a.order-detail-link')
      .textContent();

    return orderNumber;
  }
}
