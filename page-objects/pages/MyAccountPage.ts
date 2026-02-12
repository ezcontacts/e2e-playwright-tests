import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { ENDPOINT } from "../../constant/endpoint";


export class MyAccountPage extends BasePage { 
  constructor(page: Page) {
    super(page, ENDPOINT.myAccount);
    //pending to define the "myAccount".
  }
}
