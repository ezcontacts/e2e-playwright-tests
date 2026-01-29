import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { ENDPOINT } from "../../constant/endpoint";
import { FaqSectionComponent } from "../components/FaqSectionComponent";
import { PromotionComponent } from "../components/PromotionComponent";

export class HomePage extends BasePage {
  readonly recommendedProds: Locator;
  readonly noThanksBtnPopup: Locator;

  readonly faqSection: FaqSectionComponent;

  constructor(page: Page) {
    super(page, ENDPOINT.home);

    this.recommendedProds = this.locator('[id^="product-slider"]');
    this.noThanksBtnPopup = this.locator("div.ltkpopup-no-thanks button");

    this.faqSection = new FaqSectionComponent(page);
  }

  async clickOnNoThanksBtn(): Promise<void> {
    await this.clickIfVisible(this.noThanksBtnPopup);
  }

  async verifyListOfRecommendedProdsVisible(): Promise<void> {
    await this.waitForDomContentLoad();
    await expect(this.recommendedProds).toHaveCount(1);
  }
}
