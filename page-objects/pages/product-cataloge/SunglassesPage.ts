import { Page } from "@playwright/test";
import { ENDPOINT } from "../../../constant/endpoint";
import { ProductCardComponent } from "../../components/ProductCardComponent";
import { ProductCatalogePage } from "./ProductCatalogePage";

export class SunglassesPage extends ProductCatalogePage {
  readonly productCard: (index: number) => ProductCardComponent;

  constructor(page: Page) {
    super(page, ENDPOINT.sunglasses);

    this.productCard = (index: number) =>
      new ProductCardComponent(
        this.page,
        index,
        this.getPlatformSelector(".glass-mask", "li.ng-scope")
      );
  }

  async clickOnProductByIndex(index: number): Promise<void> {
    await this.productCard(index).clickOnViewBtn();
    await this.waitForDomContentLoad();
  }
}
