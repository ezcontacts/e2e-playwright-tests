import { Locator, Page } from "@playwright/test";
import { BasePage } from "../../base/BasePage";
import { FillterComponent } from "../../components/FillterComponent";
import { PromotionComponent } from "../../components/PromotionComponent";
import { expect } from "../../../test/fixtures/fixture";

export abstract class ProductCatalogePage extends BasePage {
  readonly productCountDropdown: Locator;
  readonly productMatchDropdown: Locator;

  readonly fillter: FillterComponent;
  readonly promotion: PromotionComponent;

  constructor(page: Page, endpoint: string) {
    super(page, endpoint);

    this.productCountDropdown = this.locator('.unbxd-pagesize-container .multi');
    this.productMatchDropdown = this.locator('.unbxd-sort-container .multi');

    this.fillter = new FillterComponent(page);
    this.promotion = new PromotionComponent(page);
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
}