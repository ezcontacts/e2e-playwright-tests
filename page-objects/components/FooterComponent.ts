import { expect, Locator, Page } from "@playwright/test";
import { BaseComponent } from "../base/BaseComponent";

export class FooterComponent extends BaseComponent {
  readonly privacyPolicyLink: Locator;
  readonly termsOfServiceLink: Locator;

  readonly sectionHeader: (section: string) => Locator;
  readonly link: (name: string) => Locator;

  constructor(page: Page, root: string = "#main-footer") {
    super(page, root);

    this.privacyPolicyLink = this.within(".cstm-privacy");
    this.termsOfServiceLink = this.within(".cstm-terms");

    this.sectionHeader = (section) =>
      this.root.locator("h3", { hasText: section });

    this.link = (name: string) =>
      this.root.locator("a", {
        hasText: new RegExp(`^${name}$`, "i"),
      });
  }

  async verifyPrivatePolicyIsVisible(): Promise<void> {
    await expect(this.privacyPolicyLink).toBeVisible();
  }

  async verifyTermsOfServiceIsVisible(): Promise<void> {
    await expect(this.termsOfServiceLink).toBeVisible();
  }

  async verifySectionIsVisible(section: string): Promise<void> {
    const header = this.sectionHeader(section);
    await expect(header).toBeVisible();
  }

  async verifyLinkIsVisible(linkText: string): Promise<void> {
    const link = this.link(linkText);
    await expect(link).toBeVisible();
  }
}
