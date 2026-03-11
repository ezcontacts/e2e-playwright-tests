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
  readonly headingWishList: Locator;
  readonly messageText: (message: string) => Locator;


  constructor(page: Page) {
    super(page, ENDPOINT.wishlist);

    this.table = this.locator(".table-responsive");
    this.column = (text: string) => this.locator(`.table-responsive th`).filter({ hasText: text });
    this.text = (text: string) => this.locator(`h4:has-text('${text}')`);
    // this.link = (link: string) => this.locator(`a[href*="${link}"]`);
    this.link = (linkText: string) => this.page.getByRole("link", { name: linkText, exact: true });

    this.menu = new AccountMenuComponent(page);

    this.headingWishList = page.getByRole("heading", { name: "Wish List" });
    this.messageText = (message: string) => this.page.getByText(message, { exact: true });

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

  //TODO by Potrys M: You can use method open() instead of navigateToWishListPage() --PENDING
  //Navigation
  async navigateToWishListPage(): Promise<void> {
    await this.page.goto("/account/wishlist");
  }

  //Verify page loaded
  async verifyWishListPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/account\/wishlist/);
    await expect(this.headingWishList).toBeVisible();

    // await expect(
    //   //TODO by Potrys M: You need create Locator variable and use this locator -- DONE
    //   this.page.getByRole("heading", { name: "Wish List" }),
    // ).toBeVisible();

  }

  //Verify empty message
  async verifyMessageVisible(message: string): Promise<void> {
    const text = this.messageText(message);
    await expect(text).toBeVisible();

    //TODO by Potrys M: You need create Locator variable and use this locator -- DONE
    //    const text = this.page.getByText(message, { exact: true });
    //    await expect(text).toBeVisible();
  }

  async verifyMultipleLinksVisible(links: string[]): Promise<void> {
    for (const linkText of links) {
      const link = this.link(linkText);
      await expect(link).toBeVisible();
    }
    
    // for (const linkText of links) {
    //   //TODO by Potrys M: You need create Locator variable and use this locator  -- DONE
    //   const link = this.page.getByRole("link", {
    //     name: linkText,
    //     exact: true,
    //   });
    //   await expect(link).toBeVisible();
    // }

  }
}
