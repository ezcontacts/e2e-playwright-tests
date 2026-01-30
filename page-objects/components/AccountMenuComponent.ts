import { expect, Locator, Page } from "@playwright/test";
import { BaseComponent } from "../base/BaseComponent";
import { ACCOUNT_MENU_LINKS, getAccountMenuFromValue } from "../../test/data-test/testData";
import { AccountMenu } from "../../test/data-test/productTypes";

export class AccountMenuComponent extends BaseComponent {
  readonly getMenuBtn: (href: string) => Locator;

  constructor(page: Page) {
    super(page, '.m-off .account-left-col', '.visible-xs .account-left-col');

    this.getMenuBtn = (href: string) => this.within(`a[href="${href}"]`);
  }

  async ClickOnMenuBtn(value: string | AccountMenu): Promise<void>{
    const menuValue = getAccountMenuFromValue(value);
    
    const href = ACCOUNT_MENU_LINKS[menuValue].endpoint;
    const btn = this.getMenuBtn(href);
    await btn.click();
    await this.waitForDomContentLoad();
  }
}