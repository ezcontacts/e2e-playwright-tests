import { expect, Locator, Page } from "@playwright/test";
import { AccountPage } from "./AccountPage";
import { ENDPOINT } from "../../../constant/endpoint";

export class EzPointsPage extends AccountPage {
  readonly table: Locator;
  readonly column: (text: string) => Locator;

  constructor(page: Page) {
    super(page, ENDPOINT.eqPoints);

    this.table = this.locator('.table-responsive');
    this.column = (text: string) => this.locator(`.table-responsive th`).filter({ hasText: text });
  }

  async verifyTableIsVisible(): Promise<void> {
    await expect(this.table).toBeVisible();
  }

  async verifyColumnIsVisible(columnName: string): Promise<void> {
    const column = this.column(columnName);
    await expect(column).toBeVisible();
  }
}