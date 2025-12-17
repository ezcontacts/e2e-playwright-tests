import { Locator, Page } from "@playwright/test";
import { ProductPage } from "./ProductPage";
import { EnterPrescriptionComponent } from "../components/product-components/EnterPrescriptionComponent";

export class ContactLensesProductPage extends ProductPage {
  readonly addCartContactLenses: Locator;

  readonly enterPrescription: EnterPrescriptionComponent;

  constructor(page: Page) {
    super(page);

    this.addCartContactLenses = this.locator(".btn-cart > #addtocart");

    this.enterPrescription = new EnterPrescriptionComponent(this.page);
  }

  override async clickOnAddToCart(): Promise<void> {
    await this.addCartContactLenses.click();
  }
}
