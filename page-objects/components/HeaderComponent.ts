import { expect, Locator, Page } from "@playwright/test";
import { BaseComponent } from "../base/BaseComponent";
import { TOKEN_ENDPOINT } from '../../constant/tokens';

export class HeaderComponent extends BaseComponent {
  readonly mainLogo: Locator;
  readonly searchField: Locator;
  readonly navBar: Locator;
  readonly cartLink: Locator;
  readonly lowestPriceLink: Locator;
  readonly freeShopingLink: Locator;
  readonly specialTopMessage: Locator;

  readonly linkWithText: (text: string) => Locator;
  readonly getTab: (tabName: string) => Locator;
  readonly getDropdownMenu: (tabName: string) => Locator;
  readonly getSubMenuOption: (tabName: string, option: string) => Locator;

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

    this.getTab = (tabName: string) => this
      .within('li.hidden-xs')
      .filter({has: this.page.locator('a', this.byExactText(tabName))})

    this.getDropdownMenu = (tabName: string) => this
      .getTab(tabName)
      .locator("ul.dropdown-menu");

    this.getSubMenuOption = (tabName: string, option: string) => this
      .getDropdownMenu(tabName).locator(
         ".title, .nav-menu-link",
        this.byExactText(option)
      );
  }


  async clickTab(tabName: string): Promise<void> {
    const tab = this.getTab(tabName);
    await expect(tab).toBeVisible({ timeout: 15000 });
    await tab.click();
  }


  async hoverTab(tabName: string): Promise<void> {
    const tab = this.getTab(tabName);
    await expect(tab).toBeVisible({ timeout: 15000 });
    await tab.hover();
  }


  async clickSubMenu(tabName: string, option: string): Promise<void> {
    await this.hoverTab(tabName);
    const subMenu = this.getSubMenuOption(tabName, option);
    await expect(subMenu).toBeVisible({ timeout: 15000 });
    await subMenu.click();
  }

  async verifyTabVisible(tabName: string): Promise<void> {
    await expect(this.getTab(tabName)).toBeVisible({ timeout: 15000 });
  }


  async verifyDropdownVisible(tabName: string): Promise<void> {
    await this.hoverTab(tabName);
    await expect(this.getDropdownMenu(tabName)).toBeVisible({ timeout: 15000 });
  }


  async verifyDropdownHidden(tabName: string): Promise<void> {
    const menu = this.getDropdownMenu(tabName);
    if ((await menu.count()) === 0) return;
    if (await menu.isVisible()) {
      await expect(menu).not.toBeVisible({ timeout: 5000 });
    }
  }


  async verifySubMenuVisible(tabName: string, name: string): Promise<void> {
    await this.hoverTab(tabName);


    const textItem = this.getSubMenuOption(tabName, name);

    if (await textItem.count()) {
      await expect(
        textItem.first(),
        `Submenu '${name}' under '${tabName}' should be visible`
      ).toBeVisible({ timeout: 15000 });
      return;
    }
  }

  async verifyTabIsActive(tabName: string): Promise<void> {
    const tab = this.getTab(tabName);
    await expect(tab).toHaveClass(/active|selected/);
  }


  async verifyTabContent(tabName: string): Promise<void> {
    if (!tabName) throw new Error("❌ Tab name is undefined in verifyTabContent");
    const tabContent = this.getTab(tabName);
    await expect(tabContent).toBeVisible({ timeout: 15000 });
  }

  async switchTab(tabName: string): Promise<void> {
    await this.clickTab(tabName);
    await this.verifyTabContent(tabName);
  }

  async verifyTabIsNotActive(tabName: string): Promise<void> {
    const tab = this.getTab(tabName);
    await tab.waitFor({ state: "visible", timeout: 5000 });

    const classList = await tab.getAttribute("class");
    if (classList?.includes("active")) {
      throw new Error(`❌ Tab "${tabName}" should not be active`);
    }
  }


  getTabUrl(tabName: string): string {
    const key = tabName.toUpperCase()
                  .replace(/[’']/g, "")
                  .replace(/\s+/g, " ")
                  .trim();

    const url = TOKEN_ENDPOINT[key];
    if (!url) {
      throw new Error(`❌ No URL mapping found for tab '${tabName}' (normalized key: '${key}')`);
    }

    return url;
  }


  async verifyTabRedirect(tabName: string): Promise<void> {
    const expectedUrl = this.getTabUrl(tabName);
    await this.page.waitForURL(new RegExp(expectedUrl, "i"), { timeout: 15000 });
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
