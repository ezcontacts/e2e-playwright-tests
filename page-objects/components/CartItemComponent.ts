import { Page, Locator } from "@playwright/test";
import { BaseComponent } from "../base/BaseComponent";
import { expect } from "../../test/fixtures/fixture";

export class CartItemComponent extends BaseComponent {
  readonly name: Locator;
  readonly image: Locator;
  readonly editBtn: Locator;
  readonly removeBtn: Locator;
  readonly price: Locator;

  constructor(page: Page, index: number, root: string = ".cart-product") {
    const rootLocator = page.locator(root).nth(index);

    super(page, {locator:rootLocator});

    this.name = this.within(".product-name");
    this.image = this.within(".product-img");
    this.editBtn = this.within(".list-inline > :nth-child(1) > a");
    this.removeBtn = this.within(".jsRemoveCartProduct");
    this.price = this.within("tbody > :nth-child(2) > :nth-child(2)").first();
  }

  async verifyNameIsVisible(){
    await expect(this.name).toBeVisible();
  }

  async verifyImageIsVisible(){
    await expect(this.image).toBeVisible();
  }

  async verifyEditBtnIsVisible(){
    await expect(this.editBtn).toBeVisible();
  }

  async verifyRemoveBtnIsVisible(){
    await expect(this.editBtn).toBeVisible();
  }

  async verifyPriceIsVisible(){
    await expect(this.price).toBeVisible();
  }
}
