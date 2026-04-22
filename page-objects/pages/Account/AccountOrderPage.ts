import { Locator, Page } from "@playwright/test";
import { AccountPage } from "./AccountPage";
import { expect } from "../../../test/fixtures/fixture";

export class AccountOrderPage extends AccountPage {
  readonly orderDetailsBtn: (index: number) => Locator;
  readonly miniOrderDetailsRow: (name: string) => Locator;
  readonly paymantContent: (name: string) => Locator;
  readonly orderDetails: (name: string) => Locator;
  readonly tableWithText: (title: string, linkName: string) => Locator;
  readonly orderStatus: (name: string) => Locator;
  readonly paymentTitle: Locator;
  readonly invoicePDFLink: Locator;
  readonly trackPackageLink: Locator;
  readonly returnBtn: Locator;
  readonly orderTitle: Locator;
  readonly orderDetailsSection: Locator;

  constructor(page: Page) {
    super(page);

    this.orderDetailsBtn = (index: number) =>
      this.locator(".order-detail-lnk a").nth(index);

    this.miniOrderDetailsRow = (name: string) =>
      this.page
        .locator(".mini-order .row", {
          has: this.page
            .locator(".no-container-padding")
            .filter({ hasText: name }),
        })
        .locator(".no-container-padding1");

    this.paymantContent = (name: string) =>
      this.page.locator("p", { hasText: name }).locator("+ .list-unstyled li");

    this.orderDetails = (name: string) =>
      this.page
        .locator(".col-1", { hasText: name })
        .first()
        .locator(" + .col-2");

    this.tableWithText = (title: string, link: string) =>
      this.page
        .locator(".list-unstyled")
        .filter({ hasText: title })
        .locator("a")
        .filter({ hasText: link });

    this.orderStatus = (name: string) =>
      this.locator(".order-stage-text").filter({ hasText: name });

    this.paymentTitle = this.locator(".text-x");
    this.invoicePDFLink = this.locator(".highlight-thead a");
    this.trackPackageLink = this.locator(".list-unstyled div a");
    this.returnBtn = this.locator(".return-btn-black");
    this.orderTitle = this.locator(".order-status-title-text");
    this.orderDetailsSection = this.locator(".account-order-detail");
  }

  async clickOnFirstOrderDetails(): Promise<string> {
    const btn = this.orderDetailsBtn(0);

    const href = await btn.getAttribute("href");
    const match = href?.match(/order-detail\/(\d+)/);
    const orderId = match?.[1];

    await btn.click();
    await this.waitForDomContentLoad();

    return orderId!;
  }

  async miniOrderRow(name: string): Promise<void> {
    const row = this.miniOrderDetailsRow(name);
    await expect(row).not.toBeEmpty();
  }

  async verifyPaymentTitle(): Promise<void> {
    await expect(this.paymentTitle).toBeVisible();
  }

  async verifyInvoicePDFLink(): Promise<void> {
    await expect(this.invoicePDFLink).toBeVisible();
  }

  async verifyPaymantContent(name: string): Promise<void> {
    const row = this.paymantContent(name);
    const count = await row.count();
    await expect(count).toBeGreaterThan(0);
  }

  async verifyOrderPaymantContent(name: string): Promise<void> {
    const row = this.orderDetails(name);
    const count = await row.count();
    await expect(count).toBeGreaterThan(0);
  }

  async verifyTrackPackageLinkIsVisible(): Promise<void> {
    await expect(this.trackPackageLink).toBeVisible();
  }

  async verifyServiceLink(service: string, link: string): Promise<void> {
    await expect(this.tableWithText(service, link)).toBeVisible();
  }

  async verifyReturnBtn(name: string): Promise<void> {
    await expect(this.returnBtn).toHaveText(name);
  }

  async verifyOrderTitle(name: string): Promise<void> {
    await expect(this.orderTitle).toHaveText(name);
  }

  async verifyOrderStatus(name: string): Promise<void> {
    await expect(this.orderStatus(name)).toBeVisible();
  }

  async verifyOrderDetailsIsVisible(): Promise<void> {
    await expect(this.orderDetailsSection).toBeVisible();
  }
}
