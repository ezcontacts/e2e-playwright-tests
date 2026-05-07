import { Page, Locator } from "@playwright/test";
import { BaseComponent } from "../../base/BaseComponent";
import { expect } from "../../../test/fixtures/fixture";

export class ProductStepComponent extends BaseComponent {
  readonly continueBtn: Locator;

  constructor(page: Page, root: string) {
    super(page, root);

    this.continueBtn = this.within(".next-btn");
  }

  async clickOnContinueBtn(): Promise<void> {
    await this.continueBtn.click();
  }

  async verifyContinueBtnIsEnabled(): Promise<void> {
    await expect(this.continueBtn).toBeEnabled();
  }

  async verifySectionIsActive(): Promise<void> {
    await expect(this.root).toHaveAttribute("class", "/step-active/");
  }
}
