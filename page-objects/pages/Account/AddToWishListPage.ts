import { expect, Locator, Page } from "@playwright/test";
import { AccountPage } from "./AccountPage";
import { ENDPOINT } from "../../../constant/endpoint";
import { AccountMenuComponent } from "../../components/AccountMenuComponent";

export class AddToWishListPage extends AccountPage {
  readonly table: Locator;
  readonly column: (text: string) => Locator;
  readonly text: (text: string) => Locator;
  readonly link: (link: string) => Locator;
  readonly menu: AccountMenuComponent;

  constructor(page: Page) {
    super(page, ENDPOINT.wishlist);

    this.table = this.locator(".table-responsive");
    this.column = (text: string) =>
      this.locator(`.table-responsive th`).filter({ hasText: text });
    this.text = (text: string) => this.locator(`h4:has-text('${text}')`);
    this.link = (link: string) => this.locator(`a[href*="${link}"]`);

    this.menu = new AccountMenuComponent(page);
  }

  async verifyHeadingText(expectedText: string): Promise<void> {
    await expect(this.heading).toHaveText(expectedText);
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

  //TODO by Potrys M: You can use method open() instead of navigateToWishListPage()
  //Navigation
  async navigateToWishListPage(): Promise<void> {
    await this.page.goto("/account/wishlist");
  }

  //Verify page loaded
  async verifyWishListPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/account\/wishlist/);
    await expect(
      //TODO by Potrys M: You need create Locator variable and use this locator
      this.page.getByRole("heading", { name: "Wish List" }),
    ).toBeVisible();
  }

  //Verify empty message
  async verifyMessageVisible(message: string): Promise<void> {
    //TODO by Potrys M: You need create Locator variable and use this locator
    const text = this.page.getByText(message, { exact: true });
    await expect(text).toBeVisible();
  }

  async verifyMultipleLinksVisible(links: string[]): Promise<void> {
    for (const linkText of links) {
      //TODO by Potrys M: You need create Locator variable and use this locator
      const link = this.page.getByRole("link", {
        name: linkText,
        exact: true,
      });
      await expect(link).toBeVisible();
    }
  }
}
