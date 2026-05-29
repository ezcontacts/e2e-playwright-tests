import { Locator } from "@playwright/test";

export class TableComponent {

  constructor(private readonly table: Locator) {}

  getRowByText(text: string): Locator {

    if (!text?.trim()) {
      throw new Error("❌ TableComponent: empty text passed to getRowByText");
    }

    return this.table.locator(`tbody tr:has(td:has-text("${text}"))`);
  }

  getCell(row: Locator, columnIndex: number): Locator {

    return row.locator("td").nth(columnIndex);
  }

  getCheckbox(row: Locator): Locator {

    return row.locator('input.product_select_checkbox').first();
  }

  async rowExists(text: string): Promise<boolean> {

    if (!text?.trim()) return false;

    return await this.getRowByText(text).first().isVisible().catch(() => false);
  }
}