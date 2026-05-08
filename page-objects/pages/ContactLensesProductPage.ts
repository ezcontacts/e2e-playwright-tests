import { Locator, Page } from "@playwright/test";
import { ProductPage } from "./ProductPage";
import { EnterPrescriptionComponent } from "../components/product-components/EnterPrescriptionComponent";
import { LensTypeComponent } from "../components/product-components/LensTypeComponent";

export class ContactLensesProductPage extends ProductPage {
  readonly addCartContactLenses: Locator;

  readonly enterPrescription: EnterPrescriptionComponent;
  readonly lensType: LensTypeComponent;

  readonly lensTypeSection: Locator;

  constructor(page: Page) {
    super(page);

    this.addCartContactLenses = this.locator(".btn-cart > #addtocart");

    this.enterPrescription = new EnterPrescriptionComponent(page);
    this.lensType = new LensTypeComponent(page);

    this.lensTypeSection = this.locator("#rxTypeDivEye .ezMarkLabel");
  }

  override async clickOnAddToCart(): Promise<void> {
    await this.addCartContactLenses.click();
  }

  async verifyEveryLensTypeNotSelectedByDefault(): Promise<void> {
    const count = await this.lensTypeSection.count();

    for (let i = 0; i < count; i++) {
      const isChecked = await this.lensTypeSection
        .nth(i)
        .locator("input")
        .isChecked();
      if (isChecked) {
        throw new Error(
          `Expected lens type at index ${i} to not be selected by default, but it is.`,
        );
      }
    }
  }
}
