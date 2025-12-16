import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { ENDPOINT } from "../../constant/endpoint";

export class ContactUsPage extends BasePage {
  readonly topic: {
    link: (provider: string) => Locator;
    dropdown: Locator;
    option: Locator;
  };

  readonly submitButton: Locator;
  readonly errorModal: Locator;
  readonly errorModalText: Locator;
  readonly errorModalCloseButton: Locator;

  readonly contactEmailField: Locator;
  readonly contactNameField: Locator;
  readonly contactMessageField: Locator;
  readonly errorEmailModalHeader: Locator;
  readonly confirmationMessage: Locator;

  constructor(page: Page) {
    super(page, ENDPOINT.contactUs);

    this.topic = {
      dropdown: this.page.locator("#ContactTopic"),
      option: this.page.locator('[id^="ContactTopic"] option'),
      link: (provider: string) =>
        this.page.locator(".lnk-red", {
          hasText: new RegExp(provider, "i"),
        }),
    };

    this.submitButton = this.page.locator('[id^="ContactFormSubmitButton"]');
    this.errorModalText = this.page.locator("#jsShowErrorModalText");
    this.errorModalCloseButton = this.page.locator(
      "#jsShowErrorModalCloseButton"
    );
    this.contactEmailField = this.page.locator("#ContactEmail");
    this.contactNameField = this.page.locator("#ContactName");
    this.contactMessageField = this.page.locator("#ContactMessage");
    this.errorEmailModalHeader = this.page.locator(".reset-modal h4");
    this.confirmationMessage = this.page.locator(".success-msg");
  }

  async clickOnTopic(topic: string) {
    const link = await this.topic.link(topic);
    await link.click();
    await this.waitForDomContentLoad();
  }

  async clickOnSybmitButton() {
    await this.submitButton.click();
  }

  async closeErrorModal() {
    await this.errorModalCloseButton.click();
  }

  async verifyErrorMessage(expectedError: string) {
    await expect(this.errorModalText).toContainText(expectedError);
  }

  async verifyEmailErrorMessage(expectedError: string) {
    await expect(this.errorEmailModalHeader).toContainText(expectedError);
  }

  async enterEmail(email: string) {
    await this.enterField(this.contactEmailField, email);
  }

  async enterName(name: string) {
    await this.enterField(this.contactNameField, name);
  }

  async enterMessage(message: string) {
    await this.enterField(this.contactMessageField, message);
  }

  async openTopicDropdown() {
    await this.topic.dropdown.click();
  }

  async verifyDropdownSelectedValue(value: string) {
    await expect(this.topic.dropdown).toHaveValue(value);
  }

  async verifyConfirmationMessage(value: string) {
    await expect(this.confirmationMessage).toHaveText(value);
  }

  async verifyAvailableTopics() {
    const count = await this.topic.option.count();

    expect(count).toBeGreaterThan(1);
  }

  async verifyClearedForm() {
    await expect(this.contactNameField).toHaveValue("");
    await expect(this.contactEmailField).toHaveValue("");
    await expect(this.contactMessageField).toHaveValue("");
  }
}
