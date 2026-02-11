import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../../base/BasePage";
import { ENDPOINT } from "../../../constant/endpoint";
import { AccountMenuComponent } from "../../components/AccountMenuComponent";
import { AccountMenu } from "../../../test/data-test/productTypes";
import { ACCOUNT_MENU_LINKS } from "../../../test/data-test/testData";

export class AccountPage extends BasePage {
  readonly heading: Locator;
  readonly title: Locator;
  readonly subtitle: Locator;
  readonly menu: AccountMenuComponent;

  constructor(page: Page, endpoint: string = ENDPOINT.accountMain) {
    super(page, endpoint);

    this.heading = this.locator('.account-heading h2');
    this.title = this.locator('.m-off .section-title', '.visible-xs .section-title');
    this.subtitle = this.locator('.visible-xs .subtitle', '.m-off .subtitle');

    this.menu = new AccountMenuComponent(page);
  }

  async verifyHeadingText(expectedText: string): Promise<void> {
    await expect(this.heading).toHaveText(expectedText);
  }

  async verifyTitleHaveText(key: AccountMenu | string): Promise<void>{
    const titleText = typeof key === "string" ? key : ACCOUNT_MENU_LINKS[key].title;
    await expect(this.title.filter({visible: true})).toHaveText(titleText);
  }

  async verifyAccountUrl(key: AccountMenu): Promise<void>{
    const endpoint = ACCOUNT_MENU_LINKS[key].endpoint;
    await this.verifyUrlEndpoint(endpoint);
  }

  async verifySubtitleHaveText(text: string): Promise<void>{
    await expect(this.subtitle).toHaveText(text);
  }
}