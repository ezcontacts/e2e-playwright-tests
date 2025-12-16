import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { ENDPOINT } from "../../constant/endpoint";

export class ProductPage extends BasePage {
  readonly productTitle: Locator;
  readonly priceTitle: Locator;

  desktop = {
    productName: this.page.locator("h2.product-name.margin-top-5"),
    price: this.page.locator(".pdp-price .curr-price"),
  };

  mobile = {
    productName: this.page.locator(".col-sm-8 > .product-name"),
    price: this.page.locator(".mobilePrice-ash + .curr-price"),
  };

  constructor(page: Page) {
    super(page, ENDPOINT.login);

    this.productTitle = page.locator("h2.product-name");
    this.priceTitle = page.locator("span.curr-price");
  }

  async open() {
    throw new Error("ProductPage has not static endpoint");
  }

  async verifyProductTitleIsVisible(): Promise<void> {
    const title = this.getLocator(
      this.desktop.productName,
      this.mobile.productName
    );
    await expect(title).toHaveCount(1);
  }

  async verifyPriceIsVisible(): Promise<void> {
    const price = this.getLocator(this.desktop.price, this.mobile.price);
    await expect(price).toHaveCount(1);
  }
}
