import { expect, Locator, Page } from "@playwright/test";
import { AccountPage } from "./AccountPage";
import { ENDPOINT } from "../../../constant/endpoint";
import { AccountInfoFields } from "../../../test/data-test/productTypes";

export interface AccountInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  emailSignUp: string;
}

export class AccountInfoPage extends AccountPage {
  readonly fieldAccountInfo: (text: string) => Locator;

  constructor(page: Page) {
    super(page, ENDPOINT.accountMain);

    this.fieldAccountInfo = (text: string) => this.page.locator('.account-info li', {
      has: this.page.locator('.acc-field', { hasText: new RegExp(`^${text}$`)}),
    })
    .locator('.acc-field-val');
  }

  async getAccountInfo(): Promise<AccountInfo> {
    const accountInfo: AccountInfo = {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      emailSignUp: ''
    };

    accountInfo.firstName = (await this.fieldAccountInfo(AccountInfoFields.FirstName).innerText()).trim();
    accountInfo.lastName  = (await this.fieldAccountInfo(AccountInfoFields.LastName).innerText()).trim();
    accountInfo.phone     = (await this.fieldAccountInfo(AccountInfoFields.Phone).innerText()).trim();
    accountInfo.email     = (await this.fieldAccountInfo(AccountInfoFields.Email).innerText()).trim();
    accountInfo.emailSignUp = (await this.fieldAccountInfo(AccountInfoFields.EmailSignUp).innerText()).trim();

    return accountInfo;
  }

  async verifyAccountInfoFieldValue(field: AccountInfoFields | string, expectedValue: string): Promise<void> {
    const fieldLocator = this.fieldAccountInfo(field);
    await expect(fieldLocator).toHaveText(expectedValue);
  }
}