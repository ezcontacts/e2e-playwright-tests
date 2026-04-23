import { expect, Locator, Page } from "@playwright/test";
import { AccountPage } from "./AccountPage";
import { ENDPOINT } from "../../../constant/endpoint";

export class AddressAndPaymentPage extends AccountPage {

    readonly cardNumberTextbox: Locator;
    readonly expiryMonthLocator: Locator;
    readonly expiryYearLocator: Locator;
    readonly buttonSaveChanges: Locator;

    
  constructor(page: Page) {
    super(page, ENDPOINT.addressAndPayment);

    this.cardNumberTextbox = page.getByRole('textbox', { name: 'Credit Card Number' });
    this.expiryMonthLocator = page.locator('#AccountCardTokenExpiryMonth');
    this.expiryYearLocator = page.locator('#AccountCardTokenExpiryYear');
    this.buttonSaveChanges = page.getByRole('button', { name: 'Save Changes' }) //Save changes button on add card details form


}
    async clickAddLink(type: string): Promise<void> {
       await this.page.getByRole('link', { name: `Add ${type}` }).click();

    }

    async verifyFormVisible(formName: string) {
        await expect(this.page.getByText(formName)).toBeVisible();
    }

    async enterCardDetails() {
        await this.cardNumberTextbox.fill('378282246310005');
        await this.expiryMonthLocator.selectOption('11');
        await this.expiryYearLocator.selectOption('26');
    }

    async clickButton(buttonName: string) {
       // await this.page.getByRole('button', { name: buttonName }).click();
        await this.buttonSaveChanges.click();
    }

}