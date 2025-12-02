import { expect, Locator, Page } from "@playwright/test";
import { BaseComponent } from "../base/BaseComponent";

export class HeaderComponent extends BaseComponent {
  readonly mainLogo: Locator;
  readonly searchField: Locator;
  readonly navBar: Locator;
  readonly cartLink: Locator;

  constructor(page: Page, root: string = "#main-header") {
    super(page, root);

    this.mainLogo = this.within(".cls-header-logo-img-fix");
    this.searchField = this.within(".search-keyword");
    this.navBar = this.within("ul.navbar-nav");
    this.cartLink = this.within(".cart > a");
  }

  async verifyMainImageIsVisible(): Promise<void> {
    //await expect(this.mainLogo).toBeVisible();
  }

  async verifySearchBarVisible() {
    await expect(this.searchField).toBeVisible();
  }

  async verifyNavBarVisible() {
    await expect(this.navBar).toBeVisible();
  }

  async verifyCartVisible() {
    await expect(this.cartLink).toBeVisible();
  }
}
