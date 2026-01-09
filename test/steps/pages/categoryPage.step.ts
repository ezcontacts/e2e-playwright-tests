import { Given, When, Then } from "../../fixtures/fixture";
import { TOKEN_ENDPOINT } from '../../../constant/tokens';

Given('the user visite {string} page',
  async ({ sunglassesPage }, category: string) => {
    await sunglassesPage.openByEndpoint(TOKEN_ENDPOINT[category]);
  }
);

When('the user selects {string} from the Products per page dropdown',
  async ({ sunglassesPage }, text: string) => {
    await sunglassesPage.setProductCountDropdownValue(text);
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