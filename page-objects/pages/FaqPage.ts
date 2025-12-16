import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { ENDPOINT } from "../../constant/endpoint";

export class FaqPage extends BasePage {
  constructor(page: Page) {
    super(page, ENDPOINT.faq);
  }
}
