import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { ENDPOINT } from "../../constant/endpoint";
import { FillterComponent } from "../components/FillterComponent";

export class EyeglassesPage extends BasePage {
  readonly fillter: FillterComponent;

  constructor(page: Page) {
    super(page, ENDPOINT.eyeglasses);

    this.fillter = new FillterComponent(page);
  }
}
