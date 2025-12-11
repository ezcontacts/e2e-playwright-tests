import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { ENDPOINT } from "../../constant/endpoint";
import { HeaderComponent } from "../components/HeaderComponent";

export class ContactUsPage extends BasePage {
  readonly header: HeaderComponent;
  readonly topic: {
    link: (provider: string) => Locator;
    dropdown: Locator;
    option: Locator;
  };

  constructor(page: Page) {
    super(page, ENDPOINT.contactUs);

    this.header = new HeaderComponent(page);

    this.topic = {
      dropdown: this.page.locator('[id^="ContactTopic"]'),
      option: this.page.locator('[id^="ContactTopic"] option'),
      link: (provider: string) =>
        this.page.locator(".lnk-red", {
          hasText: new RegExp(provider, "i"),
        }),
    };
  }

  async clickOnTopic(topic: string) {
    const link = await this.topic.link(topic);
    await link.click();
  }

  async openTopicDropdown() {
    await this.topic.dropdown.click();
  }

  async verifyAvailableTopics() {
    const count = await this.topic.option.count();

    expect(count).toBeGreaterThan(1);
  }
}
