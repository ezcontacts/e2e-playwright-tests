import { expect, Locator, Page } from "@playwright/test";
import { AccountPage } from "./AccountPage";
import { ENDPOINT } from "../../../constant/endpoint";
import { AccountMenuComponent } from "../../components/AccountMenuComponent";
import { testConfig } from "../../../configs/config";


export class WishListRemovePage extends AccountPage {

  readonly text: (text: string) => Locator;
  readonly link: (link: string) => Locator;
  readonly removeLink: Locator;
  readonly confirmRemoveButton: Locator;
  readonly modal: Locator;
  readonly messageText: (message: string) => Locator;


  constructor(page: Page) {
    super(page, ENDPOINT.wishlist);

    this.text = (text: string) => this.locator(`h4:has-text('${text}')`);
    this.link = (linkText: string) => this.page.getByRole("link", { name: linkText, exact: true });
    this.removeLink = this.page.getByRole("link", { name: "Remove", exact: true }).first();
    this.confirmRemoveButton = this.page.locator('#modal_remove_button') 
    this.modal = this.page.locator('h4#remove_modal_label');
    this.messageText = (message: string) => this.page.getByText(message, { exact: true });

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

  //Verify empty message
  //TODO by Potrys M: You need create Locator variable and use this locator -- DONE
  async verifyMessageVisible(message: string): Promise<void> {
    const text = this.messageText(message);
    await expect(text).toBeVisible();
  }
}