import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { ENDPOINT } from "../../constant/endpoint";
import { FaqSectionComponent } from "../components/FaqSectionComponent";
import { HeaderComponent } from "../components/HeaderComponent";
import { FooterComponent } from "../components/FooterComponent";
import { FillterComponent } from "../components/FillterComponent";

export class EyeglassesPage extends BasePage {
  readonly header: HeaderComponent;
  readonly footer: FooterComponent;
  readonly fillter: FillterComponent;

  constructor(page: Page) {
    super(page, ENDPOINT.eyeglasses);

    this.header = new HeaderComponent(page);
    this.footer = new FooterComponent(page);
    this.fillter = new FillterComponent(page);
  }
}
