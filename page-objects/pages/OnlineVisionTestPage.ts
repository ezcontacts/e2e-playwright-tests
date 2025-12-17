import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { ENDPOINT } from "../../constant/endpoint";

export class OnlineVisionTestPage extends BasePage {
  readonly visionTestBtn: Locator;

  constructor(page: Page) {
    super(page, ENDPOINT.onlineVision);

    this.visionTestBtn = this.locator(".no-info a");
  }

  async clickOnVisionTestBtn(text: string): Promise<void>{
    await this.visionTestBtn.click();
  }
}
