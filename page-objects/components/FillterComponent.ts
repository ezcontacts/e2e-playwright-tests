import { Page, Locator, expect } from "@playwright/test";
import { BaseComponent } from "../base/BaseComponent";

export class FillterComponent extends BaseComponent {
  readonly inStock: Locator;
  readonly searchField: Locator;
  readonly brands: Locator;
  readonly menuMobile: Locator;
  readonly ratingTab: Locator;

  readonly genderLabel: (label: string) => Locator;
  readonly typeLabel: (label: string) => Locator;

  constructor(page: Page, root: string = ".contacts-wrap") {
    super(page, root);

    this.inStock = this.within("#v_quickship_uFilter_true");
    this.searchField = this.within("input.brand-input");
    this.brands = this.within(".brand-list li");
    this.menuMobile = this.within(".fa-bars");
    this.ratingTab = this.within(".unbxd_rating_average_uFilter li");

    this.genderLabel = (label: string) =>
      this.page.locator(".gender_uFilter label.label-element", {
        hasText: new RegExp(label),
      });

    this.typeLabel = (label: string) =>
      this.page.locator(".frame_type_uFilter", {
        hasText: new RegExp(label),
      });
  }

  async verifyGenderLabelIsVisible(label: string): Promise<void> {
    const labelLocator = this.genderLabel(label);
    await expect(labelLocator).toBeVisible();
  }

  async verifyTypeLabelIsVisible(label: string): Promise<void> {
    const labelLocator = this.typeLabel(label);
    await expect(labelLocator).toBeVisible();
  }

  async verifyInStockIsVisible(): Promise<void> {
    if (this.isMobile()) {
      await this.menuMobile.click();
    }

    await expect(this.inStock).toHaveCount(1);
  }

  async verifySearchFieldIsVisible(): Promise<void> {
    await expect(this.searchField).toBeVisible();
  }

  async verifyBrandMustBeExist(): Promise<void> {
    const count = await this.brands.count();
    await expect(count).toBeGreaterThan(0);
  }

  async clickOnFirstRatingFilter(): Promise<void>{
    await this.ratingTab.first().click();
    await this.waitForDomContentLoad();
  }
}
