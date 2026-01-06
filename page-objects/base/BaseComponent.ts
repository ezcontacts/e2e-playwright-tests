import { FrameLocator, Locator, Page } from "@playwright/test";
import { BaseEntity, LocatorConfig } from "./BaseEntity";

export abstract class BaseComponent extends BaseEntity {
  readonly root: Locator;

  constructor(page: Page, root: string | LocatorConfig) {
    super(page);
    
    this.root = this.getLocator(root);
  }

  protected within(desktop: string | LocatorConfig , mobile?: string | LocatorConfig): Locator {
    return mobile === undefined
      ? this.getLocatorInRoot(this.root, desktop)
      : this.getLocatorInRoot(this.root, this.getPlatformSelector(desktop, mobile));
  }

  protected async isVisible(selector?: string): Promise<boolean> {
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

  async scrollToComponent() {
    await this.root.scrollIntoViewIfNeeded();
    this.root
  }
}
