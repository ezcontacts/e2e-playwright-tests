import { expect, Locator, Page } from "@playwright/test";
import { BaseComponent } from "../base/BaseComponent";

export class FooterComponent extends BaseComponent {
  readonly privacyPolicyLink: Locator;
  readonly termsOfServiceLink: Locator;
  readonly questionContactUs: Locator;

  readonly contactUsTitle: (title: string) => Locator;
  readonly contactUsIcon: (icon: string) => Locator;
  readonly contactUsTitleLink: (title: string) => Locator;

  readonly sectionHeader: (section: string) => Locator;
  readonly link: (name: string) => Locator;

  constructor(page: Page, root: string = "#main-footer") {
    super(page, root);

    this.privacyPolicyLink = this.within(".cstm-privacy");
    this.termsOfServiceLink = this.within(".cstm-terms");
    this.questionContactUs = this.within(".contact-us-section p");

    this.contactUsTitle = (title: string) =>
      this.within('.contact-us-list a').filter({ hasText: title });

    this.contactUsIcon = (title: string) =>
      this.contactUsTitle(title).locator('span');

    this.sectionHeader = (section) =>
      this.root.locator("h3", { hasText: section });

    this.link = (name: string) =>
      this.root.locator("a", {
        hasText: new RegExp(`^${name}$`, "i"),
      });

      this.page.getAttribute
  }

  async verifyPrivatePolicyIsVisible(): Promise<void> {
    await expect(this.privacyPolicyLink).toBeVisible();
  }

  async verifyTermsOfServiceIsVisible(): Promise<void> {
    await expect(this.termsOfServiceLink).toBeVisible();
  }

  async verifySectionIsVisible(section: string): Promise<void> {
    const header = this.sectionHeader(section);
    await header.scrollIntoViewIfNeeded();
    await expect(header).toBeVisible();

    if(this.isMobile()){
      await header.click();
    }
  }

  async verifyLinkIsVisible(linkText: string): Promise<void> {
    const link = this.link(linkText);
    await expect(link).toBeVisible();
  }

  async verifyQuestionContactUs(text: string): Promise<void>{
    const question = await this.questionContactUs.innerText();
    await expect(question).toBe(text);
  }

  async verifyContactUsLinkTitle(title: string): Promise<void>{
    const link = await this.contactUsTitle(title);
    await expect(link).toBeVisible();
  }

  async verifyContactUsIcon(title: string, cssClass: string): Promise<void>{
    const icon = await this.contactUsIcon(title);
    await expect(icon).toHaveClass(new RegExp(`\\b${cssClass}\\b`));
  }

  async verifyContactUsLink(title: string, linkText: string): Promise<void>{
    const link = await this.contactUsTitle(title);
    await expect(link).toHaveAttribute('href',new RegExp(linkText));
  }

  async clickOnContactUsIcon(title: string): Promise<void>{
    const icon = await this.contactUsIcon(title);
    await icon.click();
  }

  async clickOnSection(section: string): Promise<void> {
    const header = this.sectionHeader(section);
    await header.scrollIntoViewIfNeeded();

    if(this.isMobile()){
      await header.click();
    }
  }
}
