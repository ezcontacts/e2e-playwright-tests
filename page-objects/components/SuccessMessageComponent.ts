import { expect, Locator, Page } from "@playwright/test";
import { BaseComponent } from "../base/BaseComponent";

export class MessageComponent extends BaseComponent {
  readonly confirmationMessage: Locator;

  constructor(page: Page, root: string = "") {
    super(page, root);

    this.confirmationMessage = this.locator(".container > .success-msg");
  }

  async verifyConfirmationMessage(value: string): Promise<void> {
    await expect(this.confirmationMessage).toHaveText(value);
  }
}
