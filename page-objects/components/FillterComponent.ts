import { Page, Locator, expect } from "@playwright/test";
import { BaseComponent } from "../base/BaseComponent";

export class FillterComponent extends BaseComponent {
  readonly inStock: Locator;
  readonly searchField: Locator;
  readonly genderLabel: (label: string) => Locator;
  readonly typeLabel: (label: string) => Locator;

  constructor(page: Page, root: string = ".contacts-wrap") {
    super(page, root);

    this.inStock = this.page.locator("#v_quickship_uFilter_true");

    this.genderLabel = (label: string) =>
      this.page.locator(".gender_uFilter label.label-element", {
        hasText: new RegExp(label),
      });

    this.typeLabel = (label: string) =>
      this.page.locator(".frame_type_uFilter", {
        hasText: new RegExp(label),
      });

    this.searchField = this.page.locator("input.brand-input");
  }

  async verifyGenderLabelIsVisible(label: string): Promise<void> {
    const labelLocator = this.genderLabel(label);
    await expect(labelLocator).toHaveCount(1);
  }

  async verifyTypeLabelIsVisible(label: string): Promise<void> {
    const labelLocator = this.typeLabel(label);
    await expect(labelLocator).toHaveCount(1);
  }

  async verifyInStockIsVisible(): Promise<void> {
    await expect(this.inStock).toHaveCount(1);
  }

  async verifySearchFieldIsVisible(): Promise<void> {
    await expect(this.searchField).toBeVisible();
  }

  async verifyBrandMustBeExist(): Promise<void> {
    const count = await this.page.locator(".brand-list li").count();
    expect(count).toBeGreaterThan(0);
  }
}
