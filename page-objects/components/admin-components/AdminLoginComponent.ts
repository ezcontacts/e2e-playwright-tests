import { Page, Locator } from "@playwright/test";
import { BaseComponent } from "../../base/BaseComponent";

export class AdminLoginComponent extends BaseComponent {
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly signInBtn: Locator;

  constructor(page: Page, root: string = ".panel-body") {
    super(page, root);

    this.emailField = this.within("#UserEmail");
    this.passwordField = this.within("#UserPassword");
    this.signInBtn = this.within(".btn-success");
  }

  async enterValidEmail(): Promise<void> {
    const email = process.env.ADMIN_EMAIL;

    if (!email) {
      throw new Error("ENV variable ADMIN_EMAIL is not defined");
    }

    await this.emailField.fill(email);
  }

  async enterValidPassword(): Promise<void> {
    const password = process.env.ADMIN_PASSWORD;

    if (!password) {
      throw new Error("ENV variable ADMIN_PASSWORD is not defined");
    }

    await this.passwordField.fill(password);
  }

  async clickOnSignInBtn(): Promise<void> {
    await this.signInBtn.click();
  }
}
