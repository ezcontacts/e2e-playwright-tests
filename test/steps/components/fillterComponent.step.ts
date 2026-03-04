import { DataTable } from "playwright-bdd";
import { Given, When, Then } from "../../fixtures/fixture";
import { CardState } from "../../../page-objects/components/ProductCardComponent";

let catalogState: CardState[];
let filters: Array<string> = [];

When("the user applies a filter", async ({ eyeglassesPage }) => {
  await eyeglassesPage.fillter.clickOnBrandWithCountItems(30);
});

When("the user applies multiple filters", async ({ eyeglassesPage }) => {
  filters = [];

  filters.push(
    ...(await eyeglassesPage.fillter.clickOnBrandWithCountItems(30)),
  );
  filters.push(...(await eyeglassesPage.fillter.clickOnPriceFilterByIndex(0)));
});

When(
  "the user clicks the Reset All Filters button",
  async ({ eyeglassesPage }) => {
    await eyeglassesPage.fillter.clickResetAllFiltersIsVisible();
  },
);

Then(
  "the applied filters should be displayed above the product listing section",
  async ({ eyeglassesPage }) => {},
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
    await eyeglassesPage.fillter.verifyOnBrandWithCountItemsIsChecked(30);
  },
);

Then(
  "the product results should remain filtered",
  async ({ eyeglassesPage }) => {
    await eyeglassesPage.fillter.verifyOnBrandWithCountItemsIsChecked(30);
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
