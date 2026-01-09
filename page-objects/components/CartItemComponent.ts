import { Page, Locator } from "@playwright/test";
import { BaseComponent } from "../base/BaseComponent";
import { expect } from "../../test/fixtures/fixture";

export class CartItemComponent extends BaseComponent {
  readonly name: Locator;
  readonly image: Locator;
  readonly editBtn: Locator;
  readonly removeBtn: Locator;
  readonly price: Locator;

  constructor(page: Page, index: number = 0, root: string = ".cart-product") {
    const rootLocator = page.locator(root).nth(index);

    super(page, {locator:rootLocator});

    this.name = this.within(".product-name");
    this.image = this.within(".product-img");
    this.editBtn = this.within(".list-inline > :nth-child(1) > a");
    this.removeBtn = this.within(".jsRemoveCartProduct");
    this.price = this.within("tbody > :nth-child(2) > :nth-child(2)").first();
  }

  async verifyNameIsVisible(): Promise<void> {
    await expect(this.name).toBeVisible();
  }

  async verifyImageIsVisible(): Promise<void> {
    await expect(this.image).toBeVisible();
  }

  async verifyEditBtnIsVisible(): Promise<void> {
    await expect(this.editBtn).toBeVisible();
  }

  async verifyRemoveBtnIsVisible(): Promise<void> {
    await expect(this.editBtn).toBeVisible();
  }

  async verifyPriceIsVisible(): Promise<void> {
    await expect(this.price).toBeVisible();
  }
}
