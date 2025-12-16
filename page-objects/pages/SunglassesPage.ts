import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { ENDPOINT } from "../../constant/endpoint";
import { FillterComponent } from "../components/FillterComponent";
import { ProductCardComponent } from "../components/ProductCardComponent";

export class SunglassesPage extends BasePage {
  readonly fillter: FillterComponent;
  readonly productCard: (index: number) => ProductCardComponent;

  constructor(page: Page) {
    super(page, ENDPOINT.sunglasses);

    this.fillter = new FillterComponent(page);

    this.productCard = (index: number) =>
      new ProductCardComponent(this.page, index);
  }

  async clickOnProductByIndex(index: number) {
    await this.productCard(index).clickOnViewButton();
  }
}
