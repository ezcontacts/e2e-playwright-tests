import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { ENDPOINT } from "../../constant/endpoint";
import { PrescriptionDetailsComponent } from "../components/product-components/PrescriptionDetailsComponent";
import { CoatingComponent } from "../components/product-components/CoatingComponent";
import { LensMaterialComponent } from "../components/product-components/LensMaterialComponent";
import { LensColorComponent } from "../components/product-components/LensColorComponent";

export class ProductPage extends BasePage {
  readonly productTitle: Locator;
  readonly priceTitle: Locator;
  readonly prescriptionType: Locator;
  readonly addCart: Locator;
  readonly productName: Locator;
  readonly price: Locator;
  readonly productImage: Locator;
  readonly colorDropdown: Locator;
  readonly addToWishlist: Locator;
  readonly shipAvailability: Locator;

  readonly productDescription: (value: string) => Locator;

  readonly prescriptionDetails: PrescriptionDetailsComponent;
  readonly lensMaterial: LensMaterialComponent;
  readonly coating: CoatingComponent;
  readonly lensColor: LensColorComponent;

  constructor(page: Page) {
    super(page, ENDPOINT.login);

    this.productTitle = this.locator("h2.product-name");
    this.priceTitle = this.locator("span.curr-price");
    this.prescriptionType = this.locator(
      ".prescription-type-section .ezMarkLabel"
    );

    this.addCart = this.locator(
        ".add-cart-full-wd",
        ".visible-xs .add-to-cart-btn"
      );

    this.productName = this.locator(
      "h2.product-name.margin-top-5",
      ".col-sm-8 > .product-name"
    );

    this.price = this.locator(
      ".pdp-price .curr-price",
      ".mobilePrice-ash + .curr-price"
    );

    this.productImage = this.locator("#zoom-img", "img.main-img-zoom");
    this.colorDropdown = this.locator("select#new-color");

    this.productDescription = (value: string) => {
      return this.locator(".product-description").getByText(value);
    };

    this.addToWishlist = this.locator(".add-to-wishlist-btn");
    this.shipAvailability = this.locator("#shipAvailability");

    this.prescriptionDetails = new PrescriptionDetailsComponent(this.page);
    this.lensMaterial = new LensMaterialComponent(this.page);
    this.coating = new CoatingComponent(this.page);
    this.lensColor = new LensColorComponent(
      this.page,
      this.getPlatformSelector("li#step-7", "#step-7")
    );
  }

  async open(): Promise<void> {
    throw new Error("ProductPage has not static endpoint");
  }

  async clickOnAddToCart(): Promise<void> {
    await this.safeClickAndWaitForNetworkIdle(this.addCart);
  }

  async clickOnPrescriptionType(index: number): Promise<void> {
    await this.prescriptionType.nth(index).click();
  }

  async verifyProductTitleIsVisible(): Promise<void> {
    await expect(this.productName).toBeVisible();
  }

  async verifyPriceIsVisible(): Promise<void> {
    await expect(this.price).toBeVisible();
  }

  async verifyImageIsVisible(): Promise<void> {
    await expect(this.productImage).toBeVisible();
  }

  async verifyColorDropdownIsVisible(): Promise<void> {
    await expect(this.colorDropdown).toBeVisible();
  }

  async verifyProductDescriptionIsVisible(value: string): Promise<void> {
    const description = this.productDescription(value);
    await expect(description).toBeVisible();
  }

  async verifyAddToCartBtnIsVisible(): Promise<void> {
    await expect(this.addCart).toBeVisible();
  }

  async verifyAddToWishlistBtnIsVisible(): Promise<void> {
    await expect(this.addToWishlist).toBeVisible();
  }

  async verifyShipAvailabilityIsVisible(): Promise<void> {
    await expect(this.shipAvailability).toBeVisible();
  }
}
