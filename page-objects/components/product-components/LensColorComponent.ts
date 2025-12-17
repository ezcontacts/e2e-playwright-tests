import { Page, Locator } from "@playwright/test";
import { BaseComponent } from "../../base/BaseComponent";
import { LensColorType } from "../../../test/data-test/productTypes";

export type { LensColorType };

export class LensColorComponent extends BaseComponent {
  readonly lensColorDesktop: Locator;
  readonly lensColorMobile: Locator;
  readonly compliteBtn: Locator;

  constructor(page: Page, root: string) {
    super(page, root);

    this.lensColorDesktop = this.within("#cleared-lens h3");
    this.lensColorMobile = this.within(".mobile-color-lens-options");
    this.compliteBtn = this.within("#complete-btn");
  }

  async setLensColor(type: LensColorType): Promise<void> {
    const isMobile = this.isMobile();

    if (isMobile) {
      await this.selectLensColor(type);
      return;
    }

    const btn = this.lensColorDesktop.filter({
      hasText: type,
    });

    await btn.click();
  }

  private async selectLensColor(type: string): Promise<void> {
    const options = this.lensColorMobile.locator("option");
    const count = await options.count();

    for (let i = 0; i < count; i++) {
      const text = await options.nth(i).textContent();
      if (text && text.includes(type)) {
        const value = await options.nth(i).getAttribute("value");
        if (value) {
          await this.lensColorMobile.selectOption(value);
          break;
        }
      }
    }
  }

  async clickOnCompliteBtn(): Promise<void> {
    await this.compliteBtn.click();
  }
}
