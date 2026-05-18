import path from "path";

import {
  expect,
  Locator,
  Page
} from "@playwright/test";

import { ENDPOINT } from "../../../constant/endpoint";

import { BasePage } from "../../base/BasePage";

import { TableComponent } from "../../components/TableComponent";

import {
  OverstockMessages,
  OverstockStatus
} from "../../../helpers/overstock.messages";

export class AdminOverstockPage extends BasePage {

  /* =====================================================
     URLS
  ===================================================== */

  private readonly OVERSTOCK_PAGE =
    "/products/list-over-stock-products";

  private readonly HISTORY_PAGE =
    "/products/list-over-stock-uploads";

  /* =====================================================
     LOCATORS
  ===================================================== */

  readonly uploadToggleBtn: Locator;
  readonly fileInput: Locator;
  readonly overstockDropdown: Locator;
  readonly processBtn: Locator;
  readonly removeBtn: Locator;

  readonly searchInput: Locator;

  readonly gritterMessage: Locator;
  readonly uploadDetailsMessage: Locator;

  readonly detailsTable: Locator;
  readonly viewDetailsBtn: Locator;

  readonly overstockTableRoot: Locator;
  readonly historyTableRoot: Locator;

  /* =====================================================
     COMPONENTS
  ===================================================== */

  readonly overstockTable: TableComponent;
  readonly historyTable: TableComponent;

  readonly overstockModalCloseBtn: Locator;

  /* =====================================================
     CONSTRUCTOR
  ===================================================== */

  constructor(
    page: Page,
    endpoint: string = ENDPOINT.adminPanel
  ) {

    super(page, endpoint);

    /* =====================
       Upload Section
    ===================== */

    this.uploadToggleBtn =
      page.locator("#uploadShowHideBtnId");

    this.fileInput =
      page.locator("#overStockProductFileInputId");

    this.overstockDropdown =
      page.locator("#overStockTypeFileInputId");

    this.processBtn =
      page.locator("#submitOverStockProductBtnId");

    this.removeBtn =
      page.locator("#changeOverStockBtnId");

    /* =====================
       Grid
    ===================== */

    this.searchInput =
      page.locator(
        'input[type="search"][aria-controls="shTableOver"]'
      );

    this.overstockTableRoot =
      page.locator("#shTableOver");

    /* =====================
       History
    ===================== */

    this.historyTableRoot =
      page.locator("table");

    this.viewDetailsBtn =
      page.locator('a:has-text("View Details")');

    /* =====================
       Messages
    ===================== */

    this.gritterMessage =
      page.locator(".gritter-item .gritter-title");

    this.uploadDetailsMessage =
      page.locator("table tbody tr td strong");

    /* =====================
       Details Table
    ===================== */

    this.detailsTable =
      page.locator("table");

    /* =====================
       Components
    ===================== */

    this.overstockTable =
      new TableComponent(this.overstockTableRoot);

    this.historyTable =
      new TableComponent(this.historyTableRoot);

    this.overstockModalCloseBtn =
    page.locator('#overStockProductModalId button[data-dismiss="modal"]');
  }

  /* =====================================================
     NAVIGATION
  ===================================================== */

  async open(): Promise<void> {

    await this.openByEndpoint(
      `${this.endpoint}${this.OVERSTOCK_PAGE}`
    );
  }

  async openUploadHistoryPage(): Promise<void> {

    await this.openByEndpoint(
      `${this.endpoint}${this.HISTORY_PAGE}`
    );
  }

  /* =====================================================
     COMMON METHODS
  ===================================================== */

  async refresh(): Promise<void> {

    await this.page.reload({
      waitUntil: "networkidle"
    });
  }

  async waitForGrid(): Promise<void> {

    await expect(this.searchInput).toBeVisible();
  }

  /* =====================================================
     UPLOAD FLOW
  ===================================================== */

  async openUploadSection(): Promise<void> {

    await this.uploadToggleBtn.click();
  }

  async selectOverstockOption(
    value = "on"
  ): Promise<void> {

    await this.overstockDropdown.selectOption(value);
  }

  async uploadFile(
    fileName: string
  ): Promise<void> {

    const filePath = path.resolve(
      "test/data-test/files",
      fileName
    );

    const [fileChooser] = await Promise.all([

      this.page.waitForEvent("filechooser"),

      this.fileInput.click()
    ]);

    await fileChooser.setFiles(filePath);
  }

  async clickProcessButton(): Promise<void> {

    await expect(this.processBtn).toBeEnabled();

    await this.processBtn.click();
  }

  async processOverstockFile(fileName: string): Promise<void> {

    await this.openUploadSection();

    await this.selectOverstockOption();

    await this.uploadFile(fileName);

    await this.clickProcessButton();

    // ✅ WAIT FOR MODAL FIRST (IMPORTANT FIX)
    const modal = this.page.locator('#overStockProductModalId');

    try {
      await modal.waitFor({ state: 'visible', timeout: 5000 });

      await this.closeOverstockModal();

      await modal.waitFor({ state: 'hidden', timeout: 5000 });

    } catch {
      console.log("⚠️ No modal appeared after upload");
    }
  }

