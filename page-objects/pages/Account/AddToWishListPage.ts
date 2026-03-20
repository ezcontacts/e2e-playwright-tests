import { expect, Locator, Page } from "@playwright/test";
import { AccountPage } from "./AccountPage";
import { ENDPOINT } from "../../../constant/endpoint";
import { AccountMenuComponent } from "../../components/AccountMenuComponent";
import { testConfig } from "../../../configs/config";


export class AddToWishListPage extends AccountPage {
  readonly table: Locator;
  readonly column: (text: string) => Locator;
  readonly text: (text: string) => Locator;
  readonly link: (link: string) => Locator;
  readonly menu: AccountMenuComponent;
  readonly headingWishList: Locator;
  readonly headingCart: Locator;
  readonly messageText: (message: string) => Locator;
  readonly items: Locator;
  readonly addToCart: Locator;
  readonly removeLink: Locator;
  readonly modal: Locator;
  //readonly removeButton: Locator;
  readonly confirmRemoveButton: Locator;

  constructor(page: Page) {
    super(page, ENDPOINT.wishlist);

    this.table = this.locator(".table-responsive");
    this.column = (text: string) => this.locator(`.table-responsive th`).filter({ hasText: text });
    this.text = (text: string) => this.locator(`h4:has-text('${text}')`);

    this.link = (linkText: string) => this.page.getByRole("link", { name: linkText, exact: true });
    this.messageText = (message: string) => this.page.getByText(message, { exact: true });

    this.menu = new AccountMenuComponent(page);
    
    this.headingWishList = page.getByRole("heading", { name: "Wish List" });
    this.headingCart = page.getByRole("heading", { name: "Shopping Cart" });

    this.addToCart = this.page.getByRole("link", { name: "Add to Cart" });
    this.removeLink = this.page.getByRole("link", { name: "Remove", exact: true }).first();
    
    this.items = this.page.locator('a[data-form-id*="addProductToCart"]');

    this.modal = this.page.locator('h4#remove_modal_label');
  //  this.removeButton = this.page.getByRole("button", { name: "Remove", exact: true });
    this.confirmRemoveButton = this.page.locator('#modal_remove_button') 
    //this.page.getByRole("dialog")
    //.getByRole("button", { name: "Remove" });
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

  //TODO by Potrys M: You can use method open() instead of navigateToWishListPage() --Done
  //Navigation
  async open() {
  await this.page.goto(`${testConfig.baseUrl}${this.endpoint}`);
  }

  async navigateToWishListPage(): Promise<void> {
    await this.page.goto("/account/wishlist");
  }

  //Verify page loaded
  //TODO by Potrys M: You need create Locator variable and use this locator -- DONE
  async verifyWishListPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/account\/wishlist/);
    await expect(this.headingWishList).toBeVisible();
  }

  //Verify empty message
  //TODO by Potrys M: You need create Locator variable and use this locator -- DONE
  async verifyMessageVisible(message: string): Promise<void> {
    const text = this.messageText(message);
    await expect(text).toBeVisible();
  }

  //TODO by Potrys M: You need create Locator variable and use this locator  -- DONE
  async verifyMultipleLinksVisible(links: string[]): Promise<void> {
    for (const linkText of links) {
      const link = this.link(linkText);
      await expect(link).toBeVisible();
    }
  }

  async ensureProductExistsInWishList(): Promise<void> {
    const items = this.items;

    if (await items.count() === 0) {
      const addToCart = this.addToCart;
      await expect(addToCart).toBeVisible();
    }
    await expect(items.first()).toBeVisible();
  }

  async clickAddToCartForFirstProduct(): Promise<void> {
    const addToCart = this.addToCart;
    await addToCart.first().click();
  }

  async verifyProductAddedToCart(): Promise<void> {
    // You can check if the cart count is increased or if the product appears in the cart page after clicking "Add to Cart"
  }

  async verifyRedirectedToCartPage(): Promise<void> {
    await expect(this.page).toHaveURL(/\/checkout\/cart/);
    await expect(this.headingCart).toBeVisible();  // this line gets failed due to we need to check for the popup before this.
  }

  async clickRemoveLinkForFirstProduct(): Promise<void> {
    const removeLink = this.removeLink;
    await removeLink.click();
  }

  async verifyRemoveConfirmationPopup(expectedMessage: string): Promise<void> {
    const popup = this.modal;
    await expect(popup).toBeVisible();
    await expect(popup).toContainText(expectedMessage);
  }

  async confirmRemoveProduct(): Promise<void> {
    const confirmRemoveButton = this.confirmRemoveButton;
    await expect(confirmRemoveButton).toBeVisible();
    await confirmRemoveButton.click();
  }
}