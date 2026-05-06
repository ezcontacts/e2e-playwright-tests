import { Locator, Page } from "@playwright/test";
import { BasePage } from "../../base/BasePage";
import { FillterComponent } from "../../components/FillterComponent";
import { expect } from "../../../test/fixtures/fixture";
import {
  CardState,
  ProductCardComponent,
} from "../../components/ProductCardComponent";
import { Product } from "../../../types/productType";
import { ENDPOINT_API, ENDPOINT_URL } from "../../../constant/endpoint";
import "../../../extentions/locator_extention.ts";

export abstract class ProductCatalogePage extends BasePage {
  readonly productCountDropdown: Locator;
  readonly productMatchDropdown: Locator[];
  readonly paginationList: (index: number) => Locator;

  readonly fillter: FillterComponent;
  readonly productCard: (index: number) => ProductCardComponent;

  constructor(page: Page, endpoint: string) {
    super(page, endpoint);

    this.productCountDropdown = this.locator(
      ".unbxd-pagesize-container .multi",
    );
    this.productMatchDropdown = this.locators([
      ".unbxd-sort-container .multi",
      "#products-sort-order-select",
    ]);

    this.fillter = new FillterComponent(page);

    this.productCard = (index: number = 0) =>
      new ProductCardComponent(
        this.page,
        index,
        this.getPlatformSelector(
          ".mask-wrap, .unbxd-product",
          "li.ng-scope",
        ) as string,
      );

    this.paginationList = (index: number) =>
      this.locator(".pagination li.unbxd_page a").nth(index);
  }

  async open(): Promise<void> {
    await super.open();
    await this.promotion.closeDynamicPopupIfPresent();
  }

  async verifyProductCountDropdownIsVisible(): Promise<void> {
    await expect(this.productCountDropdown).toBeVisible();
  }

  async verifyProductMatchDropdownIsVisible(): Promise<void> {
    const locator = await this.productMatchDropdown.firstVisible();

    const visible = await this.productMatchDropdown.firstVisible();
    await expect(locator).toBeVisible();
  }

  async verifyProductCountDropdownIsHaveValue(text: string): Promise<void> {
    await expect(this.productCountDropdown).toHaveValue(text, {
      timeout: 30000,
    });
  }

  async verifyProductMatchDropdownIsHaveValue(
    text: string | string[],
  ): Promise<void> {
    const locator = await this.productMatchDropdown.firstVisible();
    const value = await locator.inputValue();

    if (Array.isArray(text)) {
      expect(
        text.includes(value),
        `Expected "${value}" to be one of [${text.join(", ")}]`,
      ).toBeTruthy();
    } else {
      expect(value).toBe(text);
    }
  }

  async setProductCountDropdownValue(text: string): Promise<void> {
    await this.productCountDropdown.selectOption(text);
    await this.waitForDomContentLoad();
  }

  async setProductMatchDropdownValue(text: string): Promise<void> {
    const locator = await this.productMatchDropdown.firstVisible();
    await locator.selectOption(text);
    await this.waitForDomContentLoad();
  }

  async clickOnProductByIndex(index: number): Promise<void> {
    await this.closeAttentivePopupIfPresent();
    await this.productCard(index).clickOnViewBtn();
  }

  async verifyProductTitlesIsVisible(): Promise<void> {
    await this.forEachProductCard((card) => card.verifyTitleIsVisible());
  }
  async verifyOptionalProductColorsIsVisible(): Promise<void> {
    let hasOptionalColor = false;
    await this.forEachProductCard(async (card) => {
      if (!hasOptionalColor) {
        hasOptionalColor = await card.verifyOptionalColorIsVisible();
      }
    });

    expect(
      hasOptionalColor,
      "Expected at least one product to have optional colors visible",
    ).toBeTruthy();
  }

  private async forEachProductCard(
    action: (card: ProductCardComponent) => Promise<void>,
  ): Promise<void> {
    const card = await this.productCard(0);
    await card.waitForVisible();

    const quantityCards = await card.getQuantityCart();

    for (let i = 0; i < quantityCards; i++) {
      await action(await this.productCard(i));
    }
  }

  async verifyProductRatingsIsVisible(): Promise<void> {
    await this.forEachProductCard((card) => card.verifyRatingIsVisible());
  }

  async verifyProductReviewsIsVisible(): Promise<void> {
    await this.forEachProductCard((card) => card.verifyReviewsIsVisible());
  }

  async verifyInfoCardsIsCenter(): Promise<void> {
    await this.forEachProductCard((card) => card.verifyIsCenter());
  }

  async getCatalogeState(): Promise<CardState[]> {
    const firstCard = await this.productCard(0);
    await firstCard.waitForVisible();

    const quantityCards = await firstCard.getQuantityCart();

    const cards: CardState[] = [];

    for (let i = 0; i < quantityCards; ++i) {
      const cardState = await this.productCard(i).getState();
      cards.push(cardState);
    }

    return cards;
  }

  async verifyCatalogState(states: CardState[]): Promise<void> {
    const firstCard = await this.productCard(0);
    await firstCard.waitForVisible();

    for (let i = 0; i < states.length; ++i) {
      const card = await this.productCard(i);
      const state = states.at(i);
      if (!state) continue;

      await card.verifyState(state);
    }
  }

  async getCatalogeAPIState(): Promise<Product[]> {
    const response = await this.page.waitForResponse(
      (res) =>
        res.url().includes(ENDPOINT_URL) &&
        res.url().includes(ENDPOINT_API.cataloge),
    );
    await this.promotion.closeDynamicPopupIfPresent();

    const text = await response.text();

    const json = JSON.parse(text.replace(/^[^(]+\(/, "").replace(/\);?$/, ""));

    return json.response.products as Product[];
  }

  async verifyCatalogStateAfterFiltering(
    products: Product[],
    brands: string[],
    prices: string[],
  ): Promise<void> {
    for (const product of products) {
      if (brands.length > 0) {
        expect(product.brand.some((b) => brands.includes(b))).toBeTruthy();
      }

      const priceMatches = prices.some((range) => {
        const nums = range.match(/\d+/g);
        if (!nums) return false;

        const min = Number(nums[0]);
        const max = nums[1] ? Number(nums[1]) : Infinity;

        return product.min_price >= min && product.min_price <= max;
      });

      expect(priceMatches).toBeTruthy();
    }
  }

  async getLastCard(): Promise<ProductCardComponent> {
    const firstCard = await this.productCard(0);
    await firstCard.waitForVisible();

    const count = await firstCard.getQuantityCart();

    return await this.productCard(count - 1);
  }

  async getFirstCard(): Promise<ProductCardComponent> {
    return await this.productCard(0);
  }

  async clickOnPaginationButton(num: number): Promise<void> {
    await this.promotion.closeDynamicPopupIfPresent();
    const btn = await this.paginationList(num);
    await btn.click();
    await this.waitForDomContentLoad();
  }

  private async closeAttentivePopupIfPresent(): Promise<void> {
    const closeButton = this.page
      .frameLocator("#attentive_creative")
      .getByTestId("closeIcon");

    try {
      if (await closeButton.isVisible({ timeout: 2000 })) {
        await closeButton.click();
      }
    } catch {
      // Popup not present, ignore
    }
  }
}