  /* =====================================================
     GRID METHODS
  ===================================================== */

  async searchProduct(productNumber: string): Promise<void> {

    if (!productNumber?.trim()) {
      console.log("⚠️ search skipped: empty productNumber");
      return;
    }

    await this.searchInput.fill(productNumber);
  }

  async isProductVisible(
    productNumber: string
  ): Promise<boolean> {

    return await this.overstockTable.rowExists(
      productNumber
    );
  }

  async getProductRowData(productNumber: string): Promise<string[]> {

    if (!productNumber?.trim()) {
      console.log("⚠️ Skipping grid lookup due to invalid/modified header file");
      return [];
    }

    const row =
      this.overstockTable.getRowByText(productNumber);

    await expect(row).toBeVisible();

    return await row.locator("td").allTextContents();
  }

  /* =====================================================
     REMOVE OVERSTOCK FLOW
  ===================================================== */

  async removeOverstockProduct(productNumber: string): Promise<void> {

    await this.open();
    await this.waitForGrid();

    if (!productNumber?.trim()) {
      throw new Error("❌ Cannot remove product: productNumber is empty");
    }

    await this.searchProduct(productNumber);

    const row = this.overstockTable.getRowByText(productNumber);

    const rowCount = await row.count();

    if (rowCount === 0) {
      console.log(`⚠️ Product already removed: ${productNumber}`);
      return;
    }

    const checkbox = this.overstockTable.getCheckbox(row);

    await expect(checkbox).toBeVisible({ timeout: 10000 });

    await checkbox.check();

    await expect(checkbox).toBeChecked();

    this.page.once("dialog", async dialog => {
      console.log("REMOVE POPUP:", dialog.message());
      await dialog.accept();
    });

    await expect(this.removeBtn).toBeEnabled();

    await this.removeBtn.click();

    const toast = await this.getToastMessage();

    console.log("REMOVE TOAST:", toast);

    expect(toast).toContain(OverstockMessages[OverstockStatus.REMOVED]);

    await this.refresh();
  }

  /* =====================================================
     TOAST MESSAGE METHODS
  ===================================================== */

  async getToastMessage(): Promise<string> {

    const toast = this.gritterMessage.first();

    try {
      await toast.waitFor({ state: "visible", timeout: 8000 });
      return (await toast.textContent())?.trim() ?? "";
    } catch {
      console.log("⚠️ Toast not found");
      return "";
    }
  }

  async validateToastMessage(
    expectedMessage: string
  ): Promise<void> {

    const actualMessage =
      await this.getToastMessage();

    expect(actualMessage)
      .toContain(expectedMessage);
  }

  /* =====================================================
     HISTORY PAGE METHODS
  ===================================================== */

  async openLatestUploadDetails(): Promise<void> {

    const firstRow =
      this.historyTableRoot
        .locator("tbody tr")
        .first();

    await firstRow
      .locator(this.viewDetailsBtn)
      .click();
  }

  /* =====================================================
     DETAILS PAGE METHODS
  ===================================================== */

  getDetailCell(
    row: number,
    column: number
  ): Locator {

    return this.page.locator(
      `table tbody tr:nth-child(${row}) td:nth-child(${column})`
    );
  }

  async getDetailCellText(
    row: number,
    column: number
  ): Promise<string> {

    const cell =
      this.getDetailCell(row, column);

    await expect(cell).toBeVisible();

    return (
      await cell.textContent()
    )?.trim() ?? "";
  }

  async getUploadStatusMessage(): Promise<string> {

    const message =
      this.uploadDetailsMessage.last();

    await expect(message).toBeVisible({
      timeout: 20000
    });

    return (
      await message.textContent()
    )?.trim() ?? "";
  }

  async validateUploadStatuses(
    expectedStatuses: OverstockStatus[]
  ): Promise<void> {

    const actualMessage =
      await this.getUploadStatusMessage();

    const expectedMessages =
      expectedStatuses.map(
        status => OverstockMessages[status]
      );

    expect(
      expectedMessages.some(message =>
        actualMessage.includes(message)
      )
    ).toBeTruthy();
  }

  /* =====================================================
     FILE VALIDATION
  ===================================================== */

  async isFileAttached(): Promise<boolean> {

    const fileValue =
      await this.fileInput.inputValue();

    return fileValue.length > 0;
  }

  async closeOverstockModal(): Promise<void> {
    try {
      await this.overstockModalCloseBtn.waitFor({ state: 'visible', timeout: 5000 });
      await this.overstockModalCloseBtn.click();
      await this.overstockModalCloseBtn.waitFor({ state: 'hidden', timeout: 5000 });
    } catch (err) {
      console.log("⚠️ Modal close button not found or already closed");
    }
  }

  async validateAlertPopup(
    expectedMessage: string
  ): Promise<void> {

    this.page.once("dialog", async dialog => {

      const actualMessage =
        dialog.message();

      expect(actualMessage)
        .toContain(expectedMessage);

      await dialog.accept();
    });
  }
}