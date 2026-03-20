import { expect, Locator, Page } from "@playwright/test";
import { AccountPage } from "./AccountPage";
import { ENDPOINT } from "../../../constant/endpoint";


export class WishListNavigationPage extends AccountPage {
  constructor(page: Page) {
    super(page, ENDPOINT.wishlist);
}
  async verifyUrlContains(expectedPath: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(expectedPath));
  }

}
