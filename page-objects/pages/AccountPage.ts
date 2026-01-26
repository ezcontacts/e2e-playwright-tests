import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { ENDPOINT } from "../../constant/endpoint";
import { AccountMenuComponent } from "../components/AccountMenuComponent";
import { AccountMenu } from "../../test/data-test/productTypes";
import { ACCOUNT_MENU_LINKS } from "../../test/data-test/testData";

export class AccountPage extends BasePage {
  readonly title: Locator;
  readonly menu: AccountMenuComponent;

  constructor(page: Page, endpoint: string = ENDPOINT.accountMain) {
    super(page, endpoint);

    this.title = this.locator('.section-title');

    this.menu = new AccountMenuComponent(page);
  }

  async verifyTitleHaveText(key: AccountMenu): Promise<void>{
    const titleText = ACCOUNT_MENU_LINKS[key].title;
    await expect(this.title).toHaveText(titleText);
  }

  async verifyAccountUrl(key: AccountMenu): Promise<void>{
    const endpoint = ACCOUNT_MENU_LINKS[key].endpoint;
    await this.verifyUrlEndpoint(endpoint);
  }
}