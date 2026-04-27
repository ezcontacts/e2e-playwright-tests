import { expect, Locator, Page } from "@playwright/test";
import { AccountPage } from "./AccountPage";
import { ENDPOINT } from "../../../constant/endpoint";
import { generatePaymentData, generateUSAddress } from "../../../utils/user_helper";

export class AddressAndPaymentPage extends AccountPage {

    readonly cardNumberTextbox: Locator;
    readonly expMonthLocator: Locator;
    readonly expYearLocator: Locator;
    readonly btnSaveChanges: Locator;

    readonly AddressFirstName: Locator;
    readonly AddressLastName: Locator; 
    readonly AddressLine1: Locator;
    readonly AddressCity: Locator;
    readonly AddressState: Locator;
    readonly AddressZip: Locator;
    readonly AddressPhone: Locator;
    
    constructor(page: Page) {
        super(page, ENDPOINT.addressAndPayment);

    this.cardNumberTextbox = page.getByRole('textbox', { name: 'Credit Card Number' });
    this.expMonthLocator = page.locator('#AccountCardTokenExpiryMonth');
    this.expYearLocator = page.locator('#AccountCardTokenExpiryYear');
    this.btnSaveChanges = page.getByRole('button', { name: 'Save Changes' }) //Save changes button on add card details form
    
    // Locators for My account -> Shipping and Billing address.
    this.AddressFirstName = page.getByRole('textbox', { name: 'First Name' }) 
    this.AddressLastName = page.getByRole('textbox', { name: 'Last Name' })
    this.AddressLine1 = page.getByRole('textbox', { name: 'Address line 1' })
    this.AddressCity = page.getByRole('textbox', { name: 'City' })
    this.AddressState = page.getByRole('combobox', { name: 'State' })
    this.AddressZip = page.getByRole('textbox', { name: 'Zip Code' })
    this.AddressPhone = page.getByRole('textbox', { name: 'Phone Number' })
    }

    async clickAddLink(type: string): Promise<void> {
       await this.page.getByRole('link', { name: `Add ${type}` }).click();
    }

    async verifyFormDisplayed(formName: string): Promise<void> {
        const heading = this.page.getByRole('heading', { name: formName });
        await expect(heading, `Form not visible: ${formName}`).toBeVisible();
    }

    async enterCardDetails(cardNumber: string, month: string, year: string): Promise<void> {
        const data = generatePaymentData();
        await this.cardNumberTextbox.fill(data.cardNumber);
        await this.expMonthLocator.selectOption(data.expiryMonth);
        await this.expYearLocator.selectOption(data.expiryYear);
    }

    async clickButton() {
        await this.btnSaveChanges.click();
    }

    getSuccessMessageByText(text: string) {
        return this.page.getByText(text);
    }

    async verifySuccessfulMessage(text: string): Promise<void> {
        const message = this.getSuccessMessageByText(text);
        await expect(message).toBeVisible();
    }

    async FillCustomerAddressForm() {
        const addressData = generateUSAddress();
        await this.AddressFirstName.fill(addressData.firstName);
        await this.AddressLastName.fill(addressData.lastName);
        await this.AddressLine1.fill(addressData.address1);
        await this.AddressCity.fill(addressData.city);
        await this.AddressState.selectOption(({ value: 'New York' }));
        await this.AddressZip.fill(addressData.zip);
        await this.AddressPhone.fill(addressData.phone);
    }
}