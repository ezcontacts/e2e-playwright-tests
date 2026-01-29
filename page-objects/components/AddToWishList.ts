import { Page, Locator } from "@playwright/test";  
import { ENDPOINT } from "../../constant/endpoint";
import { BaseComponent } from "../base/BaseComponent";
import { expect } from "../../test/fixtures/fixture";

//I see you forgot renamed and changed this class)
export class FaqSectionComponent extends BaseComponent {
    readonly wishList: Locator;
    readonly result: Locator;
    readonly link: Locator;
    readonly noresult: Locator;
    
    constructor(page: Page, root: string = ".faq-section") {
    super(page, root);

    this.wishList = this.within('a[href="/account/wishlist"]');
    this.result = this.within("div.text-ash");
    this.link = this.within('a[data-form-id*="addProductToCart"]');  
    this.noresult = this.within('img.empty-img'); 
    }

    async verifyWishListHaveCorrectUrl(): Promise<void> {
       await expect(this.wishList).toHaveAttribute("href", ENDPOINT.wishlist);
    }

    async verifyWishListPage(): Promise<void> {
       await expect(this.result).toHaveAttribute("href", ENDPOINT.wishlist);
    }

    async verifyWishListLink(): Promise<void> {
       await expect(this.link).toHaveAttribute("href", ENDPOINT.wishlist);
   }

    async verifyNoResult(): Promise<void> {
       await expect(this.noresult).toHaveAttribute("href", ENDPOINT.wishlist);
   }

   async verifyPageIsDisplayed() {
      await expect(this.page).toHaveURL(/wishlist/);
   }



}


