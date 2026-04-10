import { DataTable } from "playwright-bdd";
import { Given, When, Then } from "../../fixtures/fixture";
import { CardState } from "../../../page-objects/components/ProductCardComponent";
import { Product } from "../../../types/productType";

let catalogState: CardState[];
let filtersBrand: Array<string> = [];
let filtersPrice: Array<string> = [];
let apiState: Product[];

When("the user applies a filter", async ({ eyeglassesPage }) => {
  await eyeglassesPage.promotion.closeDynamicPopupIfPresent(30_000);
  //await eyeglassesPage.fillter.clickOnBrandWithCountItems(30);
  filtersBrand = [];
  filtersBrand.push(
    ...(await eyeglassesPage.fillter.clickOnFirstBrandWithCountItems(30)),
  );
});

When("the user applies multiple filters", async ({ eyeglassesPage }) => {
  filtersBrand = [];
  filtersPrice = [];

  filtersPrice.push(
    ...(await eyeglassesPage.fillter.clickOnPriceFilterByIndex(0)),
  );
  const apiResponse = eyeglassesPage.getCatalogeAPIState();
  const brands = await eyeglassesPage.fillter.clickOnFirstBrand();

  apiState = await apiResponse;
  filtersBrand.push(brands);
});

When(
  "the user clicks the Reset All Filters button",
  async ({ eyeglassesPage }) => {
    await eyeglassesPage.fillter.clickResetAllFiltersIsVisible();
  },
);

When(
  "the user clicks on the remove \\(X) icon for an applied filter",
  async ({ eyeglassesPage }) => {
    await eyeglassesPage.closeAttentivePopupIfPresent();
    const apiResponse = eyeglassesPage.getCatalogeAPIState();

    await eyeglassesPage.fillter.removeFilterByName(filtersBrand[0]);
    apiState = await apiResponse;
  },
);

Then(
  "only products matching all selected filter criteria should be displayed",
  async ({ eyeglassesPage }) => {
    await eyeglassesPage.verifyCatalogStateAfterFiltering(
      apiState,
      filtersBrand,
      filtersPrice,
    );
  },
);

Then("the selected filter should be removed", async ({ eyeglassesPage }) => {
  await eyeglassesPage.fillter.verifyAppliedFilterIsNotExist(filtersBrand[0]);
  filtersBrand.shift();
});

Then(
  "the applied filters should be displayed above the product listing section",
  async ({ eyeglassesPage }) => {
    const allFilters = [...filtersBrand, ...filtersPrice];
    for (const filter of filtersBrand) {
      await eyeglassesPage.fillter.verifyAppliedFilterIsVisible(filter);
    }
  },
);

Then("no filters should remain applied", async ({ eyeglassesPage }) => {
  await eyeglassesPage.fillter.verifyIsNotFilters();
});

Then(
  "Reset All Filters link should get displayed at the top left of product listing section",
  async ({ eyeglassesPage }) => {
    await eyeglassesPage.fillter.verifyResetAllFiltersIsVisible();
  },
);

Then(
  "the {string} filter toggle should exist",
  async ({ eyeglassesPage }, label: string) => {
    await eyeglassesPage.fillter.verifyInStockIsVisible();
  },
);

Then(
  "I should see gender filter options for:",
  async ({ eyeglassesPage }, dataTable: DataTable) => {
    const entries = dataTable.hashes();

    for (const { gender } of entries) {
      await eyeglassesPage.fillter.verifyGenderLabelIsVisible(gender);
    }
  },
);

Then(
  "the selected filter should remain applied",
  async ({ eyeglassesPage }) => {
    //await eyeglassesPage.fillter.verifyOnBrandWithCountItemsIsChecked(30);

    for (const filter of filtersBrand) {
      await eyeglassesPage.fillter.verifyAppliedFilterIsVisible(filter);
    }
  },
);

Then(
  "the product results should remain filtered",
  async ({ eyeglassesPage }) => {
    //await eyeglassesPage.fillter.verifyOnBrandWithCountItemsIsChecked(30);
    for (const filter of filtersBrand) {
      await eyeglassesPage.fillter.verifyAppliedFilterIsVisible(filter);
    }
  },
);

Then(
  "I should see frame type filters including:",
  async ({ eyeglassesPage }, dataTable: DataTable) => {
    const entries = dataTable.hashes();

    for (const { gender } of entries) {
      await eyeglassesPage.fillter.verifyTypeLabelIsVisible(gender);
    }
  },
);

Then("I should see the brand search input", async ({ eyeglassesPage }) => {
  await eyeglassesPage.fillter.verifySearchFieldIsVisible();
});

Then(
  "I should see a list of brand checkboxes under the brand filter",
  async ({ eyeglassesPage }) => {
    await eyeglassesPage.fillter.verifyBrandMustBeExist();
  },
);

Then(
  "all available filters should be displayed on the Product Listing page",
  async ({ eyeglassesPage }) => {
    await eyeglassesPage.fillter.verifyIsVisible();
  },
);
