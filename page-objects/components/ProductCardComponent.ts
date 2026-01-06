import { Page, Locator } from "@playwright/test";
import { BaseComponent } from "../base/BaseComponent";

export class ProductCardComponent extends BaseComponent {
  readonly viewBtn: Locator;

  constructor(page: Page, index: number, root: string = ".glass-mask") {
    const rootLocator = page.locator(root).nth(index);

    super(page, {locator: rootLocator});

    this.viewBtn = this.within("span.view", ".contact-image");
  }

  async clickOnViewBtn(): Promise<void> {
    await this.safeClickAndWaitForNetworkIdle(this.viewBtn);
    await this.waitForDomContentLoad();
  }
}
