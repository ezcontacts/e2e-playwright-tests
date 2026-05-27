import { MESSAGE, PRODUCT } from "../../data-test/testData";
import {
  LensCoatingType,
  LensColorType,
  LensMaterialType,
} from "../../data-test/productTypes";
import { Given, Then, When } from "../../fixtures/fixture";
import { DataTable } from "playwright-bdd";

When("I add the product to the cart", async ({ productPage, page }) => {
  await productPage.clickOnAddToCart();

  console.log("After add to cart URL:", page.url());
});

When("I select the prescription type", async ({ productPage }) => {
  await productPage.clickOnPrescriptionType(0);
});

When("I select the Progressive\\/Bifocal type", async ({ productPage }) => {
  await productPage.clickOnPrescriptionType(2);
});

When(
  "I fill prescription details for the right eye",
  async ({ productPage }) => {
    await productPage.prescriptionDetails.rightEye.selectSphereValue(1);
    await productPage.prescriptionDetails.rightEye.selectCylinderValue(1);
    await productPage.prescriptionDetails.rightEye.selectAxisValue(1);
    await productPage.prescriptionDetails.rightEye.selectAddValue(1);
  },
);

When(
  "I fill prescription details for the left eye",
  async ({ productPage }) => {
    await productPage.prescriptionDetails.leftEye.selectSphereValue(1);
    await productPage.prescriptionDetails.leftEye.selectCylinderValue(1);
    await productPage.prescriptionDetails.leftEye.selectAxisValue(1);
    await productPage.prescriptionDetails.leftEye.selectAddValue(1);
  },
);

When(
  "I fill prescription details for the pupil distance",
  async ({ productPage }) => {
    await productPage.prescriptionDetails.selectPupilDistanceValue(1);
    await productPage.prescriptionDetails.clickOnContinueBtn();
  },
);

When(
  "I fill pupil, lens material, coating, and lens color",
  async ({ productPage }) => {
    await productPage.prescriptionDetails.selectPupilDistanceValue(1);
    await productPage.prescriptionDetails.clickOnContinueBtn();

    await productPage.lensMaterial.setLensMaterial(
      LensMaterialType.SuperThinHiIndex167,
    );
    await productPage.lensMaterial.clickOnContinueBtn();

    await productPage.coating.selectCoating(LensCoatingType.StandardAR);
    await productPage.coating.clickOnContinueBtn();

    await productPage.lensColor.setLensColor(LensColorType.Clear);
    await productPage.lensColor.clickOnCompliteBtn();
  },
);

When("I click on Buy Frames Only button", async ({ productPage }) => {
  await productPage.clickOnBuyFramesOnlyBtn();
});

When(
  "the user hovers over the wishlist heart icon",
  async ({ productPage }) => {
    await productPage.hoverOverAddToWishlistBtn();
  },
);

When("the user moves the cursor away", async ({ productPage }) => {
  await productPage.resetСursor();
});

When("the user clicks the wishlist add link", async ({ productPage }) => {
  await productPage.clickOnAddToWishlistBtn();
});

Then(
  "a tooltip with text {string} should be displayed",
  async ({ productPage }, text: string) => {
    await productPage.verifyWithlistTooltipText(text);
  },
);

Then("the wishlist tooltip should disappear", async ({ productPage }) => {
  await productPage.verifyWithlistTooltipNotVisible();
});

Then("I should see the product title", async ({ productPage }) => {
  await productPage.verifyProductTitleIsVisible();
});

Then("I should see the price", async ({ productPage }) => {
  await productPage.verifyPriceIsVisible();
});

Then("I should see at least one product image", async ({ productPage }) => {
  await productPage.verifyImageIsVisible();
});

Then("I should see the frame color dropdown", async ({ productPage }) => {
  await productPage.verifyColorDropdownIsVisible();
});

Then("I should see the size information", async ({ productPage }) => {
  await productPage.clickOnSpecificationsBtn();
  await productPage.verifyProductDescriptionIsVisible(
    PRODUCT.productDescription.bridgeWidth,
  );
  await productPage.verifyProductDescriptionIsVisible(
    PRODUCT.productDescription.lensWidth,
  );
  await productPage.verifyProductDescriptionIsVisible(
    PRODUCT.productDescription.armLength,
  );
});

Then(
  'I should see the "Add to Cart" button',
  async ({ productPage }, value) => {
    await productPage.verifyAddToCartBtnIsVisible();
  },
);

Then(
  'I should see the "Add to Wishlist" button',
  async ({ productPage }, value) => {
    await productPage.verifyAddToWishlistBtnIsVisible();
  },
);

Then("I should see shipping availability text", async ({ productPage }) => {
  await productPage.verifyShipAvailabilityIsVisible();
});

Then(
  "I should see the Affirm badge if product price is over $50",
  async ({ productPage }) => {},
);

Then(
  "I should see the success message for adding the product to the cart",
  async ({ cartPage }) => {
    await cartPage.message.verifyConfirmationMessage(MESSAGE.successAddToCart);
  },
);

Then(
  "I should see the {string} label in 2 step",
  async ({ productPage }, text: string) => {
    await productPage.verifyLensTypeTitleHaveText(text);
  },
);

Then(
  "I should see the following options under the {string} section on the product page:",
  async ({ productPage }, title: string, dataTable: DataTable) => {
    await productPage.verifyLensTypeHaveOptionTitle(title);

    const entries = dataTable.hashes();

    for (const { Option } of entries) {
      await productPage.verifyLensTypeHaveOption(Option);
    }
  },
);
