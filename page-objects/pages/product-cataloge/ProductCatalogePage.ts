import { Page } from "@playwright/test";
import { BasePage } from "../../base/BasePage";
import { FillterComponent } from "../../components/FillterComponent";
import { PromotionComponent } from "../../components/PromotionComponent";

export abstract class ProductCatalogePage extends BasePage {
  readonly fillter: FillterComponent;
  readonly promotion: PromotionComponent;

  constructor(page: Page, endpoint: string) {
    super(page, endpoint);

    this.fillter = new FillterComponent(page);
    this.promotion = new PromotionComponent(page);
  }

  async open() {
    await super.open();
    await this.promotion.closeDynamicPopupIfPresent();
 }
}