import { expect, Locator, Page } from "@playwright/test";
import { BaseComponent } from "../base/BaseComponent";

export class FooterComponent extends BaseComponent {
  readonly privacyPolicyLink: Locator;
  readonly termsOfServiceLink: Locator;

  constructor(page: Page, root: string = "#main-footer") {
    super(page, root);

    this.privacyPolicyLink = this.within(".cstm-privacy");
    this.termsOfServiceLink = this.within(".cstm-terms");
  }

  async verifyPrivatePolicyIsVisible(): Promise<void> {
    await expect(this.privacyPolicyLink).toBeVisible();
  }

  async verifyTermsOfServiceIsVisible(): Promise<void> {
    await expect(this.termsOfServiceLink).toBeVisible();
  }

  async verifySectionIsVisible(section: string): Promise<void> {
    const header = this.root.locator("h3", { hasText: section });
    await expect(header).toBeVisible();
  }

  async verifyLinkIsVisible(linkText: string): Promise<void> {
    const link = this.root.getByRole("link", {
      name: new RegExp(`^${linkText}$`, "i"),
    });
    await expect(link).toBeVisible();
  }
}
