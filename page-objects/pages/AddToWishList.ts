import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { ENDPOINT } from "../../constant/endpoint";

//I recomend to use 'Page' suffix for page object classes for Exemple: AddToWishListPage
export class AddToWishList extends BasePage { 
  constructor(page: Page) {
    super(page, ENDPOINT.wishlist);
  }

   
}