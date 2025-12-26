import { Page, Locator } from "@playwright/test";
import { BaseComponent } from "../../base/BaseComponent";

export class AdminContentPanelComponent extends BaseComponent {
  readonly nextBtn: Locator;

  constructor(page: Page, root: string = ".contentpanel") {
    super(page, root);

    this.nextBtn = this.within("#btn_submit");
  }

  async clickOnNextBtn(): Promise<void> {
    await this.page.waitForTimeout(2000);
    await this.nextBtn.click();
  }
}
