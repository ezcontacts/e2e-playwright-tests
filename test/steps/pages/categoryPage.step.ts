import { Given, When, Then } from "../../fixtures/fixture";
import { TOKEN_ENDPOINT } from '../../../constant/tokens';
import { FILTER_VALUE } from "../../data-test/testData";
import { CardState } from "../../../page-objects/components/ProductCardComponent";
import { MatchFilterType } from "../../data-test/productTypes";

let catalogCardStates: CardState[]; 

Given('the user visite {string} page',
  async ({ sunglassesPage }, category: string) => {
    await sunglassesPage.openByEndpoint(TOKEN_ENDPOINT[category]);
  }
);

Given('the user views a product with no reviews on the listing page',
  async ({ sunglassesPage }) => {
    await sunglassesPage.setProductMatchDropdownValue(MatchFilterType.NEWEST);
  }
);

Given('the user views a product on the listing page',
  async ({ sunglassesPage }) => { 
    catalogCardStates = await sunglassesPage.getCatalogState();
  }
);

When('the user navigates to the next page using pagination',
  async ({ sunglassesPage }) => {
    await sunglassesPage.clickOnPaginationButton(1);
  }
);

When('the user refreshes the Product Listing page',
  async ({ sunglassesPage }) => {
    await sunglassesPage.reloadPage();
  }
);


When('the user selects {string} from the Products per page dropdown',
  async ({ sunglassesPage }, text: string) => {
    await sunglassesPage.setProductCountDropdownValue(text);
  }
);

When('the user selects {string} from the Sort By dropdown',
  async ({ sunglassesPage }, text: string) => {
    await sunglassesPage.setProductMatchDropdownValue(text);
    await sunglassesPage.verifyProductMatchDropdownIsHaveValue(FILTER_VALUE[text].value);
  }
);

When('set first rating filter',
  async ({ sunglassesPage }) => {
    await sunglassesPage.promotion.closeDynamicPopupIfPresent();
    await sunglassesPage.fillter.clickOnFirstRatingFilter();
  }
);

Then('the Products per page dropdown should be visible',
  async ({ sunglassesPage }) => {
    await sunglassesPage.verifyProductCountDropdownIsVisible();
  }
);

Then('the default 30 products per page value should be selected',
  async ({ sunglassesPage }) => {
    await sunglassesPage.verifyProductCountDropdownIsHaveValue('30');
  }
);

Then(
  'the Product Listing page should display {string} products per page',
  async ({ sunglassesPage }, countStr: string) => {
    const count = Number(countStr);
    const card = await sunglassesPage.productCard(0);
    await card.verifyQuantityCart(count);
  }
);

Then(
  'the products should be sorted according to {string}',
  async ({ sunglassesPage }, text: string) => {
    await sunglassesPage.verifyUrlEndpoint(FILTER_VALUE[text].endpoint);
  }
);

Then(
  'the Sort By dropdown should be visible',
  async ({ sunglassesPage }) => {
    await sunglassesPage.verifyProductMatchDropdownIsVisible();
  }
);

Then(
  'the Sort By dropdown should display {string} option as by default selected option',
  async ({ sunglassesPage }, text: string) => {
    await sunglassesPage.verifyProductMatchDropdownIsHaveValue(FILTER_VALUE[text].value);
  }
);

Then(
  'each product icon should display the product name below it',
  async ({ sunglassesPage }) => {
    await sunglassesPage.verifyProductTitlesIsVisible();
  }
);

Then(
  'each product icon should display review data below it',
  async ({ sunglassesPage }) => {
    await sunglassesPage.verifyProductReviewsIsVisible();
  }
);

Then(
  'the review data should include rating and review count',
  async ({ sunglassesPage }) => {
    await sunglassesPage.verifyProductReviewsIsVisible();
    await sunglassesPage.verifyProductRatingsIsVisible();
  }
);

Then(
  'the product name and review data should remain visible and unchanged',
  async ({ sunglassesPage}) => {
    await sunglassesPage.verifyCatalogState(catalogCardStates);
  }
);

Then(
  'the product should display only the product name',
  async ({ sunglassesPage}) => {
    const card = await sunglassesPage.getLastCard();
    await card.verifyTitleIsVisible();
  }
);

Then(
  'the review section should not be displayed',
  async ({ sunglassesPage}) => {
    const card = await sunglassesPage.getLastCard();
    await card.verifyRatingIsNotExist();
    await card.verifyReviewsIsNotExist();
  }
);

Then(
  'the product name and review data should be aligned correctly below the product icon',
  async ({ sunglassesPage}) => {
    await sunglassesPage.verifyInfoCardsIsCenter();
  }
);

Then(
  'the product name and review data should be displayed correctly for all products',
  async ({ sunglassesPage}) => {
    await sunglassesPage.verifyProductTitlesIsVisible();
  }
);
