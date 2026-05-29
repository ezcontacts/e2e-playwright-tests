import path from "path";

import {
  expect,
  Locator,
  Page
} from "@playwright/test";

import { ENDPOINT } from "../../../constant/endpoint";

import { BasePage } from "../../base/BasePage";

import { TableComponent } from "../../components/TableComponent";

import { handleDialogOnce } from "../../../helpers/dialog.helper";

import {InvalidExtensionMessages,
  OverstockMessages,
  OverstockStatus
} from "../../../helpers/overstock.messages";

export class AdminOverstockPage extends BasePage {

  private readonly OVERSTOCK_PAGE =
    "/products/list-over-stock-products";

  private readonly HISTORY_PAGE =
    "/products/list-over-stock-uploads";

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

  readonly overstockTable: TableComponent;
  readonly historyTable: TableComponent;

  readonly overstockModal: Locator;
  readonly overstockModalBackdrop: Locator;

  readonly overstockModalCloseBtn: Locator;
  readonly overstockModalCloseBtnAlt: Locator;

  constructor(
    page: Page,
    endpoint: string = ENDPOINT.adminPanel
  ) {

    super(page, endpoint);

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

    this.searchInput =
      page.locator(
        'input[type="search"][aria-controls="shTableOver"]'
      );

    this.overstockTableRoot =
      page.locator("#shTableOver");

    this.historyTableRoot =
      page.locator("table");

    this.viewDetailsBtn =
      page.locator('a:has-text("View Details")');

    this.gritterMessage =
      page.locator(".gritter-item .gritter-title");

    this.uploadDetailsMessage =
      page.locator("table tbody tr td strong");

    this.detailsTable =
      page.locator("table");

    this.overstockTable =
      new TableComponent(this.overstockTableRoot);

    this.historyTable = new TableComponent(this.historyTableRoot);

    this.overstockModal = page.locator('#overStockProductModalId');  

    this.overstockModalBackdrop = page.locator('.modal-backdrop');

    this.overstockModalCloseBtn = this.overstockModal.locator('button[data-dismiss="modal"]');

    this.overstockModalCloseBtnAlt = this.overstockModal.locator('button.close, button:has-text("Close"), button.btn.btn-default');

  }

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

  async refresh(): Promise<void> {
    if (await this.overstockModal.isVisible().catch(() => false)) {
      await this.closeOverstockModal();
    }

    await this.page.reload({ waitUntil: "domcontentloaded" });
  }

  async waitForGrid(): Promise<void> {

    await expect(this.searchInput).toBeVisible();
  }

  async openUploadSection(): Promise<void> {
    await this.waitForOverstockUIReady(); 

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
    await this.waitForOverstockModalToClose(); 

    await this.forceRecoverUI();

    await this.openUploadSection();

    await this.selectOverstockOption();

    await this.uploadFile(fileName);

    await this.clickProcessButton();

    const modal = this.overstockModal;

    try {
      await expect(modal).toBeVisible({ timeout: 5000 });

      await this.closeOverstockModal();

    } catch {
    }
  }

  async searchProduct(productNumber: string): Promise<void> {
    if (!productNumber?.trim()) return;

    await this.searchInput.fill(productNumber);

    await this.searchInput.press("Enter"); 

    await expect(this.overstockTableRoot).toBeVisible();
  }

  async isProductVisible(productNumber: string): Promise<boolean> {
    const row = this.overstockTable.getRowByText(productNumber);

    try {
      await row.first().waitFor({ state: "visible", timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async getProductRowData(productNumber: string): Promise<string[]> {

    if (!productNumber?.trim()) {
      return [];
    }

    const row =
      this.overstockTable.getRowByText(productNumber);

    await expect(row).toBeVisible();

    return await row.locator("td").allTextContents();
  }

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
      return;
    }

    const checkbox = this.overstockTable.getCheckbox(row);

    await expect(checkbox).toBeVisible({ timeout: 10000 });

    await checkbox.check();

    await expect(checkbox).toBeChecked();

    this.page.once("dialog", async dialog => {
      await dialog.accept();
    });

    await expect(this.removeBtn).toBeEnabled();

    await this.removeBtn.click();

    const toast = await this.getToastMessage();

    expect(toast).toContain(OverstockMessages[OverstockStatus.REMOVED]);

    await this.refresh();
  }

  async getToastMessage(): Promise<string> {

    const toast = this.gritterMessage.first();

    try {
      await toast.waitFor({ state: "visible", timeout: 8000 });
      return (await toast.textContent())?.trim() ?? "";
    } catch {
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

  async openLatestUploadDetails(): Promise<void> {

    const firstRow =
      this.historyTableRoot
        .locator("tbody tr")
        .first();

    await firstRow
      .locator(this.viewDetailsBtn)
      .click();
  }

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

  async isFileAttached(): Promise<boolean> {

    const fileValue =
      await this.fileInput.inputValue();

    return fileValue.length > 0;
  }

  async closeOverstockModal(): Promise<void> {
    const modal = this.overstockModal;

    try {
      const closeBtn = this.overstockModalCloseBtn;

      await expect(closeBtn).toBeVisible({ timeout: 5000 });

      await closeBtn.click();

      await this.waitForOverstockUIReady();

    } catch (err) {
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

  async validateInvalidExtensionPopup(popupMessage: string): Promise<void> {
    await expect(this.overstockModal).toBeVisible({ timeout: 10000 });

    expect(
      InvalidExtensionMessages.some(msg =>
        popupMessage.includes(msg)
      )
    ).toBeTruthy();

  
    await this.closeOverstockModal();

    await this.forceRecoverUI();

    await this.waitForOverstockModalToClose();
  }

  async uploadOverstockFile(
    fileName: string,
    context: {
      isInvalidExtensionScenario: boolean;
      invalidExtensionPopupMessage: string;
    }
  ): Promise<void> {

    const fileExtension =
      fileName.split(".").pop()?.toLowerCase();

    context.isInvalidExtensionScenario =
      fileExtension !== "csv";

    if (context.isInvalidExtensionScenario) {

      const dialogPromise = handleDialogOnce(
        this.page,
        (msg: string) => {
          context.invalidExtensionPopupMessage = msg;
        }
      );

      await this.processOverstockFile(fileName);

      context.invalidExtensionPopupMessage =
        await dialogPromise;

      return;
    }

    await this.processOverstockFile(fileName);
  }

  async waitForOverstockModalToClose(): Promise<void> {
    const modal = this.overstockModal;
    const backdrop = this.overstockModalBackdrop;

  
    try {
      await expect(modal).toBeHidden({ timeout: 15000 });
    } catch {
    }

    await expect(this.uploadToggleBtn).toBeVisible({ timeout: 15000 });
    await expect(this.uploadToggleBtn).toBeEnabled({ timeout: 15000 });

    const count = await backdrop.count();
    if (count > 0) {
      return;
    }
  }

  async waitForOverstockUIReady(): Promise<void> {
    const modal = this.overstockModal;

    await expect(modal).toBeHidden({ timeout: 15000 }).catch(() => {
    });

    await expect(this.uploadToggleBtn).toBeVisible({ timeout: 15000 });
    await expect(this.uploadToggleBtn).toBeEnabled({ timeout: 15000 });
  }

  async forceRecoverUI(): Promise<void> {
    await this.page.keyboard.press("Escape");

    await this.waitForOverstockUIReady();
  }
}
