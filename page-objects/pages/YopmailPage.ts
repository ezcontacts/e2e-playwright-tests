import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class YopmailPage extends BasePage {
  readonly url = "https://yopmail.com/en/";

  readonly linkButton: Locator;
  readonly loginField: Locator;
  readonly refreshButton: Locator;

  constructor(page: Page) {
    super(page, "");

    this.linkButton = page.locator("#ifmail");
    this.loginField = page.locator("#login");
    this.refreshButton = page.locator("div[id='refreshbut']");
  }

  async open() {
    await this.page.goto(this.url, {
      timeout: 30000,
    });

    await this.waitForDomContentLoad();
  }

  async verifyEmailIsExist(): Promise<void> {
    await expect(this.linkButton).toBeVisible();
  }

  async clickOnLinkButton(): Promise<void> {
    await this.linkButton.click();
  }

  async clickOnRefreshButtonButton(): Promise<void> {
    await this.refreshButton.click();
  }

  async fillLogin(value: string): Promise<void> {
    await this.loginField.waitFor();
    await this.loginField.click();
    await this.loginField.fill(value);
  }
}
