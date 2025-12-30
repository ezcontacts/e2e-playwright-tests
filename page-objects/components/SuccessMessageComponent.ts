import { expect, Locator, Page } from "@playwright/test";
import { BaseComponent } from "../base/BaseComponent";

export class MessageComponent extends BaseComponent {
  readonly confirmationMessage: Locator;

  constructor(page: Page, root: string = "") {
    super(page, root);

    this.confirmationMessage = this.locator(".container > .success-msg");
  }

  async verifyConfirmationMessage(expected: string): Promise<void> {
    const msgLocator = this.confirmationMessage.filter({ hasText: expected });
    await expect(msgLocator).toBeVisible({ timeout: 60000 });
    await expect(msgLocator).toContainText(expected);
  }
}
