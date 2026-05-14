import { Page, expect, Locator } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { ENDPOINT } from "../../constant/endpoint";
import { generateCanadianPostalCode, generateUsZipCode } from "../../helpers/postalCodeHelper";

export enum ShippingCountry {
  UnitedStates = 'United States',
  Canada = 'Canada',
  PuertoRico = 'Puerto Rico',
}

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

  async verifyShippingAddressIsVisible(index: number): Promise<void> {
    await expect(this.activeShippingAddress.nth(index)).toBeVisible();
  }

  async verifyShippingOptionsForCountry(country: string, index: number): Promise<void> {
    const countryOption = this.activeshippingOptionsCountry.nth(index).filter({ hasText: country });
    await expect(countryOption, `Shipping option for ${country} not visible`).toBeVisible();
  }

  async openAllShippingOptions(): Promise<void> {
    await this.allShippingOptions.click();
  }

  async selectAvailableShippingOption(): Promise<string> {
    const options = this.shippingOptionItems;
    const count = await options.count();
    expect(count, 'No shipping options are available to select').toBeGreaterThan(0);
    const targetIndex = Math.floor(Math.random() * (count/2));
    const option = options.nth(targetIndex);
    await option.click();
    return (await option.textContent())?.trim() ?? '';
  }

  async selectCreatedShippingAddress(city: string, state: string, zip: string, index: number): Promise<string> {
    const addressItem = this.shippingOptionItems
      .filter({ hasText: city })
      .filter({ hasText: state })
      .filter({ hasText: zip });
    await expect(addressItem.nth(index), `Could not find created address with city "${city}", state "${state}" and zip "${zip}"`).toBeVisible();
    await addressItem.nth(index).click();
    return (await addressItem.nth(index).textContent())?.trim() ?? '';
  }

  async verifySelectedShippingOptionRemains(selectedShippingOptionText: string, index: number): Promise<void> {
    const selectedOption = this.shippingOptionItems.filter({ hasText: selectedShippingOptionText });
    await expect(selectedOption.nth(index)).toHaveClass(/active/);
  }

  async updateShippingAddressCountry(country: ShippingCountry, index: number): Promise<string> {
    const currentText = await this.activeshippingOptionsCountry.nth(index).textContent();
    const previousShippingCountry = currentText?.trim() ?? '';
    await this.editAddressButton.nth(index).click();
    await expect(this.editAddressCountrySelect).toBeVisible();
    await this.editAddressCountrySelect.selectOption(country);

    if (country === ShippingCountry.UnitedStates) {
      await expect(this.editAddressUsStateSelect).toBeVisible();
      await expect(this.editAddressCanadaProvinceSelect).toBeHidden();
      const options = await this.editAddressUsStateSelect.locator('option:not([disabled]):not([value=""])').all();
      const randomOption = options[Math.floor(Math.random() * options.length)];
      const value = await randomOption.getAttribute('value');
      await this.editAddressUsStateSelect.selectOption(value!);
      await this.editAddressZipInput.fill(generateUsZipCode());
    } else if (country === ShippingCountry.Canada) {
      await expect(this.editAddressCanadaProvinceSelect).toBeVisible();
      await expect(this.editAddressUsStateSelect).toBeHidden();
      const options = await this.editAddressCanadaProvinceSelect.locator('option:not([disabled]):not([value=""])').all();
      const randomOption = options[Math.floor(Math.random() * options.length)];
      const value = await randomOption.getAttribute('value');
      await this.editAddressCanadaProvinceSelect.selectOption(value!);
      await this.editAddressZipInput.fill(generateCanadianPostalCode());
    } else if (country === ShippingCountry.PuertoRico) {
      await expect(this.editAddressUsStateSelect).toBeHidden();
      await expect(this.editAddressCanadaProvinceSelect).toBeHidden();
    }

    await this.editAddressSaveButton.click();
    await expect(this.addressLoaderOverlay).toBeVisible({ timeout: 5000 }).catch(() => {});
    await expect(this.addressLoaderOverlay).toBeHidden({ timeout: 30000 });
    return previousShippingCountry;
  }

  async verifyPreviousShippingOptionsNoLongerAvailable(previousShippingCountry: string, index: number): Promise<void> {
    await expect(this.activeshippingOptionsCountry.nth(index)).not.toHaveText(previousShippingCountry, { ignoreCase: false });
  }
}
