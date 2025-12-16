import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { ENDPOINT } from "../../constant/endpoint";

export class LoginPage extends BasePage {
  readonly magicLinkButton: Locator;
  readonly emailField: Locator;
  readonly sendLinkButton: Locator;

  readonly providerButton: (provider: string) => Locator;

  constructor(page: Page) {
    super(page, ENDPOINT.login);

    this.magicLinkButton = page.locator("a[id='login-with-link-email']");
    this.emailField = page.locator('input[placeholder*="email"]');
    this.sendLinkButton = page.locator("input[id='send-reset-link-button']");

    this.providerButton = (provider: string) =>
      this.page.locator("a.btn.social-login-btn", {
        hasText: new RegExp(provider, "i"),
      });
  }

  async clickOnMagicLinkButton(): Promise<void> {
    await this.magicLinkButton.click();
  }

  async clickOnSendLinkButton(): Promise<void> {
    await this.sendLinkButton.click();
  }

  async fillEmail(value: string): Promise<void> {
    await this.emailField.waitFor();
    await this.emailField.click();
    await this.emailField.fill(value);
  }

  async verifySingInMethodIsVisible(provider: string) {
    const btn = await this.providerButton(provider);
    await expect(btn).toBeVisible();
  }
}
