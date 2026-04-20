import { Locator, Page } from "@playwright/test";
import { AccountPage } from "./AccountPage";
import { expect } from "../../../test/fixtures/fixture";

export class AccountOrderPage extends AccountPage {
  readonly orderDetailsBtn: (index: number) => Locator;
  readonly miniOrderDetailsRow: (name: string) => Locator;

  constructor(page: Page) {
    super(page);

    this.orderDetailsBtn = (index: number) =>
      this.locator(".order-detail-lnk").nth(index);

    this.miniOrderDetailsRow = (name: string) =>
      this.page
        .locator(".mini-order .row", {
          has: this.page
            .locator(".no-container-padding")
            .filter({ hasText: name }),
        })
        .locator(".no-container-padding1");
  }

  async clickOnFirstOrderDetails(): Promise<void> {
    await this.orderDetailsBtn(0).click();
    await this.waitForDomContentLoad();
  }

  async miniOrderRow(name: string): Promise<void> {
    const row = this.miniOrderDetailsRow(name);
    await expect(row).not.toBeEmpty();
  }
}
