import { Page } from "@playwright/test";
import { BasePage } from "../../base/BasePage";
import { FillterComponent } from "../../components/FillterComponent";

export abstract class ProductCatalogePage extends BasePage {
  readonly fillter: FillterComponent;

  constructor(page: Page, endpoint: string) {
    super(page, endpoint);

    this.fillter = new FillterComponent(page);
  }

  async open() {
    await super.open();
    await this.closeDynamicPopupIfPresent();
 }
}