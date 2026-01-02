import { Page } from "@playwright/test";
import { ENDPOINT } from "../../../constant/endpoint";
import { ProductCatalogePage } from "./ProductCatalogePage";

export class ContactLensesPage extends ProductCatalogePage {
  constructor(page: Page) {
    super(page, ENDPOINT.contactLenses);
  }
}
