import { expect, Locator, Page } from "@playwright/test";
import { AccountPage } from "../AccountPage";
import { ENDPOINT } from "../../../constant/endpoint";

export class EzPointsPage extends AccountPage {
  readonly heading: Locator;
  readonly table: Locator;
  readonly column: (text: string) => Locator;

  constructor(page: Page) {
    super(page, ENDPOINT.eqPoints);

    this.heading = this.locator('.account-heading h2');
    this.table = this.locator('.table-responsive');
    this.column = (text: string) => this.locator(`.table-responsive th`).filter({ hasText: text });
  }

  async verifyHeadingText(expectedText: string): Promise<void> {
    await expect(this.heading).toHaveText(expectedText);

    console.log(await this.page.viewportSize());
console.log(await this.page.evaluate(() => navigator.userAgent));
  }

  async verifyTableIsVisible(): Promise<void> {
    await expect(this.table).toBeVisible();
  }

  async verifyColumnIsVisible(columnName: string): Promise<void> {
    const column = this.column(columnName);
    await expect(column).toBeVisible();
  }
}