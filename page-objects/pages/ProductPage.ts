import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { ENDPOINT } from "../../constant/endpoint";
import { PrescriptionDetailsComponent } from "../components/product-components/PrescriptionDetailsComponent";
import { CoatingComponent } from "../components/product-components/CoatingComponent";
import { LensMaterialComponent } from "../components/product-components/LensMaterialComponent";
import { LensColorComponent } from "../components/product-components/LensColorComponent";
import { text } from "stream/consumers";

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
  readonly wishlistTooltip: Locator;
  readonly shipAvailability: Locator;
  readonly specificationsBtn: Locator;
  readonly contactUsImage: Locator;

  readonly lensTypeTitle: Locator;
  readonly buyFrameOnlyBtn: Locator;

  readonly lensOptionTitle: (text: string) => Locator;
  readonly lensOption: (text: string) => Locator;
  readonly lensOptionTitleModal: (text: string) => Locator;
  readonly lensOptionModal: (text: string) => Locator;

  readonly productDescription: (value: string) => Locator;

  readonly prescriptionDetails: PrescriptionDetailsComponent;
  readonly lensMaterial: LensMaterialComponent;
  readonly coating: CoatingComponent;
  readonly lensColor: LensColorComponent;
  readonly contactUsLink: Locator;

  constructor(page: Page) {
    super(page, ENDPOINT.login);

    this.productTitle = this.locator("h2.product-name");
    this.priceTitle = this.locator("span.curr-price");
    this.prescriptionType = this.locator(
      ".prescription-type-section .ezMarkLabel",
    );

    this.addCart = this.locator(
      ".add-cart-full-wd",
      ".visible-xs .add-to-cart-btn",
    );

    this.productName = this.locator(
      "h2.product-name.margin-top-5",
      ".col-sm-8 > .product-name",
    );

    this.price = this.locator(
      ".pdp-price .curr-price",
      ".mobilePrice-ash + .curr-price",
    );

    this.productImage = this.locator("#zoom-img", "img.main-img-zoom");
    this.colorDropdown = this.locator("select#new-color");
    this.specificationsBtn = this.locator("#specsLinkId");

    this.productDescription = (value: string) => {
      return this.locator(".product-description").getByText(value);
    };

    this.addToWishlist = this.locator(".add-to-wishlist-btn");
    this.wishlistTooltip = this.locator(".popover.top.in");
    this.shipAvailability = this.locator("#shipAvailability");

    this.lensTypeTitle = this.locator("#step-2 h3");
    this.buyFrameOnlyBtn = this.locator(
      ".modal-center-position.modal-dialog .btn-default",
    );
    this.contactUsImage = this.locator(".help-box img");
    this.contactUsLink = this.locator(".help-box a");

    this.lensOptionTitle = (text: string) =>
      this.locator(".other-frame-opt-mod").filter({
        hasText: new RegExp(`^${text}$`),
      });
    this.lensOption = (text: string) =>
      this.locator("#rxTypeDivEye .ezMarkLabel").filter({ hasText: text });

    this.lensOptionTitleModal = (text: string) =>
      this.page
        .frameLocator("#cartPageRxModaliFrame")
        .locator(".other-frame-opt-mod")
        .filter({
          hasText: new RegExp(`^${text}$`),
        });
    this.lensOptionModal = (text: string) =>
      this.page
        .frameLocator("#cartPageRxModaliFrame")
        .locator("#rxTypeDivEye .ezMarkLabel")
        .filter({
          hasText: text,
        });

    this.prescriptionDetails = new PrescriptionDetailsComponent(page);
    this.lensMaterial = new LensMaterialComponent(page);
    this.coating = new CoatingComponent(page);
    this.lensColor = new LensColorComponent(
      this.page,
      this.getPlatformSelector("li#step-7", "#step-7") as string,
    );
  }

  async open(): Promise<void> {
    throw new Error("ProductPage has not static endpoint");
  }

  async clickOnAddToCart(): Promise<void> {
    await this.addCart.waitFor({ state: "visible" });
    await expect(this.addCart).toBeEnabled();

    await this.addCart.click();

    try {
      await this.page.waitForURL(/\/checkout\/cart/, { timeout: 30000 });
    } catch {}
  }

  async clickOnPrescriptionType(index: number): Promise<void> {
    await this.prescriptionType.nth(index).click();
  }

  async clickOnSpecificationsBtn(): Promise<void> {
    await this.specificationsBtn.click();
  }

  async clickOnBuyFramesOnlyBtn(): Promise<void> {
    await this.waitForDomContentLoad();
    await this.buyFrameOnlyBtn.click();
  }

  async hoverOverAddToWishlistBtn(): Promise<void> {
    await this.waitForDomContentLoad();
    await this.addToWishlist.hover();
  }

  async clickOnAddToWishlistBtn(): Promise<void> {
    await this.addToWishlist.hover();
    await this.wishlistTooltip.locator("a").click();
  }

  async clickOnWishlistBtn(): Promise<void> {
    await this.addToWishlist.click();
  }

  async verifyProductIsWishlisted(): Promise<void> {
    await expect(this.addToWishlist).toContainClass("fa-heart");
  }

  async verifyProductIsNotWishlisted(): Promise<void> {
    await expect(this.addToWishlist).not.toContainClass("fa-heart");
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

  async verifyLensTypeTitleHaveText(text: string): Promise<void> {
    await expect(this.lensTypeTitle).toHaveText(text);
  }

  async verifyLensTypeHaveOptionTitle(text: string): Promise<void> {
    try {
      const title = await this.lensOptionTitle(text);
      await expect(title).toHaveText(text);
    } catch {
      await expect(this.lensOptionTitleModal(text)).toHaveText(text);
    }
  }

  async verifyLensTypeHaveOption(text: string): Promise<void> {
    try {
      const option = await this.lensOption(text);
      await expect(option).toHaveText(text);
    } catch {
      await expect(this.lensOptionModal(text)).toHaveText(text);
    }
  }

  async verifyWithlistTooltipText(text: string): Promise<void> {
    await expect(this.wishlistTooltip).toHaveText(text);
  }

  async verifyWithlistTooltipNotVisible(): Promise<void> {
    await expect(this.wishlistTooltip).not.toBeVisible();
  }

  async verifyContactUsImageVisible(): Promise<void> {
    await expect(this.contactUsImage).toBeVisible();
  }

  async verifyContactUsLinkNavigatesToSupportPage(): Promise<void> {
    const count = await this.contactUsLink.count();

    for (let i = 0; i < count; i++) {
      await expect(this.contactUsLink.nth(i)).toHaveAttribute(
        "href",
        ENDPOINT.contactUs,
      );
    }
  }
}
