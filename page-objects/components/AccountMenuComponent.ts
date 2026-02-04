import { expect, Locator, Page } from "@playwright/test";
import { BaseComponent } from "../base/BaseComponent";
import { ACCOUNT_MENU_LINKS, getAccountMenuFromValue } from "../../test/data-test/testData";
import { AccountMenu } from "../../test/data-test/productTypes";

export class AccountMenuComponent extends BaseComponent {
  readonly getMenuBtn: (href: string) => Locator;
  readonly getMenuOption: (option: string) => Locator;

  constructor(page: Page) {
    super(page, '.m-off .account-left-col', '.visible-xs .account-left-col');

    this.getMenuBtn = (href: string) => this.within(`a[href="${href}"]`);
    this.getMenuOption = (option: string) => this.within(`a`).filter({ hasText: option });
  }

  async ClickOnMenuBtn(value: string | AccountMenu): Promise<void>{
    const menuValue = getAccountMenuFromValue(value);
    
    const href = ACCOUNT_MENU_LINKS[menuValue].endpoint;
    const btn = this.getMenuBtn(href);
    await btn.click();
    await this.waitForDomContentLoad();
  }

  async verifyMenuOption(option: string | AccountMenu): Promise<void> {
    const menuOption = this.getMenuOption(option);
    await expect(menuOption).toBeVisible();
  }
}