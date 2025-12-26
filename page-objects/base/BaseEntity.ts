import { Locator, Page } from "@playwright/test";
import { expect } from "../../test/fixtures/fixture";
import { randomUUID } from "crypto";

export class BaseEntity {
  protected page: Page;

  readonly selectors: Locator[];
  readonly attentiveIframe: Locator;
  readonly popup: Locator;
  readonly closeBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.selectors = [
      this.locator("#closeIconContainer"),
      this.locator("#dismissbutton2header1"),
      this.locator(".close-icon"),
      this.locator('button[class*="close"]'),
    ];

    this.attentiveIframe = this.locator("iframe#attentive_creative");
    this.popup = this.locator("#overlayContainer");
    this.closeBtn = this.locator("#closeIconContainer");
  }

  async waitForDomContentLoad() {
    await this.page.waitForLoadState("domcontentloaded");
  }

  async waitForLoadState() {
    await this.page.waitForLoadState("load");
  }

  async reloadPage() {
    await this.page.reload({ waitUntil: "domcontentloaded" });
  }

  async closeDynamicPopupIfPresent() {
    if ((await this.attentiveIframe.count()) > 0) {
      await this.attentiveIframe.evaluate((iframe) => iframe.remove());
      console.log("Removed iframe#attentive_creative");
    }

    for (const locator of this.selectors) {
      if ((await locator.count()) > 0 && (await locator.first().isVisible())) {
        await locator.first().click();
        console.log(
          `Clicked popup close button: ${await locator.first().toString()}`
        );
        return;
      }
    }

    console.log("No popup close buttons found");
  }

  async waitAndClosePopup(): Promise<void> {
    await this.page.waitForTimeout(1000);

    if ((await this.popup.count()) > 0) {
      console.log("Popup detected, closing...");

      await this.closeBtn.click({ force: true }).catch(() => {
        console.warn("Close button found but click failed");
      });
    }
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

  protected getPlatformSelector(desktop: string, mobile: string): string {
    return this.isMobile() ? mobile : desktop;
  }

  protected isMobile(): boolean {
    return this.page.viewportSize()?.width! < 768;
  }

  protected locator(desktop: string, mobile?: string): Locator {
    return mobile === undefined
      ? this.page.locator(desktop)
      : this.page.locator(this.getPlatformSelector(desktop, mobile));
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
}
