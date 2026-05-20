import { Page, expect, Locator } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { ENDPOINT } from "../../constant/endpoint";
import {
  PostalCodeHelper,
  ShippingCountry,
} from "../../helpers/postalCodeHelper";
import { EditShippingAddressModalComponent } from "../components/EditShippingAddressModalComponent";
import { getRandomMexicoState } from "../../helpers/stateHelper";

export class CheckoutPage extends BasePage {
  readonly activeShippingAddress: Locator;
  readonly activeshippingOptionsCountry: Locator;
  readonly allShippingOptions: Locator;
  readonly shippingOptionItems: Locator;
  readonly editAddressButton: Locator;
  readonly addressLoaderOverlay: Locator;

  readonly editShippingAddressModal: EditShippingAddressModalComponent;

  constructor(page: Page) {
    super(page, ENDPOINT.checkout);
    this.activeShippingAddress = page.locator("label.saved-address.active");
    this.activeshippingOptionsCountry = this.activeShippingAddress.locator(
      "span.summary-city-state-zip",
    );
    this.allShippingOptions = page.getByRole("link", {
      name: /View All.*Shipping Addresses/,
    });
    this.shippingOptionItems = page.locator(".saved-address.load-item");
    this.editAddressButton =
      this.activeShippingAddress.locator("a.edit-address");
    this.addressLoaderOverlay = page.locator("#address-loader");

    this.editShippingAddressModal = new EditShippingAddressModalComponent(page);
  }

  async verifyShippingAddressIsVisible(index: number): Promise<void> {
    await expect(this.activeShippingAddress.nth(index)).toBeVisible();
  }

  async verifyShippingOptionsForCountry(
    country: string,
    index: number,
  ): Promise<void> {
    const countryOption = this.activeshippingOptionsCountry
      .nth(index)
      .filter({ hasText: country });
    await expect(
      countryOption,
      `Shipping option for ${country} not visible`,
    ).toBeVisible();
  }

  async openAllShippingOptions(): Promise<void> {
    await this.allShippingOptions.click();
    await expect(this.shippingOptionItems.first()).toBeVisible();
  }

  async selectAvailableShippingOption(): Promise<string> {
    const options = this.shippingOptionItems;
    const count = await options.count();
    expect(
      count,
      "No shipping options are available to select",
    ).toBeGreaterThan(0);
    const targetIndex = Math.floor(Math.random() * (count / 2));
    const option = options.nth(targetIndex);
    await option.click();
    return (await option.textContent())?.trim() ?? "";
  }

  async selectCreatedShippingAddress(
    city: string,
    state: string,
    zip: string,
    index: number,
  ): Promise<string> {
    const addressItem = this.shippingOptionItems
      .filter({ hasText: city })
      .filter({ hasText: state })
      .filter({ hasText: zip });
    await expect(
      addressItem.nth(index),
      `Could not find created address with city "${city}", state "${state}" and zip "${zip}"`,
    ).toBeVisible({ timeout: 20000 });
    await addressItem.nth(index).click();
    return (await addressItem.nth(index).textContent())?.trim() ?? "";
  }

  async verifySelectedShippingOptionRemains(
    selectedShippingOptionText: string,
    index: number,
  ): Promise<void> {
    const selectedOption = this.shippingOptionItems.filter({
      hasText: selectedShippingOptionText,
    });
    await expect(selectedOption.nth(index)).toHaveClass(/active/);
  }

  // async updateShippingAddressCountry(
  //   country: ShippingCountry,
  //   index: number,
  // ): Promise<string> {
  //   const previousShippingCountry = (
  //     (await this.activeshippingOptionsCountry.nth(index).textContent()) ?? ""
  //   ).trim();

  //   await this.editAddressButton.nth(index).click();

  //   await this.editShippingAddressModal.selectCountry(country);

  //   switch (country) {
  //     case ShippingCountry.UnitedStates:
  //     case ShippingCountry.Canada:
  //       await this.editShippingAddressModal.selectRandomState();
  //       break;

  //     case ShippingCountry.Mexico:
  //       await this.editShippingAddressModal.fillState(getRandomMexicoState());
  //       break;

  //     case ShippingCountry.PuertoRico:
  //       await this.editShippingAddressModal.verifyStateIsNotVisible();
  //       break;
  //   }

  //   await this.editShippingAddressModal.fillZipCode(
  //     PostalCodeHelper.generateByCountry(country),
  //   );

  //   await this.editShippingAddressModal.clickSaveBtn();

  //   await expect(this.addressLoaderOverlay)
  //     .toBeVisible({ timeout: 5000 })
  //     .catch(() => {});

  //   await expect(this.addressLoaderOverlay).toBeHidden({ timeout: 30000 });

  //   return previousShippingCountry;
  // }

  async updateShippingAddressCountry(
    country: ShippingCountry,
    index: number,
  ): Promise<string> {
    const previousShippingCountry = (
      (await this.activeshippingOptionsCountry.nth(index).textContent()) ?? ""
    ).trim();

    await this.editAddressButton.nth(index).click();

    await this.editShippingAddressModal.updateCountryFlow(country);

    await this.editShippingAddressModal.clickSaveBtn();

    await expect(this.addressLoaderOverlay)
      .toBeVisible({ timeout: 5000 })
      .catch(() => {});
    await expect(this.addressLoaderOverlay).toBeHidden({ timeout: 30000 });

    return previousShippingCountry;
  }

  async verifyPreviousShippingOptionsNoLongerAvailable(
    previousShippingCountry: string,
    index: number,
  ): Promise<void> {
    await expect(this.activeshippingOptionsCountry.nth(index)).not.toHaveText(
      previousShippingCountry,
      { ignoreCase: false },
    );
  }
}
export { ShippingCountry };
