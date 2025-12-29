import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { ENDPOINT } from "../../constant/endpoint";

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page, ENDPOINT.checkout);
  }
}
