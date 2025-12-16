import { Page, Locator, expect } from "@playwright/test";
import { BaseComponent } from "../base/BaseComponent";

export class ProductCardComponent extends BaseComponent {
  readonly viewButton: Locator;

  constructor(page: Page, index: number, root: string = ".glass-mask") {
    const rootLocator = page.locator(root).nth(index);

    super(page, rootLocator);

    this.viewButton = this.within("span.view");
  }

  async clickOnViewButton() {
    await this.viewButton.hover();
    await this.viewButton.click();
    //await this.waitForDomContentLoad();
    await this.page.waitForLoadState("networkidle");
  }
}
