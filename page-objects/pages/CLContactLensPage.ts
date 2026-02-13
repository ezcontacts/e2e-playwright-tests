import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { ENDPOINT } from "../../constant/endpoint";

export class CLContactLensPage extends BasePage {
  readonly productBrand: Locator;
  readonly productName: Locator;

  constructor(page: Page) {
    super(page, ENDPOINT.contactLenses);

    this.productBrand = this.page.locator('[data-testid="product-brand"]');
    this.productName = this.page.locator('[data-testid="product-name"]');
  }

  async navigateToProductDetailPage(): Promise<void> {
    // TODO by Potrys M: endpoint should be hold in endpoint.ts
    await this.page.goto('/contact-lenses/sample-product');
  }

  async waitForPageToLoad(): Promise<void> {
    await this.productName.waitFor({ state: 'visible' });
  }

  // TODO by Potrys M: locators already readonly have readonly modifier and this getter makes no sense.
  getProductBrand(): Locator {
    return this.productBrand;
  }

  // TODO by Potrys M: locators already readonly have readonly modifier and this getter makes no sense.
  getProductName(): Locator {
    return this.productName;
  }
}