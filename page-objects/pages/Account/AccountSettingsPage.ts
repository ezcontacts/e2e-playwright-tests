import { expect, Locator, Page } from "@playwright/test";
import { AccountPage } from "./AccountPage";

export class AccountSettingsPage extends AccountPage {
  readonly fieldName: Locator;
  readonly fieldValue: Locator;
  readonly editLink: Locator;
  readonly selectionName: Locator;
  readonly cancelBtn: Locator;
  readonly saveChangesBtn: Locator;

  readonly column: (text: string) => Locator;

  constructor(page: Page) {
    super(page);

    this.fieldName = this.locator('.acc-field');
    this.fieldValue = this.locator('.acc-field-val');
    this.editLink = this.locator('.acc-edit a');
    this.selectionName = this.locator('h2');
    this.cancelBtn = this.locator('.cancel');
    this.saveChangesBtn = this.locator('.pull-right .btn');
    this.column = (text: string) => this.locator(`.table-responsive th`).filter({ hasText: text });
  }

  async verifyFieldIsVisible(text: string): Promise<void> {
    const field = this.fieldName.filter({
      hasText: new RegExp(`^${text}$`)
    });

    await expect(field).toHaveCount(1);
    await expect(field).toBeVisible();
  }

  async verifySelectionIsVisible(text: string): Promise<void> {
    const selection = this.selectionName.filter({
      hasText: new RegExp(`^${text}$`)
    });

    await expect(selection).toHaveCount(1);
    await expect(selection).toBeVisible();
  }

  async verifyFieldValueIsVisible(): Promise<void> {
    const count = await this.fieldValue.count();

    for (let i = 0; i < count; ++i) {
      await expect(this.fieldValue.nth(i)).not.toHaveText('');
    }
  }

  async verifyEditLinkIsVisible(): Promise<void> {
    await expect(this.editLink).toBeVisible();
  }

  async verifyColumnIsVisible(columnName: string): Promise<void> {
    const column = this.column(columnName);
    await expect(column).toBeVisible();
  }

  async verifyCancelBtnIsVisible(): Promise<void> {
    await expect(this.cancelBtn).toBeVisible();
  }

  async verifySaveChangesBtnIsVisible(): Promise<void> {
    await expect(this.saveChangesBtn).toBeVisible();
  }

  async clickOnEditLink(): Promise<void> {
    await this.editLink.click();
    await this.waitForDomContentLoad();
  }
}