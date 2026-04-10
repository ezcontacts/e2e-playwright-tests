import { ADMIN } from "../../../data-test/testData";
import { Given, Then, When } from "../../../fixtures/fixture";
import { DataTable } from "playwright-bdd";

When("I click on the {string} icon", async ({ wishListAddToCartPage }) => {
  await wishListAddToCartPage.clickWishListIconForFirstProduct();
});

When(
  'the user clicks the "Add to Cart" link for the product',
  async ({ wishListAddToCartPage }) => {
    await wishListAddToCartPage.clickAddToCartForFirstProduct();
  },
);

When(
  "the user deletes products in the wish list",
  async ({ wishListAddToCartPage }) => {
    await wishListAddToCartPage.clearProductExistsInWishList();
  },
);

Then(
  "I should see the product added to the wish list",
  async ({ wishListAddToCartPage }) => {
    await wishListAddToCartPage.verifyProductAddedToWishList();
  },
);

Then(
  "the product should be added to the cart",
  async ({ wishListAddToCartPage }) => {
    await wishListAddToCartPage.verifyProductAddedToCart();
  },
);

Then(
  "the user should be redirected to the Cart page",
  async ({ wishListAddToCartPage }) => {
    await wishListAddToCartPage.verifyRedirectedToCartPage();
  },
);
