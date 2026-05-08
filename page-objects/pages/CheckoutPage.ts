import { Page, expect, Locator } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { ENDPOINT } from "../../constant/endpoint";

export class CheckoutPage extends BasePage {
  readonly activeShippingAddress: Locator;
  readonly activeshippingOptionsCountry: Locator;
  readonly allShippingOptions: Locator;
  readonly shippingOptionItems: Locator;
  readonly editAddressButton: Locator;
  readonly editAddressCountrySelect: Locator;
  readonly editAddressUsStateSelect: Locator;
  readonly editAddressCanadaProvinceSelect: Locator;
  readonly editAddressZipInput: Locator;
  readonly editAddressSaveButton: Locator;
  readonly addressLoaderOverlay: Locator;
  selectedShippingOptionText: string | null = null;
  previousShippingCountry: string | null = null;

  constructor(page: Page) {
    super(page, ENDPOINT.checkout);
    this.activeShippingAddress = page.locator('label.saved-address.active');
    this.activeshippingOptionsCountry = this.activeShippingAddress.locator('span.summary-city-state-zip');
    this.allShippingOptions = page.getByRole('link', { name: /View All.*Shipping Addresses/ });
    this.shippingOptionItems = page.locator('.saved-address.load-item');
    this.editAddressButton = this.activeShippingAddress.locator('a.edit-address');
    this.editAddressCountrySelect = page.locator('.modal-content #AccountShippingAddressAddressCountry');
    this.editAddressUsStateSelect = page.locator('.modal-content #AccountShippingAddressUsAddressRegion');
    this.editAddressCanadaProvinceSelect = page.locator('.modal-content #AccountShippingAddressCanadaAddressRegion');
    this.editAddressZipInput = page.locator('.modal-content #AccountShippingAddressAddressPostalZip');
    this.editAddressSaveButton = page.locator('.modal-content #submit-dynamic-form');
    this.addressLoaderOverlay = page.locator('#address-loader');
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

  async selectCreatedShippingAddress(city: string, state: string, zip: string): Promise<void> {
    const addressItem = this.shippingOptionItems
      .filter({ hasText: city })
      .filter({ hasText: state })
      .filter({ hasText: zip });
    await expect(addressItem.first(), `Could not find created address with city "${city}", state "${state}" and zip "${zip}"`).toBeVisible();
    await addressItem.first().click();
    this.selectedShippingOptionText = (await addressItem.first().textContent())?.trim() ?? null;
  }

  async verifySelectedShippingOptionRemains(): Promise<void> {
    expect(this.selectedShippingOptionText, 'No shipping option was stored from the previous step').not.toBeNull();
    const selectedOption = this.shippingOptionItems.filter({ hasText: this.selectedShippingOptionText! });
    await expect(selectedOption.first()).toHaveClass(/active/);
  }

  private generateCanadianPostalCode(): string {
    const letters = 'ABCEGHJKLMNPRSTVXY';
    const digits = '0123456789';
    const l = () => letters[Math.floor(Math.random() * letters.length)];
    const d = () => digits[Math.floor(Math.random() * digits.length)];
    return `${l()}${d()}${l()} ${d()}${l()}${d()}`;
  }

  private generateUsZipCode(): string {
    return String(Math.floor(10000 + Math.random() * 89999)).padStart(5, '0');
  }

  async updateShippingAddressCountry(country: string): Promise<void> {
    const currentText = await this.activeshippingOptionsCountry.first().textContent();
    this.previousShippingCountry = currentText?.trim() ?? null;
    await this.editAddressButton.first().click();
    await expect(this.editAddressCountrySelect).toBeVisible();
    await this.editAddressCountrySelect.selectOption(country);

    if (country === 'United States') {
      await expect(this.editAddressUsStateSelect).toBeVisible();
      await expect(this.editAddressCanadaProvinceSelect).toBeHidden();
      const options = await this.editAddressUsStateSelect.locator('option:not([disabled]):not([value=""])').all();
      const randomOption = options[Math.floor(Math.random() * options.length)];
      const value = await randomOption.getAttribute('value');
      await this.editAddressUsStateSelect.selectOption(value!);
      await this.editAddressZipInput.fill(this.generateUsZipCode());
    } else if (country === 'Canada') {
      await expect(this.editAddressCanadaProvinceSelect).toBeVisible();
      await expect(this.editAddressUsStateSelect).toBeHidden();
      const options = await this.editAddressCanadaProvinceSelect.locator('option:not([disabled]):not([value=""])').all();
      const randomOption = options[Math.floor(Math.random() * options.length)];
      const value = await randomOption.getAttribute('value');
      await this.editAddressCanadaProvinceSelect.selectOption(value!);
      await this.editAddressZipInput.fill(this.generateCanadianPostalCode());
    } else if (country === 'Puerto Rico') {
      await expect(this.editAddressUsStateSelect).toBeHidden();
      await expect(this.editAddressCanadaProvinceSelect).toBeHidden();
    }

    await this.editAddressSaveButton.click();
    await expect(this.addressLoaderOverlay).toBeVisible({ timeout: 5000 }).catch(() => {});
    await expect(this.addressLoaderOverlay).toBeHidden({ timeout: 30000 });
  }

  async verifyPreviousShippingOptionsNoLongerAvailable(): Promise<void> {
    expect(this.previousShippingCountry, 'No previous shipping country was stored from the previous step').not.toBeNull();
    await expect(this.activeshippingOptionsCountry.first()).not.toHaveText(this.previousShippingCountry!, { ignoreCase: false });
  }
}
