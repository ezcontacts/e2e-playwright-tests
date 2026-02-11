import { expect, Locator, Page } from "@playwright/test";
import { BaseComponent } from "../base/BaseComponent";

export class HeaderComponent extends BaseComponent {
  readonly mainLogo: Locator;
  readonly searchField: Locator;
  readonly navBar: Locator;
  readonly cartLink: Locator;
  readonly lowestPriceLink: Locator;
  readonly freeShopingLink: Locator;
  readonly specialTopMessage: Locator;

  readonly linkWithText: (text: string) => Locator;

  constructor(page: Page, root: string = "#main-header") {
    super(page, root);

    this.mainLogo = this.within(".cls-header-logo-img-fix");
    this.searchField = this.within(
      ".search-keyword",
      ".navbar-toggle > span.glyphicon-search"
    );
    this.navBar = this.within("ul.navbar-nav");
    this.cartLink = this.within(".cart > a");

    this.lowestPriceLink = this.within(
      'a[data-target="#lowest-price-guarantee-modal"]'
    );
    this.freeShopingLink = this.within(
      'a.hover-underline[data-target="#free-shipping-modal"]'
    );
    this.specialTopMessage = this.within(
      '[data-target="#special-top-message-modal"]'
    );

    this.linkWithText = (text: string) => this.within("a").filter({hasText: new RegExp(text), visible: true });
  }

  async verifyMainImageIsVisible(): Promise<void> {
    await expect(this.mainLogo).toBeVisible();
  }

  async verifySearchBarVisible(): Promise<void> {
    await expect(this.searchField).toBeVisible();
  }

  async verifyNavBarVisible(): Promise<void> {
    await expect(this.navBar).toBeVisible();
  }

  async verifyCartVisible(): Promise<void> {
    await expect(this.cartLink).toBeVisible();
  }

  async verifyLowestPriceLinkVisible(): Promise<void> {
    await expect(this.lowestPriceLink).toBeVisible();
  }

  async verifyFreeShopingLinkVisible(): Promise<void> {
    await expect(this.freeShopingLink).toBeVisible();
  }

  async verifySpecialTopMessageVisible(): Promise<void> {
    await expect(this.specialTopMessage).toBeVisible();
  }

  async verifyLinkWithTextVisible(text: string): Promise<void>{
    await expect(this.linkWithText(text)).toBeVisible();
  }

  async clickOnLinkWithText(text: string): Promise<void>{
    const link = await this.linkWithText(text);
    await link.click();
  }
}
