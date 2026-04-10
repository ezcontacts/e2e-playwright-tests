import { expect, Locator, Page } from "@playwright/test";
import { AccountPage } from "./AccountPage";
import { ENDPOINT } from "../../../constant/endpoint";


export class WishListEmptyPage extends AccountPage {
 
  readonly messageText: (message: string) => Locator;
  readonly link: (link: string) => Locator;

  constructor(page: Page) {
    super(page, ENDPOINT.wishlist);

    this.messageText = (message: string) => this.page.getByText(message, { exact: true });
    this.link = (linkText: string) => this.page.getByRole("link", { name: linkText, exact: true });
}

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

}