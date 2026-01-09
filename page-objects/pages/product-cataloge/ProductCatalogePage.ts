import { Locator, Page } from "@playwright/test";
import { BasePage } from "../../base/BasePage";
import { FillterComponent } from "../../components/FillterComponent";
import { PromotionComponent } from "../../components/PromotionComponent";
import { expect } from "../../../test/fixtures/fixture";

export abstract class ProductCatalogePage extends BasePage {
  readonly productsCountDropdown: Locator;

  readonly fillter: FillterComponent;
  readonly promotion: PromotionComponent;

  constructor(page: Page, endpoint: string) {
    super(page, endpoint);

    this.productsCountDropdown = this.locator('.unbxd-pagesize-container .multi ');

    this.fillter = new FillterComponent(page);
    this.promotion = new PromotionComponent(page);
  }

  async open(): Promise<void> {
    await super.open();
    await this.promotion.closeDynamicPopupIfPresent();
  }

  async verifyProductCountDropdownIsVisible(): Promise<void> {
    await expect(this.productsCountDropdown).toBeVisible();
  }

  async verifyProductCountDropdownIsHaveValue(text: string): Promise<void> {
    await expect(this.productsCountDropdown).toHaveValue(text);
  }

  async setProductCountDropdownValue(text: string): Promise<void> {
    await this.productsCountDropdown.selectOption(text);
    await this.waitForDomContentLoad();
  }
}