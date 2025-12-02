import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { ENDPOINT } from "../../constant/endpoint";
import { FaqSection } from "../components/FaqSection";

export class HomePage extends BasePage {
  readonly faqSection: FaqSection;

  constructor(page: Page) {
    super(page, ENDPOINT.home);
    this.faqSection = new FaqSection(page, ".faq-section");
  }
}
