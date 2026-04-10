import { expect, Locator, Page } from "@playwright/test";
import { AccountPage } from "./AccountPage";
import { ENDPOINT } from "../../../constant/endpoint";
import { text } from "stream/consumers";
import { ACCOUNT_MENU_LINKS } from "../../../test/data-test/testData";
import { AccountMenu } from "../../../test/data-test/productTypes";



export class AddressAndPaymentPage extends AccountPage {

    readonly link: Locator;
    readonly shippinglink: Locator;
    readonly billinglink: Locator;
    readonly paymentMethodLink: Locator;
    readonly cardformtitle: Locator;

  constructor(page: Page) {
    super(page, ENDPOINT.addressAndPayment);

    this.link = page.locator(`a[href="/account/address-and-payment"]`);   //address and payment link
    this.shippinglink = page.locator('a[href="/account/address-and-payment/add-shipping-address"]');   //+Add shipping Address link
    this.billinglink = page.locator('a[href="/account/address-and-payment/add-billing-address"]');   //+Add billing Address link
    this.paymentMethodLink = page.locator('a[href="/account/address-and-payment/add-card-details"]');   //+Add Payment methods link
    this.cardformtitle = this.visibleLocator('h2', 'Add Card Details');   //Card details form

}
//   Scenario: Verify user can add a new Payment method
//   When the user clicks on "+ Add Payment Method" link
//   Then the "Add Payment Method" form should be displayed
//   And the user should be redirected to "/account/address-and-payment/add-card-details"

    async addPaymentMethod(): Promise<void> {
        await this.paymentMethodLink.click();

    }

    async verifyTitleHaveText(key: AccountMenu | string): Promise<void>{
        const titleText = typeof key === "string" ? key : ACCOUNT_MENU_LINKS[key].title;
        await expect(this.title.filter({visible: true})).toHaveText(titleText);
    }



}