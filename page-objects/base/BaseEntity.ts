import { Locator, Page } from "@playwright/test";

export class BaseEntity {
  readonly page: Page;

  readonly selectors: Locator[];
  readonly attentiveIframe: Locator;
  readonly popup: Locator;
  readonly closeBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.selectors = [
      page.locator("#closeIconContainer"),
      page.locator("#dismissbutton2header1"),
      page.locator(".close-icon"),
      page.locator('button[class*="close"]'),
    ];

    this.attentiveIframe = page.locator("iframe#attentive_creative");
    this.popup = page.locator("#overlayContainer");
    this.closeBtn = page.locator("#closeIconContainer");
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
}
