import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { ENDPOINT } from "../../constant/endpoint";

export class CLContactLensPage extends BasePage {

  // Locators
  readonly productBrand: Locator;
  readonly productName: Locator;
  readonly pageHeading: Locator;
  

  constructor(page: Page) {
  super(page, ENDPOINT.contactLenses);


  this.pageHeading = page.getByRole("heading", {
      name: "Enter Prescription",
    });

this.productBrand = this.locator('xpath=/html/body/div[5]/div[1]/div/div[2]/div[2]/div[1]/h5');
this.productName = this.locator('xpath=/html/body/div[5]/div[1]/div/div[2]/div[2]/div[1]/div[2]/div[1]/h2');

  }

  // Navigation to product detail page
  async openProductDetailPage(pageName: string): Promise<void> {
    if (pageName === "Contact Lenses") {
      await this.page.goto("/contact-lenses");
    }
  }

  // Dynamic text verification
  text = (text: string) => this.page.getByText(text, { exact: true });

  async verifyTextVisible(textToVerify: string): Promise<void> {
    const text = this.text(textToVerify);
    await expect(text).toBeVisible();
  }

  async verifyProductBrandVisible(): Promise<void> {
    await expect(this.productBrand).toBeVisible();
  }

  async verifyProductNameVisible(): Promise<void> {
    await expect(this.productName).toBeVisible();
  }

  async verifyProductDetailPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/contact-lenses/);
    await expect(this.pageHeading).toBeVisible();
  }
}