import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { ENDPOINT } from "../../constant/endpoint";
import { MessageComponent } from "../components/SuccessMessageComponent";

export class ContactUsPage extends BasePage {
  readonly topic: {
    link: (provider: string) => Locator;
    dropdown: Locator;
    option: Locator;
  };

  readonly submitBtn: Locator;
  readonly errorModal: Locator;
  readonly errorModalText: Locator;
  readonly errorModalCloseButton: Locator;

  readonly contactEmailField: Locator;
  readonly contactNameField: Locator;
  readonly contactMessageField: Locator;
  readonly errorEmailModalHeader: Locator;

  readonly message: MessageComponent;

  constructor(page: Page) {
    super(page, ENDPOINT.contactUs);

    this.topic = {
      dropdown: this.locator("#ContactTopic"),
      option: this.locator('[id^="ContactTopic"] option'),
      link: (provider: string) =>
        this.page.locator(".lnk-red", {
          hasText: provider,
        }),
    };

    this.submitBtn = this.locator('#ContactFormSubmitButton');
    this.errorModalText = this.locator("#jsShowErrorModalText");
    this.errorModalCloseButton = this.locator("#jsShowErrorModalCloseButton");
    this.contactEmailField = this.locator("#ContactEmail");
    this.contactNameField = this.locator("#ContactName");
    this.contactMessageField = this.locator("#ContactMessage");
    this.errorEmailModalHeader = this.locator(".reset-modal h4");
    this.message = new MessageComponent(this.page);
  }

  async clickOnTopic(topic: string): Promise<void> {
    const link = await this.topic.link(topic);
    await link.scrollIntoViewIfNeeded();
    await link.click();
    await this.waitForDomContentLoad();
  }

  async clickOnSubmitBtn(): Promise<void> {
    await this.submitBtn.scrollIntoViewIfNeeded();
    await this.submitBtn.click();
  }

  async closeErrorModal(): Promise<void> {
    await this.errorModalCloseButton.click();
  }

  async verifyErrorMessage(expectedError: string): Promise<void> {
    await expect(this.errorModalText).toContainText(expectedError);
  }

  async verifyEmailErrorMessage(expectedError: string): Promise<void> {
    await expect(this.errorEmailModalHeader).toContainText(expectedError);
  }

  async enterEmail(email: string): Promise<void> {
    await this.enterField(this.contactEmailField, email);
  }

  async enterName(name: string): Promise<void> {
    await this.enterField(this.contactNameField, name);
  }

  async enterMessage(message: string): Promise<void> {
    await this.enterField(this.contactMessageField, message);
  }

  async openTopicDropdown(): Promise<void> {
    await this.topic.dropdown.click();
  }

  async verifyDropdownSelectedValue(value: string): Promise<void> {
    await expect(this.topic.dropdown).toHaveValue(value);
  }

  async verifyAvailableTopics(): Promise<void> {
    const count = await this.topic.option.count();

    expect(count).toBeGreaterThan(1);
  }

  async verifyClearedForm(): Promise<void> {
    await expect(this.contactNameField).toHaveValue("");
    await expect(this.contactEmailField).toHaveValue("");
    await expect(this.contactMessageField).toHaveValue("");
  }
}
