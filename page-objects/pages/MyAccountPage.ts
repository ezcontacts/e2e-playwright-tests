import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { ENDPOINT } from "../../constant/endpoint";

<<<<<<< HEAD

export class MyAccountPage extends BasePage { 
  constructor(page: Page) {
    super(page, ENDPOINT.myAccount);
=======
// TODO by M. Potrys: You can use AccountPage
export class MyAccountPage extends BasePage { 
  constructor(page: Page) {
    super(page, ENDPOINT.accountMain);
>>>>>>> ffe1dc0985ac8916777aeaf792bd0aa02b442b39
    //pending to define the "myAccount".
  }
}
