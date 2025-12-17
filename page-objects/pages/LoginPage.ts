import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { ENDPOINT } from "../../constant/endpoint";
import { MessageComponent } from "../components/SuccessMessageComponent";

export class LoginPage extends BasePage {
  readonly emailField: Locator;
  readonly sendLinkBtn: Locator;

  readonly providers:{
    googleBtn: Locator;
    magicLinkBtn: Locator;
  }
  readonly providerBtn: (provider: string) => Locator;

  readonly message: MessageComponent;

  constructor(page: Page) {
    super(page, ENDPOINT.login);

    this.emailField = this.locator(
      'input[placeholder*="email"]',
      "#contact-input"
    );
    this.sendLinkBtn = this.locator("input[id='send-reset-link-button']");

    this.providerBtn = (provider: string) =>
      this.page.locator("a.btn.social-login-btn", {
        hasText: new RegExp(provider, "i"),
      });

    this.providers = {
      googleBtn: this.locator(".google-img"),
      magicLinkBtn: this.locator("a#login-with-link-email"),
    }

    this.message = new MessageComponent(this.page);
  }

  async clickOnMagicLinkBtn(): Promise<void> {
    await this.providers.magicLinkBtn.click();
  }

  async clickOnSendLinkBtn(): Promise<void> {
    await this.sendLinkBtn.click();
  }

  async clickOnGoogleLoginBtn(): Promise<void> {
    await this.providers.googleBtn.click();
  }

  async fillEmail(value: string): Promise<void> {
    await this.emailField.waitFor();
    await this.emailField.click();
    await this.emailField.fill(value);
  }

  async verifySingInMethodIsVisible(provider: string): Promise<void> {
    const btn = await this.providerBtn(provider);
    await expect(btn).toBeVisible();
  }
}
