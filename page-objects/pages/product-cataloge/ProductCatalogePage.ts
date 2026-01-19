import { Locator, Page } from "@playwright/test";
import { BasePage } from "../../base/BasePage";
import { FillterComponent } from "../../components/FillterComponent";
import { PromotionComponent } from "../../components/PromotionComponent";
import { expect } from "../../../test/fixtures/fixture";
import { CardState, ProductCardComponent } from "../../components/ProductCardComponent";

export abstract class ProductCatalogePage extends BasePage {
  readonly productCountDropdown: Locator;
  readonly productMatchDropdown: Locator;
  readonly paginationList: (index: number) => Locator;

  readonly fillter: FillterComponent;
  readonly promotion: PromotionComponent;
  readonly productCard: (index: number) => ProductCardComponent;

  constructor(page: Page, endpoint: string) {
    super(page, endpoint);

    this.productCountDropdown = this.locator('.unbxd-pagesize-container .multi');
    this.productMatchDropdown = this.locator('.unbxd-sort-container .multi');

    this.fillter = new FillterComponent(page);
    this.promotion = new PromotionComponent(page);

    this.productCard = (index: number = 0) =>
        new ProductCardComponent(
          this.page,
          index,
          this.getPlatformSelector(".unbxd-product", "li.ng-scope") as string
        );

    this.paginationList = (index: number) => this.locator(".pagination li.unbxd_page a").nth(index);
  }

  async open(): Promise<void> {
    await super.open();
    await this.promotion.closeDynamicPopupIfPresent();
  }

  async verifyProductCountDropdownIsVisible(): Promise<void> {
    await expect(this.productCountDropdown).toBeVisible();
  }

  async verifyProductMatchDropdownIsVisible(): Promise<void> {
    await expect(this.productMatchDropdown).toBeVisible();
  }

  async verifyProductCountDropdownIsHaveValue(text: string): Promise<void> {
    await expect(this.productCountDropdown).toHaveValue(text, {timeout: 30000});
  }

  async verifyProductMatchDropdownIsHaveValue(text: string): Promise<void> {
    await expect(this.productMatchDropdown).toHaveValue(text, {timeout: 30000});
  }

  async setProductCountDropdownValue(text: string): Promise<void> {
    await this.productCountDropdown.selectOption(text);
    await this.waitForDomContentLoad();
  }

  async setProductMatchDropdownValue(text: string): Promise<void> {
    await this.productMatchDropdown.selectOption(text);
    await this.waitForDomContentLoad();
  }

  async clickOnProductByIndex(index: number): Promise<void> {
    await this.productCard(index).clickOnViewBtn();
    await this.waitForDomContentLoad();
  }

  async verifyProductTitlesIsVisible(): Promise<void> {
    await this.forEachProductCard(card => card.verifyTitleIsVisible());
  }

  private async forEachProductCard(action: (card: ProductCardComponent) => Promise<void>
  ): Promise<void> {
    const card = await this.productCard(0);
    await card.waitForVisible();

    const quantityCards = await card.getQuantityCart();

    for (let i = 0; i < quantityCards; i++) {
      await action(await this.productCard(i));
    }
  }

  async verifyProductRatingsIsVisible(): Promise<void> {
    await this.forEachProductCard(card => card.verifyRatingIsVisible());
  }

  async verifyProductReviewsIsVisible(): Promise<void> {
    await this.forEachProductCard(card => card.verifyReviewsIsVisible());
  }

  async verifyInfoCardsIsCenter(): Promise<void> {
    await this.forEachProductCard(card => card.verifyIsCenter());
  }

  async getCatalogState(): Promise<CardState[]> {
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
      if(!state) continue;

      await card.verifyState(state);
    }
  }

  async getLastCard(): Promise<ProductCardComponent> {
    const firstCard = await this.productCard(0);
    await firstCard.waitForVisible();

    const count = await firstCard.getQuantityCart();

    return await this.productCard(count - 1);
  }

  async clickOnPaginationButton(num: number): Promise<void>{
    const btn = await this.paginationList(num);
    await btn.click();
    await this.waitForDomContentLoad();
  }
}