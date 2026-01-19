import { Page, Locator } from "@playwright/test";
import { BaseComponent } from "../base/BaseComponent";
import { expect } from "../../test/fixtures/fixture";

export class CardState {
  title!: string;
  reviews?: string;
  hasRating!: boolean;
}

export class ProductCardComponent extends BaseComponent {
  readonly viewBtn: Locator;
  readonly card: Locator;
  readonly title: Locator;
  readonly price: Locator;
  readonly rating: Locator;
  readonly reviews: Locator;
  readonly infoBlock: Locator;

  constructor(page: Page, index: number = 0, root: string = ".unbxd-product") {
    const rootLocator = page.locator(root).nth(index);

    super(page, {locator: rootLocator});

    this.viewBtn = this.within("span.view", ".contact-image");
    this.title = this.within(".contact-info .title");
    this.price = this.within(".contact-info .price");
    this.rating = this.within('[class*="rating-"]');
    this.reviews = this.within('.TTratingLinks');
    this.infoBlock = this.within('.TurnToReviewsTeaser');
    this.card = this.locator(root);
  }

  async clickOnViewBtn(): Promise<void> {
    await this.safeClickAndWaitForNetworkIdle(this.viewBtn);
    await this.waitForDomContentLoad();
  }

  async verifyQuantityCart(quantity: number): Promise<void> {
    const count = await this.getQuantityCart();
    await expect(count).toBe(quantity);
  }

  async verifyTitleIsVisible(): Promise<void> {
    await expect(this.title).toBeVisible();
  }

  async verifyPriceIsVisible(): Promise<void> {
    await expect(this.title).toBeVisible();
  }

  async verifyRatingIsVisible(): Promise<void> {
    await expect(this.rating).toBeVisible();
  }

  async verifyReviewsIsVisible(): Promise<void> {
    await expect(this.reviews).toBeVisible();
  }

  async verifyRatingIsNotExist(): Promise<void> {
    await expect(this.rating).toHaveCount(0);
  }

  async verifyReviewsIsNotExist(): Promise<void> {
    await expect(this.reviews).toHaveCount(0);
  }

  async getQuantityCart(): Promise<number> {
    return this.card.count();
  }

  async waitForVisible(): Promise<void> {
    await expect(this.title).toBeVisible();
  }

  async getState(): Promise<CardState>{
    const state: CardState = new CardState();

    state.title = await this.title.innerText();
    state.reviews = await this.reviews.innerText();
    state.hasRating = await this.rating.isVisible();

    return state;
  }

  async verifyState(state: CardState): Promise<void>{
    await expect(this.title).toHaveText(state.title);
    await expect(this.rating).toHaveCount(state.hasRating ? 1 : 0);

    if(state.reviews){
      await expect(this.reviews).toHaveText(state.reviews!);
    }
  }

  async verifyIsCenter(): Promise<void>{
    await expect(this.infoBlock).toHaveCSS('text-align', 'center');
  }
}
