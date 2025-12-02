import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { ENDPOINT } from "../../constant/endpoint";
import { FaqSectionComponent } from "../components/FaqSectionComponent";
import { HeaderComponent } from "../components/HeaderComponent";

export class HomePage extends BasePage {
  readonly faqSection: FaqSectionComponent;
  readonly header: HeaderComponent;
  readonly recommendedProds: Locator;
  readonly noThanksBtnPopup: Locator;

  constructor(page: Page) {
    super(page, ENDPOINT.home);

    this.faqSection = new FaqSectionComponent(page);
    this.header = new HeaderComponent(page);

    this.recommendedProds = page.locator('[id^="product-slider"]');
    this.noThanksBtnPopup = page.locator("div.ltkpopup-no-thanks button");
  }

  async clickOnNoThanksButton() {
    await this.clickIfVisible(this.noThanksBtnPopup);
  }

  async verifyListOfRecommendedProdsVisible(): Promise<void> {
    await expect(this.recommendedProds).toBeVisible();
  }

  // async verifyMainImageIsVisible(): Promise<void> {
  //   await expect(this.mainLogo).toBeVisible();
  // }

  // async verifySearchBarVisible() {
  //   await expect(this.searchField).toBeVisible();
  // }

  // async verifyNavBarVisible() {
  //   await expect(this.navBar).toBeVisible();
  // }

  // async verifyCartVisible() {
  //   await expect(this.cartLink).toBeVisible();
  // }
}
