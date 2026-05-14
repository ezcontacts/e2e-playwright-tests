import { Page, Locator } from "@playwright/test";
import { BaseComponent } from "../base/BaseComponent";
import { expect } from "../../test/fixtures/fixture";
import { PostalCodeHelper, ShippingCountry } from "../../helpers/postalCodeHelper";
import { getRandomMexicoState } from "../../helpers/stateHelper";

export class EditShippingAddressModalComponent extends BaseComponent {
  readonly editAddressCountrySelect: Locator;
  readonly editAddressStateSelect: Locator;
  readonly editAddressZipInput: Locator;
  readonly editAddressSaveButton: Locator;

  constructor(page: Page, root: string = ".modal-content") {
    super(page, root);

    this.editAddressCountrySelect = this.within(
      "#AccountShippingAddressAddressCountry",
    );
    this.editAddressStateSelect = this.within(
      "#AccountShippingAddressAddressRegion, #AccountShippingAddressUsAddressRegion, #AccountShippingAddressCanadaAddressRegion",
    );

    this.editAddressZipInput = this.within(
      "#AccountShippingAddressAddressPostalZip",
    );
    this.editAddressSaveButton = this.within("#submit-dynamic-form");
  }

  async selectCountry(country: ShippingCountry): Promise<void> {
    await expect(this.editAddressCountrySelect).toBeVisible();
    await this.editAddressCountrySelect.selectOption(country);
  }

  async selectState(state: string): Promise<void> {
    const locator = await this.getFirstVisible(this.editAddressStateSelect);
    await expect(locator).toBeVisible();
    await locator.selectOption(state);
  }

  async selectRandomState(): Promise<void> {
    const locator = await this.getFirstVisible(this.editAddressStateSelect);

    await expect(locator).toBeVisible();

    const values = await locator.locator("option").evaluateAll((options) =>
      options
        .filter((option) => {
          const opt = option as HTMLOptionElement;
          return !opt.disabled && opt.value && opt.value.trim() !== "";
        })
        .map((option) => (option as HTMLOptionElement).value),
    );

    if (!values.length) {
      throw new Error("No selectable state options found");
    }

    const randomValue = values[Math.floor(Math.random() * values.length)];

    await locator.selectOption(randomValue);
  }

  async fillState(state: string): Promise<void> {
    const locator = await this.getFirstVisible(this.editAddressStateSelect);
    await expect(locator).toBeVisible();
    await locator.fill(state);
  }

  async verifyStateIsVisible(): Promise<void> {
    const locator = await this.getFirstVisible(this.editAddressStateSelect);
    await expect(locator).toBeVisible();
  }

  async verifyStateIsNotVisible(): Promise<void> {
    try {
      const locator = await this.getFirstVisible(this.editAddressStateSelect);
      await expect(locator).not.toBeVisible();
    } catch {}
  }

  async fillZipCode(zipCode: string): Promise<void> {
    await expect(this.editAddressZipInput).toBeVisible();
    await this.editAddressZipInput.fill(zipCode);
  }

  async clickSaveBtn(): Promise<void> {
    await expect(this.editAddressSaveButton).toBeVisible();
    await this.editAddressSaveButton.click();
  }

  async verifyCountrySelected(country: ShippingCountry): Promise<void> {
    await expect(this.editAddressCountrySelect).toHaveValue(country);
  }

  async verifyZipCode(zipCode: string): Promise<void> {
    await expect(this.editAddressZipInput).toHaveValue(zipCode);
  }

  async updateCountryFlow(country: ShippingCountry): Promise<void> {
    await this.selectCountry(country);

    switch (country) {
      case ShippingCountry.UnitedStates:
      case ShippingCountry.Canada:
        await this.selectRandomState();
        break;

      case ShippingCountry.Mexico:
        await this.fillState(getRandomMexicoState());
        break;

      case ShippingCountry.PuertoRico:
        await this.verifyStateIsNotVisible();
        break;
    }

    await this.fillZipCode(PostalCodeHelper.generateByCountry(country));
  }
}
