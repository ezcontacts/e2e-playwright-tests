import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { ENDPOINT } from "../../constant/endpoint";

// TODO by M. Potrys: You can use AccountPage
export class MyAccountPage extends BasePage { 
  constructor(page: Page) {
    super(page, ENDPOINT.accountMain);
    //pending to define the "myAccount".
  }
}
