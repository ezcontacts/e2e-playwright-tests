import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { ENDPOINT } from "../../constant/endpoint";
import { MessageComponent } from "../components/SuccessMessageComponent";
import { CartItemComponent } from "../components/CartItemComponent";

export class CartPage extends BasePage {
  readonly message: MessageComponent;

  readonly title: Locator;
  readonly cartNumber: Locator;
  readonly continueShoppingBtn: Locator;
  readonly itemSection: Locator;
  readonly totalPrice: Locator;
  readonly checkoutBtn: Locator;

  readonly item: (index: number) => CartItemComponent;

  constructor(page: Page) {
    super(page, ENDPOINT.contactUs);

    this.message = new MessageComponent(this.page);
    this.title = this.locator(".section-title");
    this.cartNumber = this.locator("h5 > strong");
    this.continueShoppingBtn = this.locator(".active-link");
    this.itemSection = this.locator(".items");
    this.totalPrice = this.locator("#itemTotal");
    this.checkoutBtn = this.locator('[data-value="1"]');

    this.item = (index: number) => new CartItemComponent(this.page, index);
  }

  async verifyPageTitleIsVisible(): Promise<void> {
    await expect(this.title).toBeVisible();
  }

  async verifyCartNumberIsVisible(): Promise<void> {
    await expect(this.cartNumber).toBeVisible();
  }

  async verifyContinueShoppingBtnIsVisible(): Promise<void> {
    await expect(this.continueShoppingBtn).toBeVisible();
  }

  async verifyItemSectionIsVisible(): Promise<void> {
    await expect(this.itemSection).toBeVisible();
  }

  async verifyTotalPriceIsVisible(): Promise<void> {
    await expect(this.totalPrice).toBeVisible();
  }

  async verifyCheckoutBtnIsVisible(): Promise<void> {
    await expect(this.checkoutBtn).toBeVisible();
  }
  
  async clickOnCheckoutBtn(): Promise<void> {
    await this.checkoutBtn.click();
  }
}
