import { expect, Locator, Page } from "@playwright/test";
import { AccountPage } from "./AccountPage";
import { ENDPOINT } from "../../../constant/endpoint";


//I recomend to use 'Page' suffix for page object classes for Exemple: AddToWishListPage -- Done.
export class AddToWishListPage extends AccountPage {
  readonly table: Locator;
  readonly column: (text: string) => Locator;
  readonly text: (text: string) => Locator;
  readonly link: (link: string) => Locator;

  constructor(page: Page) {
    super(page, ENDPOINT.wishlist);

    this.table = this.locator('.table-responsive');
    this.column = (text: string) => this.locator(`.table-responsive th`).filter({ hasText: text });
    this.text = (text: string) => this.locator(`h4:has-text('${text}')`);
    this.link = (link: string) => this.locator(`a[href*="${link}"]`);

  }

    async verifyUrlContains(expectedPath: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(expectedPath));
  }

  //Make sure that Table is visible.
  async verifyTableIsVisible(): Promise<void> {
    await expect(this.table).toBeVisible();
  }

  async verifyColumnIsVisible(columnName: string): Promise<void> {
    const column = this.column(columnName);
    await expect(column).toBeVisible();
  }

  //When the wishlist is empty.
  async verifyWhenNoItem(textToVerify: string): Promise<void> {
    const text = this.text(textToVerify);
  }

  //When the wishlist is empty.
  async verifLink(link: string): Promise<void> {
    const linkElement = this.link(link);
    await expect(linkElement).toBeVisible();
  }



}