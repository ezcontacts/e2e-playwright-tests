import { Page, Locator } from "@playwright/test";
import { AdminContentPanelComponent } from "./AdminContentPanelComponent";
import { expect } from "../../../test/fixtures/fixture";

type ShippingAddressParams = {
  firstName?: string;
  lastName?: string;
  companyName?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  zipCode?: string;
  phone?: string;
};

export class CreateNewOrderComponent extends AdminContentPanelComponent {
  readonly shippingAddress: {
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly companyNameField: Locator;
    readonly addressLine1Field: Locator;
    readonly addressLine2Field: Locator;
    readonly cityField: Locator;
    readonly stateDropdown: Locator;
    readonly zipCodeField: Locator;
    readonly phoneField: Locator;
  }

  readonly addProductBtn: Locator;
  readonly title: (text: string) => Locator;

  readonly emailField: Locator;
  readonly accountLable: (label: string) => Locator;

  constructor(page: Page) {
    super(page);

    this.shippingAddress = {
      firstNameField: this.within("#AccountShippingAddressAddressShipName").first(),
      lastNameField: this.within("#AccountShippingAddressAddressShipName").last(),
      companyNameField: this.within("#AccountShippingAddressAddressShipCompany"),
      addressLine1Field: this.within("#AccountShippingAddressAddressLine1"),
      addressLine2Field: this.within("#AccountShippingAddressAddressLine2"),
      cityField: this.within("#AccountShippingAddressAddressCity"),
      stateDropdown: this.within("#AccountShippingAddressUsAddressRegion"),
      zipCodeField: this.within("#AccountShippingAddressAddressPostalZip"),
      phoneField: this.within("#AccountShippingAddressAddressShipPhonePrimary"),
    };

    this.addProductBtn = this.locator("#show_add_product_modal");
    this.title = (text: string) => this.locator(`h3.hidden-xs`).filter({ hasText: text });

    this.emailField = this.within("#UserEmail");

    this.accountLable = (label: string) => this.within(".form-group label").filter({hasText: label});
  }

  async enterEmail(email: string): Promise<void> {
    await this.emailField.fill(email);
  }

  async verifyLabel(label: string): Promise<void> {
    const labelField = this.accountLable(label);
    await expect(labelField).toBeVisible();
  }

  async fillShippingAddress(data: ShippingAddressParams): Promise<void> {
    const fieldMap = {
      firstName: this.shippingAddress.firstNameField,
      lastName: this.shippingAddress.lastNameField,
      companyName: this.shippingAddress.companyNameField,
      addressLine1: this.shippingAddress.addressLine1Field,
      addressLine2: this.shippingAddress.addressLine2Field,
      city: this.shippingAddress.cityField,
      zipCode: this.shippingAddress.zipCodeField,
      phone: this.shippingAddress.phoneField,
    };

    for (const [key, value] of Object.entries(data)) {
      if (value) {
        await fieldMap[key].waitFor({ state: 'visible' });
        await fieldMap[key].fill(value);
      }
    }
  }

  async selectState(value: string): Promise<void> {
    await this.shippingAddress.stateDropdown.selectOption({ label: value }); 
  }

  async verifyTitleIsVisible(text: string): Promise<void> {
    const title = this.title(text);
    await expect(title).toBeVisible();
  }

  async clickOnAddProductBtn(): Promise<void> {
    await this.addProductBtn.click();
  }
}
