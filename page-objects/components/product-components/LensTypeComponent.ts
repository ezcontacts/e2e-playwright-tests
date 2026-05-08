import { Locator, Page } from "@playwright/test";
import { ProductStepComponent } from "./ProductStepComponent";
import { LensType } from "../../../test/data-test/productTypes";
import { expect } from "../../../test/fixtures/fixture";

export type { LensType };

export class LensTypeComponent extends ProductStepComponent {
  readonly lensType: (text: string) => Locator;
  readonly subtitle: (text: string) => Locator;

  constructor(page: Page, root: string = "li#step-4") {
    super(page, root);

    this.lensType = (text: string) =>
      this.within(".jsToolProg, .jsToolBifoc")
        .filter({ hasText: text })
        .locator("input");

    this.subtitle = (text: string) =>
      this.within("h5").filter({ hasText: text });
  }

  async clickOnLensTypeSection(): Promise<void> {
    await this.root.click();
  }

  async setLensType(type: LensType | string): Promise<void> {
    await this.lensType(type).click();
  }

  async verifyLensTypeIsChecked(type: LensType | string): Promise<void> {
    await expect(this.lensType(type)).toBeChecked();
  }

  async verifyLensTypeIsVisible(type: LensType | string): Promise<void> {
    await expect(this.lensType(type)).toBeVisible();
  }

  async verifySubtitle(text: string): Promise<void> {
    await expect(this.subtitle(text)).toBeVisible();
  }
}
