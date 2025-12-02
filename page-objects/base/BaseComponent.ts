import { Locator, Page } from "@playwright/test";
import { BaseEntity } from "./BaseEntity";

export class BaseComponent extends BaseEntity {
  readonly root: Locator;

  constructor(page: Page, root: string | Locator) {
    super(page);

    if (typeof root === "string") {
      this.root = page.locator(root);
    } else {
      this.root = root;
    }
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
