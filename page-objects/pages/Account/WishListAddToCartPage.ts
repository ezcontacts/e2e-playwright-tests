import { expect, Locator, Page } from "@playwright/test";
import { AccountPage } from "./AccountPage";
import { ENDPOINT } from "../../../constant/endpoint";
import { AccountMenuComponent } from "../../components/AccountMenuComponent";
import { testConfig } from "../../../configs/config";


export class WishListAddToCartPage extends AccountPage {

  readonly addToCart: Locator;
  readonly items: Locator;
  readonly headingCart: Locator;
  readonly wishListIcon: Locator;
 
  constructor(page: Page) {
    super(page, ENDPOINT.wishlist);

    this.addToCart = this.page.getByRole("link", { name: "Add to Cart" });
    this.items = this.page.locator('a[data-form-id*="addProductToCart"]');
    this.headingCart = page.getByRole("heading", { name: "Shopping Cart" });
    this.wishListIcon = page.locator('a.add-to-wishlist-btn');


}
  
  async clickWishListIconForFirstProduct(): Promise<void> {
    const wishListIcon = this.wishListIcon
    await wishListIcon.click();
  }

  async verifyProductAddedToWishList(): Promise<void> {
    await this.ensureProductExistsInWishList();
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
}