import { Locator, Page } from "@playwright/test";
import { ENDPOINT } from "../../../constant/endpoint";
import { BasePage } from "../../base/BasePage";
import { expect } from "../../../test/fixtures/fixture";

export class AdminProductPage extends BasePage {
  readonly color: (colorName: string) => Locator;

  constructor(page: Page, endpoint: string = ENDPOINT.adminPanel) {
    super(page, endpoint);

    this.color = (colorName: string) => this.locator(`[style*="${colorName}"]`);
  }

  override async open(productEndpoint?: string): Promise<void> {
    const endpoint = productEndpoint ?? "";

    const url = `${this.endpoint}/products/eyeglasses/edit/${endpoint}`;
    await this.openByEndpoint(url);
  }

  async verifyExistColors(colors: string[]): Promise<void> {
    await this.waitForDomContentLoad();
    for (const color of colors) {
      const colorLocator = this.color(color);
      const count = await colorLocator.count();
      await expect(count, `Color not found: ${color}`).toBeGreaterThan(0);
    }
  }
}
