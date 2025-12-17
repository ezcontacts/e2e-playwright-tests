import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { ENDPOINT } from "../../constant/endpoint";
import { FaqSectionComponent } from "../components/FaqSectionComponent";

export class HomePage extends BasePage {
  readonly faqSection: FaqSectionComponent;

  readonly recommendedProds: Locator;
  readonly noThanksBtnPopup: Locator;

  constructor(page: Page) {
    super(page, ENDPOINT.home);

    this.faqSection = new FaqSectionComponent(page);

    this.recommendedProds = this.locator('[id^="product-slider"]');
    this.noThanksBtnPopup = this.locator("div.ltkpopup-no-thanks button");
  }

  async clickOnNoThanksButton(): Promise<void> {
    await this.clickIfVisible(this.noThanksBtnPopup);
  }

  async verifyListOfRecommendedProdsVisible(): Promise<void> {
    await expect(this.recommendedProds).toBeVisible();
  }
}
