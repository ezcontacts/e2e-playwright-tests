import { expect, Locator, Page } from "@playwright/test";
import { AccountPage } from "./AccountPage";
import { ENDPOINT } from "../../../constant/endpoint";

export class RxInformationPage extends AccountPage {
  readonly addNewPrescriptionBtn: Locator;
  readonly prescriptionText: Locator;
  readonly prescriptionBlock: Locator;
  readonly action: (text: string) => Locator;

  constructor(page: Page) {
    super(page, ENDPOINT.ezPoints);

    this.addNewPrescriptionBtn = this.locator(".acc-edit");
    this.prescriptionText = this.locator(".acc-text");
    this.prescriptionBlock = this.locator(".rx-cols");
    this.action = (text: string) =>
      this.locator(".list-inline li").filter({ hasText: text });
  }

  async verifyaddNewPrescriptionBtn(text: string): Promise<void> {
    await expect(this.addNewPrescriptionBtn).toBeVisible();
    await expect(this.addNewPrescriptionBtn).toHaveText(text);
  }

  async verifyPrescriptionText(expected: string): Promise<void> {
    console.log("Expected Text:", expected);
    await expect(this.prescriptionText).toBeVisible();

    const paragraphs = await this.prescriptionText
      .locator("p")
      .allTextContents();
    const actual = paragraphs.join(" ");

    const normalize = (text: string) =>
      text
        .replace(/\s+/g, " ")
        .replace(/\s*,\s*/g, ", ")
        .trim();

    expect(normalize(actual)).toBe(normalize(expected));
  }

  async verifyPrescriptionBlockIsExists(): Promise<void> {
    const countBlocks = await this.prescriptionBlock.count();
    expect(countBlocks).toBeGreaterThan(0);
  }

  async verifyPrescriptionBlocksIsVisible(): Promise<void> {
    const countBlocks = await this.prescriptionBlock.count();
    for (let i = 0; i < countBlocks; i++) {
      await expect(this.prescriptionBlock.nth(i)).toBeVisible();
    }
  }

  async verifyActionIsVisible(text: string): Promise<void> {
    const actionLocator = this.action(text);
    const count = await actionLocator.count();

    for (let i = 0; i < count; ++i) {
      await expect(actionLocator.nth(i)).toBeVisible();
    }
  }
}
