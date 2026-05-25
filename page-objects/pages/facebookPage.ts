import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class FacebookPage extends BasePage {
  readonly loginField: Locator;
  readonly passwordField: Locator;
  readonly loginBtn: Locator;

  readonly continueBtn: Locator;
  readonly cancelBtn: Locator;

  constructor(page: Page) {
    super(page, "");

    this.loginField = this.locator('input[name="email"]');
    this.passwordField = this.locator('input[name="pass"]');
    this.loginBtn = this.locator('[aria-label][role="button"]:not(.x1t137rt)');

    this.continueBtn = this.locator('[role="button"] .xtvsq51').locator("..");

    this.cancelBtn = this.locator('[role="button"] .x1qhmfi1').locator("..");
  }

  async open(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async login(): Promise<void> {
    await this.loginField.fill(process.env.FACEBOOK_EMAIL!);
    await this.passwordField.fill(process.env.FACEBOOK_PASSWORD!);

    await this.loginBtn.click();
  }

  async clickContinue(): Promise<void> {
    await this.continueBtn.click();
  }

  async clickCancel(): Promise<void> {
    await this.cancelBtn.click();
  }
}
