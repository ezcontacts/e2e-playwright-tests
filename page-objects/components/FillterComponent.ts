import { Page, Locator, expect } from "@playwright/test";
import { BaseComponent } from "../base/BaseComponent";
import { escapeRegex, toFilterFormat } from "../../helpers/filterHelper";

export class FillterComponent extends BaseComponent {
  readonly inStock: Locator;
  readonly searchField: Locator;
  readonly brands: Locator;
  readonly menuMobile: Locator;
  readonly ratingTab: Locator;
  readonly brandTab: Locator;
  readonly resetLink: Locator;
  readonly brandItem: Locator;
  readonly priceTab: Locator;

  readonly currentFilter: (label: string) => Locator;
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
    this.resetLink = this.locator(".clear_all_selected_facets");
    this.brandItem = this.within(".brand-selection-desktop li");
    this.priceTab = this.within(".v_price .has-pretty-child label");
    this.currentFilter = (label: string) => {
      const safe = escapeRegex(label);

      const filterLocator = this.locator("a.selected-facet-delete").filter({
        hasText: new RegExp(`^${safe}×?$`),
      });
      return filterLocator;
    };

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

  async verifyResetAllFiltersIsVisible(): Promise<void> {
    await expect(this.resetLink).toBeVisible();
  }

  async verifyAppliedFilterIsVisible(filter: string): Promise<void> {
    const filterLocator = this.currentFilter(filter);

    await expect(filterLocator).toBeVisible();
  }

  async verifyAppliedFilterIsNotExist(filter: string): Promise<void> {
    const filterLocator = this.currentFilter(filter);

    await expect(filterLocator).toHaveCount(0);
  }

  //TODO
  async verifyIsNotFilters(): Promise<void> {
    const count = await this.brandItem.count();

    for (let i = 0; i < count; i++) {
      const item = this.brandItem.nth(i);
      const checkbox = item.locator("a");
      await expect(checkbox).not.toHaveClass(/checked/);
    }
  }

  async clickResetAllFiltersIsVisible(): Promise<void> {
    await this.resetLink.click();
    await this.waitForDomContentLoad();
  }

  async clickOnFirstRatingFilter(): Promise<void> {
    await this.ratingTab.first().click();
    await this.waitForDomContentLoad();
  }

  async clickOnGanderLabel(label: string): Promise<void> {
    await this.genderTab(label).click();
    await this.waitForDomContentLoad();
  }

  async clickOnFirstBrand(): Promise<string> {
    const item = this.brandItem.nth(0);
    const label = item.locator("label");
    await label.click();
    await this.waitForDomContentLoad();
    const text = await label.innerText();
    const brandName = toFilterFormat(text);
    await this.page.waitForTimeout(5_000);
    return brandName;
  }

  async clickOnBrandWithCountItems(countItems: number): Promise<string[]> {
    const count = await this.brandItem.count();
    const checkedBrands: string[] = [];

    for (let i = 0; i < count; i++) {
      if (checkedBrands.length > 5) break;

      const item = this.brandItem.nth(i);
      const label = item.locator("label");

      const text = await label.innerText();
      const match = text.match(/\((\d+)\)/);
      if (!match) continue;

      const number = Number(match[1]);

      if (number > countItems) {
        const brandName = toFilterFormat(text);
        checkedBrands.push(brandName);

        try {
          const closePromoteBtn = this.page
            .frameLocator("iframe#attentive_creative")
            .getByTestId("closeIcon");
          await closePromoteBtn.waitFor({ timeout: 5_000 });
          await closePromoteBtn.click();
        } catch (e) {}

        await label.click();
      }
    }

    await this.waitForDomContentLoad();
    await this.page.waitForTimeout(5_000);

    return checkedBrands;
  }

  async clickOnFirstBrandWithCountItems(countItems: number): Promise<string[]> {
    const count = await this.brandItem.count();
    const checkedBrands: string[] = [];

    for (let i = 0; i < count; i++) {
      if (checkedBrands.length > 5) break;

      const item = this.brandItem.nth(i);
      const label = item.locator("label");

      const text = await label.innerText();
      const match = text.match(/\((\d+)\)/);
      if (!match) continue;

      const number = Number(match[1]);

      if (number > countItems) {
        const brandName = toFilterFormat(text);
        checkedBrands.push(brandName);

        try {
          const closePromoteBtn = this.page
            .frameLocator("iframe#attentive_creative")
            .getByTestId("closeIcon");
          await closePromoteBtn.waitFor({ timeout: 5_000 });
          await closePromoteBtn.click();
        } catch (e) {}

        await label.click();
        break;
      }
    }

    await this.waitForDomContentLoad();
    await this.page.waitForTimeout(5_000);

    return checkedBrands;
  }

  async clickOnBrandByIndex(index: number): Promise<void> {
    await this.brandTab.nth(index).click();
    await this.waitForDomContentLoad();
  }

  async clickOnPriceFilterByIndex(index: number): Promise<string[]> {
    const checkedPrices: string[] = [];

    const priceTab = this.priceTab.nth(index);
    await priceTab.click();
    await this.waitForDomContentLoad();
    await this.page.waitForTimeout(5_000);

    const brandName = toFilterFormat(await priceTab.innerText());

    checkedPrices.push(brandName);
    return checkedPrices;
  }

  async removeFilterByName(filter: string): Promise<void> {
    const filterLocator = this.currentFilter(filter);

    await filterLocator.click();
    await filterLocator.waitFor({ state: "detached" });
  }

  async verifyOnBrandWithCountItemsIsChecked(
    countItems: number,
  ): Promise<void> {
    const count = await this.brandItem.count();

    for (let i = 0; i < count; i++) {
      if (i > 5) break;

      const item = this.brandItem.nth(i);
      const label = item.locator("label");

      const text = await label.innerText();
      const match = text.match(/\((\d+)\)/);

      if (!match) continue;

      const number = Number(match[1]);
      const checkbox = item.locator('input[type="checkbox"]');
      if (number > countItems) {
        await expect(checkbox).toHaveAttribute("checked");
      }
    }
  }
}
