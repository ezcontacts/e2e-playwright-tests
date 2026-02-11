import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { ENDPOINT } from "../../constant/endpoint";
import { AdminLoginComponent } from "../components/admin-components/AdminLoginComponent";
import { MenuComponent } from "../components/admin-components/MenuComponent";
import { CreateNewOrderComponent } from "../components/admin-components/CreateNewOrderComponent";
import { SearchOrderComponent } from "../components/admin-components/SearchOrderComponent";
import { AddProductModelComponent } from "../components/admin-components/AddProductModelComponent";

export class AdminPanelPage extends BasePage {
  readonly successMessage: (text: string) => Locator;

  readonly adminLogin: AdminLoginComponent;
  readonly menu: MenuComponent;
  readonly createNewOrder: CreateNewOrderComponent;
  readonly searchOrder: SearchOrderComponent;
  readonly addProductModelComponent: AddProductModelComponent;

  constructor(page: Page) {
    super(page, ENDPOINT.adminPanel);

    this.successMessage = (text: string) => this.locator(".gritter-title").filter({ hasText: text });

    this.adminLogin = new AdminLoginComponent(page);
    this.menu = new MenuComponent(page);
    this.createNewOrder = new CreateNewOrderComponent(page);
    this.searchOrder = new SearchOrderComponent(page);
    this.addProductModelComponent = new AddProductModelComponent(page);
  }

  async verifySuccessfulMessage(text: string): Promise<void> {
    const message = this.successMessage(text);
    await expect(message).toBeVisible();
    await expect(message).toHaveText(text);
  }
}