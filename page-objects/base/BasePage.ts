import { Page } from "@playwright/test";
import { testConfig } from "../../configs/config";
import { BaseEntity } from "./BaseEntity";
import { HeaderComponent } from "../components/HeaderComponent";
import { FooterComponent } from "../components/FooterComponent";
import { expect } from "../../test/fixtures/fixture";
import { PromotionComponent } from "../components/PromotionComponent";

export abstract class BasePage extends BaseEntity {
  readonly endpoint: string;

  readonly header: HeaderComponent;
  readonly footer: FooterComponent;
  readonly promotion: PromotionComponent

  constructor(page: Page, endpoint: string) {
    super(page);
    this.endpoint = endpoint;

    this.header = new HeaderComponent(page);
    this.footer = new FooterComponent(page);
    this.promotion = new PromotionComponent(page);
  }

  async open() {
    await this.openByEndpoint(this.endpoint);
  }

  async openByEndpoint(endpoint: string): Promise<void>{
    await this.page.goto(`${testConfig.baseUrl}${endpoint}`, {
      timeout: 60000,
      waitUntil: "domcontentloaded",
    });
    this.promotion.closeDynamicPopupIfPresent();
  }

  async verifyUrl() {
    await this.header.cartLink.waitFor({ state: "visible" });
    await expect(this.page).toHaveURL(new RegExp(`${this.endpoint}`));
  }

  async verifyUrlEndpoint(endpoint: string) {
    await expect(this.page).toHaveURL(new RegExp(`${endpoint}$`));
  }
}
