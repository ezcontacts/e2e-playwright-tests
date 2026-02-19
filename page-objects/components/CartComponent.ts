import { expect, Locator, Page } from "@playwright/test";
import { BaseComponent } from "../base/BaseComponent";

export class CartComponent extends BaseComponent {
  readonly checkoutNowButton: Locator;

  constructor(page: Page) {
    super(page, "body"); // use body as root
    // Robust locator for your checkout button
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
}
