import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { ENDPOINT } from "../../constant/endpoint";
import { MessageComponent } from "../components/SuccessMessageComponent";

export class CartPage extends BasePage {
  readonly message: MessageComponent;

  constructor(page: Page) {
    super(page, ENDPOINT.contactUs);

    this.message = new MessageComponent(this.page);
  }
}
