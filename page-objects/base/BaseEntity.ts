import { Locator, Page } from "@playwright/test";
import { expect } from "../../test/fixtures/fixture";
import { randomUUID } from "crypto";

type BaseLocator = {
  iframe?: string;
};

type ByLocator = {
  locator: Locator;
};

type ByTestId = {
  getByTestId: string;
};

type ByCss = {
  selector: string;
};

type XOR<T, U> =
  | (T & { [K in keyof U]?: never })
  | (U & { [K in keyof T]?: never });

type XOR3<A, B, C> =
  | XOR<A, B | C>
  | XOR<B, A | C>
  | XOR<C, A | B>;

export type LocatorConfig =
  BaseLocator &
  XOR3<ByLocator, ByTestId, ByCss>;

export abstract class BaseEntity {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async safeClick(locator: Locator, timeout = 60000) {
    await locator.scrollIntoViewIfNeeded();
    await expect(locator).toBeVisible({ timeout });
    await expect(locator).toBeEnabled({ timeout });
    await locator.click({ timeout });
  }

  protected async safeClickAndWaitForNetworkIdle(
    locator: Locator,
    options?: { timeout?: number }
  ): Promise<void> {
    await this.page.waitForTimeout(5000);
    await locator.scrollIntoViewIfNeeded();
    await expect(locator).toBeVisible();
    await locator.click({force: true});
  }

  async safeFill(locator: Locator, value: string, timeout = 60000) {
    await locator.scrollIntoViewIfNeeded();
    await expect(locator).toBeVisible({ timeout });
    await expect(locator).toBeEnabled({ timeout });
    await locator.fill(value, { timeout });
  }

  async waitForDomContentLoad(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
  }

  async waitForLoadState(): Promise<void> {
    await this.page.waitForLoadState("load");
  }

  async reloadPage(): Promise<void> {
    await this.page.reload({ waitUntil: "domcontentloaded" });
  }

  async clickIfVisible(locator: Locator): Promise<void> {
    const count = await locator.count();
    if (count > 0) {
      await locator.first().click();
    }
  }

  async verifyAnyCondition(
    locator: Locator,
    condition: (el: Locator) => Promise<boolean>,
    errorMessage = `Condition: ${condition} not valid`
  ) {
    const count = await locator.count();

    for (let i = 0; i < count; i++) {
      const el = locator.nth(i);

      if (await condition(el)) {
        return true;
      }
    }

    throw new Error(errorMessage);
  }

  protected getPlatformSelector(desktop: string | LocatorConfig, mobile: string | LocatorConfig): string | LocatorConfig {
    return this.isMobile() ? mobile : desktop;
  }

  protected isMobile(): boolean {
    return this.page.viewportSize()?.width! < 768;
  }

  protected locator(desktop: string | LocatorConfig, mobile?: string | LocatorConfig): Locator {
    return mobile === undefined
      ? this.getLocator(desktop)
      : this.getLocator(this.getPlatformSelector(desktop, mobile));
  }

  protected getLocator(config: string | LocatorConfig): Locator {
    if (typeof config === "string") {
      return this.page.locator(config);
    }

    if ("locator" in config) {
      return config.locator!;
    }

    const root = config.iframe
      ? this.page.frameLocator(config.iframe)
      : this.page;

    if ("getByTestId" in config) {
      return root.getByTestId(config.getByTestId!);
    }

    if ("selector" in config) {
      return root.locator(config.selector);
    }

    throw new Error(`Any locator or selector no set`);
  }

  protected getLocatorInRoot(root: Locator, config: string | LocatorConfig): Locator {
    if (typeof config === "string") {
      return root.locator(config);
    }

    if ("locator" in config) {
      return config.locator!;
    }

    if ("getByTestId" in config) {
      return root.getByTestId(config.getByTestId!);
    }

    if ("selector" in config) {
      return root.locator(config.selector);
    }

    throw new Error(`Any locator or selector no set`);
  }

  protected async enterField(locator: Locator, value: string) {
    await locator.scrollIntoViewIfNeeded();
    
    await expect(locator).toBeVisible();
    await expect(locator).toBeEnabled();

    await locator.fill(value);
  }

  public generateRandomEmail(): string {
    return `user_${randomUUID()}@example.com`;
  }

  public async clickWithLoad(locator: Locator): Promise<void> {
    await locator.click();
    await this.waitForLoadState();
  }
}
