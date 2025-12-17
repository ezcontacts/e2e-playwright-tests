import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { ENDPOINT } from "../../constant/endpoint";
import { expect } from "../../test/fixtures/fixture";

export class VisionTestIntroductionPage extends BasePage {
  readonly title: Locator;
  
  constructor(page: Page) {
    super(page, ENDPOINT.contactLenses);

    this.title = this.locator(".row > h2");
  }

  async verifyTitleIsVisible(): Promise<void>{
    await expect(this.title).toBeVisible();
  }
}
