import { Page, Locator } from "@playwright/test";
import { BaseComponent } from "../../base/BaseComponent";
import { expect } from "../../../test/fixtures/fixture";
import { ProductType } from "../../../test/data-test/productTypes";

export type { ProductType };

export class AddProductModelComponent extends BaseComponent {
  readonly product: (text: string) => Locator;
  readonly productAddBtn: (index: number) => Locator;

  readonly continueBtn: Locator;
  readonly searchField: Locator;
  readonly searchBtn: Locator;
  readonly inStockOnlyCheckbox: Locator;
  readonly summaryProductBtn: Locator;
  readonly addToOdrerBtn: Locator;

  constructor(page: Page, root: string = "#add-product-to-order-modal") {
    super(page, root);

    this.product = (text: string) => this.within(`.radioLabel`).filter({ hasText: text });
    this.productAddBtn = (index: number) => this.within('a.select-child-id-lnk').nth(index);

    this.continueBtn = this.within(".btn-primary");
    this.searchField = this.within('#searchProduct');
    this.searchBtn = this.within('.input-group-addon');
    this.inStockOnlyCheckbox = this.within('#inStockOnly');

    const iframe = this.page.frameLocator('.eyeglass-products-iframes');
    this.summaryProductBtn = iframe.locator('.btn-product-summary');
    this.addToOdrerBtn = this.locator('.btn-eyeglasses-to-order');
  }

  async selectProductByType(ProductType: ProductType): Promise<void> {
    const product = this.product(ProductType);
    await expect(product).toBeVisible();
    await product.click();
  }

  async clickOnContinueBtn(): Promise<void> {
    await this.continueBtn.click();
  }

  async searchProductByBrand(text: string): Promise<void> {
    await expect(this.searchBtn).toBeVisible();
    await this.searchField.fill(text);
    await this.searchBtn.click();
  }

  async clickOnNextBtn(): Promise<void> {
    await this.continueBtn.click();
  }

  async clickOnInStockOnlyCheckbox(): Promise<void> {
    await expect(this.inStockOnlyCheckbox).toBeVisible();
    await this.inStockOnlyCheckbox.click();
  }

  async clickOnAddProductBtn(index: number): Promise<void> {
    const productAddBtn = this.productAddBtn(index);
    await expect(productAddBtn).toBeVisible();
    await this.productAddBtn(index).click();
  }

  async clickOnSummaryProductBtn(): Promise<void> {
    await this.page.waitForTimeout(5000);
    await this.summaryProductBtn.scrollIntoViewIfNeeded();
    await this.summaryProductBtn.hover(); 
    await this.summaryProductBtn.click(); 
  }

  async clickOnAddToOrderBtn(): Promise<void> {
    await this.safeClick(this.addToOdrerBtn);
  }
}
