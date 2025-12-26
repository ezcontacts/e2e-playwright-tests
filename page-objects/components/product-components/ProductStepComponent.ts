import { Page, Locator } from "@playwright/test";
import { BaseComponent } from "../../base/BaseComponent";

export class ProductStepComponent extends BaseComponent {
  readonly continueBtn: Locator;

  constructor(page: Page, root: string) {
    super(page, root);

    this.continueBtn = this.within(".next-btn");
  }

  async clickOnContinueBtn(): Promise<void> {
    await this.continueBtn.click();
  }
}
