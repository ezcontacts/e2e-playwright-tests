import { expect, Locator, Page } from "@playwright/test";
import { ENDPOINT } from "../../../constant/endpoint";
import { ProductCatalogePage } from "../../pages/product-cataloge/ProductCatalogePage";

export class ContactLensesPage extends ProductCatalogePage {

readonly title:(text: string) =>Locator;
readonly text: (text: string) => Locator;

  constructor(page: Page) {
    super(page, ENDPOINT.contactLenses);

    this.title = (text: string) => this.locator(('div.t-hide h2'));
    this.text = (text: string) => this.locator(('div.t-hide h5'));

  }

  async verifyProductTitlesIsVisible(): Promise<void> {
await expect(this.title).toBeVisible();  }

 
  async verifySubtitleHaveText(text: string): Promise<void> {
   // const text = this.text(text);
    await expect(text).toHaveText(text);
  
}

}

