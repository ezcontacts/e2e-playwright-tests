import { Locator, Page } from "@playwright/test";
import { ProductStepComponent } from "./ProductStepComponent";
import { LensType } from "../../../test/data-test/productTypes";
import { expect } from "../../../test/fixtures/fixture";

export type { LensType };

export class LensTypeComponent extends ProductStepComponent {
  readonly progressiveLensType: (text: string) => Locator;
  readonly bifocalLensType: (text: string) => Locator;
  readonly subtitle: (text: string) => Locator;

  constructor(page: Page, root: string = "li#step-4") {
    super(page, root);

    this.progressiveLensType = (text: string) =>
      this.within(".jsToolProg").filter({ hasText: text }).locator("input");

    this.bifocalLensType = (text: string) =>
      this.within(".jsToolBifoc").filter({ hasText: text }).locator("input");

    this.subtitle = (text: string) =>
      this.within("h5").filter({ hasText: text });
  }

  async clickOnLensTypeSection(): Promise<void> {
    await this.root.click();
  }

  async setProgressiveLensType(type: LensType | string): Promise<void> {
    await this.progressiveLensType(type).click();
  }

  async setBifocalLensType(type: LensType | string): Promise<void> {
    await this.bifocalLensType(type).click();
  }

  async verifyProgressiveLensType(type: LensType | string): Promise<void> {
    await expect(this.progressiveLensType(type)).toBeVisible();
  }

  async verifyBifocalLensType(type: LensType | string): Promise<void> {
    await expect(this.bifocalLensType(type)).toBeVisible();
  }

  async verifySubtitle(text: string): Promise<void> {
    await expect(this.subtitle(text)).toBeVisible();
  }
}
