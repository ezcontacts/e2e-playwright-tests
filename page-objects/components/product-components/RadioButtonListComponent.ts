import { Page, Locator } from "@playwright/test";
import { BaseComponent } from "../../base/BaseComponent";
import { expect } from "../../../test/fixtures/fixture";

export class RadioButtonListComponent extends BaseComponent {
  readonly radioBtn: Locator;

  constructor(page: Page, root: Locator) {
    super(page, root);

    this.radioBtn = this.within(".ezMarkLabel");
  }

  async clickOnRadioBtnByText(text: string): Promise<void> {
    const btn = this.radioBtn.filter({
      hasText: text,
    });

    await btn.scrollIntoViewIfNeeded();
    await btn.waitFor({ state: "visible" });
    await btn.click();
  }
}
