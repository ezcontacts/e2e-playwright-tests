import { Page, Locator, expect } from "@playwright/test";
import { BaseComponent } from "../base/BaseComponent";

export class FillterComponent extends BaseComponent {
  readonly inStock: Locator;
  readonly searchField: Locator;
  readonly brands: Locator;
  readonly menuMobile: Locator;
  readonly ratingTab: Locator;
  readonly brandTab: Locator;

  readonly genderTab: (label: string) => Locator;
  readonly genderCheckbox: (label: string) => Locator;
  readonly typeLabel: (label: string) => Locator;

  constructor(page: Page, root: string = ".contacts-wrap") {
    super(page, root);

    this.inStock = this.within("#v_quickship_uFilter_true");
    this.searchField = this.within("input.brand-input");
    this.brands = this.within(".brand-list li");
    this.menuMobile = this.within(".fa-bars");
    this.ratingTab = this.within(".unbxd_rating_average_uFilter li");

    this.genderTab = (label: string) =>
      this.page.locator(".gender_uFilter li", {
        has: this.page.locator("label.label-element", {
          hasText: new RegExp(label),
        }),
      });

    this.genderCheckbox = (label: string) =>
      this.genderTab(label).locator("input");

    this.typeLabel = (label: string) =>
      this.page.locator(".frame_type_uFilter", {
        hasText: new RegExp(label),
      });

    this.brandTab = this.locator(".brand-selection-desktop li");
  }

  async verifyGenderLabelIsVisible(label: string): Promise<void> {
    const labelLocator = this.genderTab(label);
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

  async verifyGanderIsChecked(label: string): Promise<void> {
    const checkbox = await this.genderCheckbox(label);
    await expect(checkbox).toBeChecked();
  }

  async clickOnFirstRatingFilter(): Promise<void> {
    await this.ratingTab.first().click();
    await this.waitForDomContentLoad();
    await this.ratingTab
      .first()
      .locator(".checked")
      .waitFor({ state: "visible", timeout: 30000 });
  }

  async clickOnGanderLabel(label: string): Promise<void> {
    await this.genderTab(label).click();
    await this.waitForDomContentLoad();
  }

  async clickOnBrandWithCountItems(countItems: number): Promise<void> {
    const items = this.page.locator(".brand-selection-desktop li");
    const count = await items.count();

    for (let i = 0; i < count; i++) {
      const item = items.nth(i);
      const label = item.locator("label");

      const text = await label.innerText();
      const match = text.match(/\((\d+)\)/);
      if (!match) continue;

      const number = Number(match[1]);

      if (number > countItems) {
        console.log("Found:", text);
        await label.click();
      }
    }

    await this.waitForDomContentLoad();
    await this.page.waitForTimeout(10_000);
  }

  async verifyOnBrandWithCountItemsIsChecked(
    countItems: number,
  ): Promise<void> {
    const items = this.page.locator(".brand-selection-desktop li");
    const count = await items.count();

    for (let i = 0; i < count; i++) {
      const item = items.nth(i);
      const label = item.locator("label");

      const text = await label.innerText();
      const match = text.match(/\((\d+)\)/);
      if (!match) continue;

      const number = Number(match[1]);
      const checkbox = item.locator('input[type="checkbox"]');
      console.log("ItemStep " + i);
      if (number > countItems) {
        await expect(checkbox).toHaveAttribute("checked");
      }
    }
  }
}
