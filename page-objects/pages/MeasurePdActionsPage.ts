import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { ENDPOINT } from "../../constant/endpoint";

export class MeasurePupilDistancePage extends BasePage {
  readonly title: Locator;
  readonly toolInstructions: Locator;
  readonly video: Locator;

  readonly sectionWithText: (text: string)=> Locator;
  readonly btnWithText: (text: string)=> Locator;

  constructor(page: Page) {
    super(page, ENDPOINT.measurePdActions);

    this.title = this.locator("h1.section-title");
    this.toolInstructions = this.locator('[class^="measure-pd-section"]');
    this.video = this.locator("#pd-measurement-video");

    this.btnWithText = (text: string) => this.locator("button, a").filter({ hasText: text });
    this.sectionWithText  = (text: string) => this.locator("h2, h3").filter({ hasText: text });
  }

  async verifyTitleText(text: string): Promise<void>{
    await expect(this.title).toHaveText(text);
  }

  async verifyToolInstructionsIsVisible(): Promise<void>{
    await expect(this.toolInstructions).toBeVisible();
  }

  async verifyBtnWithTextIsVisible(text: string): Promise<void>{
    const btn = this.btnWithText(text);

    await expect(btn).toBeVisible();
  }

  async verifySectionIsVisible(text: string): Promise<void>{
    const section = this.sectionWithText(text);

    await expect(section).toBeVisible();
  }

  async verifyVideoIsVisible(): Promise<void>{
    await expect(this.video).toBeVisible();
  }

  async verifyVideoAttributes(): Promise<void>{
    await expect(this.video).toHaveJSProperty('autoplay', true);
    await expect(this.video).toHaveJSProperty('muted', true);
  }
}
