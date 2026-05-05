import { Locator, Page } from "@playwright/test";
import { ProductPage } from "./ProductPage";
import { EnterPrescriptionComponent } from "../components/product-components/EnterPrescriptionComponent";
import { LensTypeComponent } from "../components/product-components/LensTypeComponent";

export class ContactLensesProductPage extends ProductPage {
  readonly addCartContactLenses: Locator;

  readonly enterPrescription: EnterPrescriptionComponent;
  readonly lensType: LensTypeComponent;

  constructor(page: Page) {
    super(page);

    this.addCartContactLenses = this.locator(".btn-cart > #addtocart");

    this.enterPrescription = new EnterPrescriptionComponent(page);
    this.lensType = new LensTypeComponent(page);
  }

  override async clickOnAddToCart(): Promise<void> {
    await this.addCartContactLenses.click();
  }
}
