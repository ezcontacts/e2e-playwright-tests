import { Page, Locator } from "@playwright/test";
import { AdminContentPanelComponent } from "./AdminContentPanelComponent";
import { expect } from "../../../test/fixtures/fixture";

export class SearchOrderComponent extends AdminContentPanelComponent{
  readonly searchField: Locator;
  readonly dataTableRowOrderId: (number: string) => Locator;

  constructor(page: Page, ) {
    super(page);

    this.searchField = this.within("#autoSearchComplete");
    this.dataTableRowOrderId = (number: string) => this.within(".table td a").filter({ hasText: number });
  }

  async enterSearchField(text: string): Promise<void> {
    await this.searchField.fill(text);
    await this.searchField.press('Enter');
  }

  async clickRowInDataTable(text: string): Promise<void> {
    const row = this.dataTableRowOrderId(text);
    await row.click();
  }

  async verifyExistRowInDataTable(text: string): Promise<void> {
    const row = this.dataTableRowOrderId(text);
    await expect(row).toBeVisible();
  }
}
