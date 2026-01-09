import { Page, Locator } from "@playwright/test";
import { BaseComponent } from "../base/BaseComponent";
import { expect } from "../../test/fixtures/fixture";

export class ProductCardComponent extends BaseComponent {
  readonly viewBtn: Locator;
  readonly card: Locator;

  constructor(page: Page, index: number, root: string = ".glass-mask") {
    const rootLocator = page.locator(root).nth(index);

    super(page, {locator: rootLocator});

    this.viewBtn = this.within("span.view", ".contact-image");
    this.card = this.locator(root);
  }

  async clickOnViewBtn(): Promise<void> {
    await this.safeClickAndWaitForNetworkIdle(this.viewBtn);
    await this.waitForDomContentLoad();
  }

  async verifyQuantityCart(quantity: number): Promise<void> {
    const count = await this.card.count();
    await expect(count).toBe(quantity);
  }
}
