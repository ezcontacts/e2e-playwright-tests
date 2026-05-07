import { expect, Locator, Page } from "@playwright/test";
import { ENDPOINT } from "../../../constant/endpoint";
import { AccountPage } from "../Account/AccountPage";

export class PdpRxOptionPage extends AccountPage {

  readonly RxStep2Section: Locator;
  readonly ManufacturerDisplayLenses: Locator;
  readonly AddtoCartButton: Locator;
  readonly AddRxbtn: Locator;

  constructor(page: Page) {
    super(page, ENDPOINT.eyeglasses);

    this.RxStep2Section = page.getByRole('heading', { name: '2. Lens Type' });
    this.ManufacturerDisplayLenses = page.locator('#AppProductPrescriptionType4');
    this.AddtoCartButton = page.locator('a').filter({ hasText: 'Add to Cart' }).first();
    this.AddRxbtn = page.locator(`//tr[td[contains(., 'Add RX')]]//a`);

  }

  async verifyRxSection(expectedText: string): Promise<void> {
    await expect(this.RxStep2Section).toHaveText(expectedText);
  }

  getSection(sectionName: string): Locator {
    return this.page.locator('#rxTypeDivEye').filter({
      hasText: sectionName,
    });
  }

  async verifyOptions(sectionName: string, options: string[]) {
    const section = this.getSection(sectionName);

    await expect(section).toBeVisible();

    for (const option of options) {
      const locator = section.getByText(option);

      await expect(
        locator,
        `Option "${option}" not visible under "${sectionName}"`
      ).toBeVisible();
    }
  }

    async getVisibleOptions(sectionName: string): Promise<string[]> {
    const section = this.getSection(sectionName);

    const optionElements = section.locator('label, li, button');
    const texts = await optionElements.allTextContents();
    
    return texts.map(text => text.trim()).filter(Boolean);
  }

  async clickAddToCart(): Promise<void> {
    await this.ManufacturerDisplayLenses.waitFor({ state: 'visible' });
    await this.ManufacturerDisplayLenses.click();

    await this.AddtoCartButton.waitFor({ state: 'visible' });
    await this.AddtoCartButton.click();
  }

  async clickAddRxButton(): Promise<void> {
    await this.AddRxbtn.waitFor({ state: 'visible' });
    await this.AddRxbtn.click();
  }
}