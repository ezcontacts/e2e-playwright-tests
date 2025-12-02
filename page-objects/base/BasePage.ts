import { Page } from "@playwright/test";
import { testConfig } from "../../configs/config";

export class BasePage {
  readonly page: Page;
  readonly endpoint: string;

  constructor(page: Page, endpoint: string) {
    this.page = page;
    this.endpoint = endpoint;
  }

  async open() {
    await this.page.goto(`${testConfig.baseUrl}${this.endpoint}`, {
      timeout: 30000,
      waitUntil: "domcontentloaded",
    });

    await this.waitForDomContentLoad();
  }

  async waitForDomContentLoad() {
    await this.page.waitForLoadState("domcontentloaded");
  }

  async waitForLoadState() {
    await this.page.waitForLoadState("load");
  }

  async reloadPage() {
    await this.page.reload({ waitUntil: "domcontentloaded" });
  }
}
