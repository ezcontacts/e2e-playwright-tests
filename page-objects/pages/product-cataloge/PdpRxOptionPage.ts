import { expect, Locator, Page } from "@playwright/test";
import { ENDPOINT } from "../../../constant/endpoint";
import { AccountPage } from "../Account/AccountPage";
import { RxPageType } from "../../../test/data-test/productTypes";

export class PdpRxOptionPage extends AccountPage {

  readonly RxStep2Section: Locator;
  readonly ManufacturerDisplayLenses: Locator;
  readonly AddtoCartButton: Locator;
  readonly AddRxbtn: Locator;

  constructor(page: Page) {
    super(page, ENDPOINT.eyeglasses);

    this.RxStep2Section = page.getByRole('heading', { name: '2. Lens Type' });
    this.ManufacturerDisplayLenses = page.locator('#AppProductPrescriptionType4');
    this.AddtoCartButton = page.locator('a').filter({ hasText: 'Add to Cart' }).first(); //pdp page
    this.AddRxbtn = page.getByRole('link', { name: 'Add Rx' }) //cart page - add rx button

  }

  async verifyRxSection(expectedText: string): Promise<void> {
    await expect(this.RxStep2Section).toHaveText(expectedText);
  }

  getSection(
    pageType: RxPageType,
    sectionName: string
  ): Locator {

    switch (pageType) {
      case RxPageType.PDP:
        return this.page.locator('#rxTypeDivEye').filter({
            hasText: sectionName,
          });

      case RxPageType.CART:
        return this.page.locator('#cartPageRxModaliFrame').contentFrame().locator('div')
          .filter({
            hasText: sectionName,
          })
          .nth(2);

      default:
        throw new Error(`Unsupported page type: ${pageType}`);
    }
  }

async verifyOptions(pageType: RxPageType,sectionName: string,options: string[]) {

    const section = this.getSection(pageType, sectionName);

    await expect(section).toBeVisible();

    for (const option of options) {

      const locator = section.getByText(option);

      await expect(
        locator,
        `Option "${option}" not visible under "${sectionName}"`
      ).toBeVisible();
    }
  }

  async getVisibleOptions(
    pageType: RxPageType,
    sectionName: string
  ): Promise<string[]> {

    const section = this.getSection(pageType, sectionName);

    const texts = await section
      .locator('label, li, button')
      .allTextContents();

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

