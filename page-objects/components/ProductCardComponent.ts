import { Page, Locator } from "@playwright/test";
import { BaseComponent } from "../base/BaseComponent";
import { expect } from "../../test/fixtures/fixture";

export class CardState {
  title!: string;
  reviews?: string;
  hasRating!: boolean;
  colors?: string[];
  productId?: string;
}

export class ProductCardComponent extends BaseComponent {
  readonly viewBtn: Locator;
  readonly card: Locator;
  readonly title: Locator;
  readonly price: Locator;
  readonly rating: Locator;
  readonly reviews: Locator;
  readonly infoBlock: Locator;
  readonly color: Locator;
  readonly link: Locator;

  constructor(
    page: Page,
    index: number = 0,
    root: string = ".mask-wrap, .unbxd-product",
  ) {
    const rootLocator = page.locator(root).nth(index);

    super(page, { locator: rootLocator });

    this.viewBtn = this.within("span.view", ".contact-image");
    this.title = this.within(".contact-info .title");
    this.price = this.within(".contact-info .price");
    this.rating = this.within('[class*="rating-"]');
    this.reviews = this.within("span span");
    this.infoBlock = this.within(".TurnToReviewsTeaser");
    this.color = this.within(".glass-colors");
    this.link = this.within("a");
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

  async verifyOptionalColorIsVisible(): Promise<boolean> {
    try {
      await this.color.waitFor({ state: "visible" });
      return true;
    } catch {
      return false;
    }
  }

  async getQuantityCart(): Promise<number> {
    return this.card.count();
  }

  async waitForVisible(): Promise<void> {
    await expect(this.title).toBeVisible();
  }

  async getState(): Promise<CardState> {
    const state: CardState = new CardState();

    state.title =
      (await this.title.count()) > 0 ? await this.title.innerText() : "";
    state.reviews =
      (await this.reviews.count()) > 0 ? await this.reviews.innerText() : "";
    state.hasRating =
      (await this.rating.count()) > 0 ? await this.rating.isVisible() : false;
    state.colors = await this.getColorsFromContainer(this.color);

    const productUrl = await this.link.first().getAttribute("href");

    if (productUrl) state.productId = this.getProductTail(productUrl);
    return state;
  }

  async getColorsFromContainer(
    container: Locator,
  ): Promise<string[] | undefined> {
    const count = await container.count();
    if (count === 0) return undefined;

    return await container.first().evaluate((el) => {
      const result: string[] = [];

      const elements = [el, ...el.querySelectorAll("*")];

      elements.forEach((child) => {
        const style = child.getAttribute("style");
        if (!style) return;

        const match = style.match(/background-color:\s*(#[0-9a-fA-F]+)/);
        if (match) {
          result.push(match[1]);
        }
      });

      return [...new Set(result)];
    });
  }

  getProductTail(url: string): string {
    const marker = "/product/";
    const index = url.indexOf(marker);

    if (index === -1) return "";

    const tail = url.slice(index + marker.length);
    const parts = tail.split("/");

    return parts.length > 1 ? parts.slice(1).join("/") : "";
  }

  async verifyState(state: CardState): Promise<void> {
    if (state.title) {
      await expect(this.title).toHaveText(state.title);
    }

    if (state.hasRating !== undefined) {
      await expect(this.rating).toHaveCount(state.hasRating ? 1 : 0);
    }

    if (state.reviews) {
      await expect(this.reviews).toHaveText(state.reviews);
    }

    if (state.colors) {
      const actualColors = await this.getColorsFromContainer(this.color);
      expect(new Set(actualColors)).toEqual(new Set(state.colors));
    }
  }

  async verifyIsCenter(): Promise<void> {
    if ((await this.infoBlock.count()) === 0) return;
    await expect(this.infoBlock).toHaveCSS("text-align", "center");
  }
}
