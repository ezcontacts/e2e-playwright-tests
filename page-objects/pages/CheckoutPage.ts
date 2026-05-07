import { Page, expect, Locator } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { ENDPOINT } from "../../constant/endpoint";

export class CheckoutPage extends BasePage {
  readonly activeShippingAddress: Locator;
  readonly activeshippingOptionsCountry: Locator;
  readonly allShippingOptions: Locator;
  readonly shippingOptionItems: Locator;
  selectedShippingOptionText: string | null = null;

  constructor(page: Page) {
    super(page, ENDPOINT.checkout);
    this.activeShippingAddress = page.locator('label.saved-address.active');
    this.activeshippingOptionsCountry = this.activeShippingAddress.locator('span.summary-city-state-zip');
    this.allShippingOptions = page.getByRole('link', { name: /View All.*Shipping Addresses/ });
    this.shippingOptionItems = page.locator('.saved-address.load-item');
  }

  async verifyShippingAddressIsVisible(): Promise<void> {
    await expect(this.activeShippingAddress.first()).toBeVisible();
  }

  async verifyShippingOptionsForCountry(country: string): Promise<void> {
    const countryOption = this.activeshippingOptionsCountry.first().filter({ hasText: country });
    await expect(countryOption, `Shipping option for ${country} not visible`).toBeVisible();
  }

  async openAllShippingOptions(): Promise<void> {
    await this.allShippingOptions.click();
  }

  async selectAvailableShippingOption(): Promise<void> {
    const options = this.shippingOptionItems;
    const count = await options.count();
    expect(count, 'No shipping options are available to select').toBeGreaterThan(0);
    const targetIndex = Math.floor(Math.random() * (count/2));
    const option = options.nth(targetIndex);
    await option.click();
    this.selectedShippingOptionText = (await option.textContent())?.trim() ?? null;
  }

  async verifySelectedShippingOptionRemains(): Promise<void> {
    expect(this.selectedShippingOptionText, 'No shipping option was stored from the previous step').not.toBeNull();
    const selectedOption = this.shippingOptionItems.filter({ hasText: this.selectedShippingOptionText! });
    await expect(selectedOption.first()).toHaveClass(/active/);
  }
}
