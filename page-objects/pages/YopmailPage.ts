import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class YopmailPage extends BasePage {
  readonly url = "https://yopmail.com/en/";

  readonly linkBtn: Locator;
  readonly loginField: Locator;
  readonly refreshBtn: Locator;

  constructor(page: Page) {
    super(page, "");

    this.linkBtn = this.page.locator("#ifmail");
    this.loginField = this.page.locator("#login");
    this.refreshBtn = this.page.locator("div[id='refreshbut']");
  }

  async open(): Promise<void> {
    await this.page.goto(this.url, {
      timeout: 30000,
    });

    await this.waitForDomContentLoad();
  }

  async verifyEmailIsExist(): Promise<void> {
    await expect(this.linkBtn).toBeVisible();
  }

  async clickOnLinkBtn(): Promise<void> {
    await this.linkBtn.click();
  }

  async clickOnRefreshBtn(): Promise<void> {
    await this.refreshBtn.click();
  }

  async fillLogin(value: string): Promise<void> {
    await this.loginField.waitFor();
    await this.loginField.click();
    await this.loginField.fill(value);
  }
}
