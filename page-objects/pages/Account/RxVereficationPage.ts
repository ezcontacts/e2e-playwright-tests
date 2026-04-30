import { expect, Locator, Page } from "@playwright/test";
import { AccountPage } from "./AccountPage";
import { ENDPOINT } from "../../../constant/endpoint";

export class RxVereficationPage extends AccountPage {
  readonly addNewPrescriptionBtn: Locator;
  readonly prescriptionText: Locator;

  constructor(page: Page) {
    super(page, ENDPOINT.ezPoints);

    this.addNewPrescriptionBtn = this.locator(".acc-edit");
    this.prescriptionText = this.locator(".acc-text");
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
}
