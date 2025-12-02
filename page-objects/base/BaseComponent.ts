import { Locator, Page } from "@playwright/test";

export class BaseComponent {
  readonly page: Page;
  readonly root: Locator;

  constructor(page: Page, rootSelector: string) {
    this.page = page;
    this.root = page.locator(rootSelector);
  }

  within(selector: string): Locator {
    return this.root.locator(selector);
  }

  async isVisible(selector?: string): Promise<boolean> {
    if (selector) {
      return await this.within(selector).isVisible();
    }
    return this.root.isVisible();
  }

  async waitForVisible(selector?: string) {
    if (selector) {
      await this.within(selector).waitFor({ state: "visible" });
    } else {
      await this.root.waitFor({ state: "visible" });
    }
  }
}
