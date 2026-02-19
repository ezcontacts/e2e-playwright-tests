import { When } from "../../fixtures/fixture";

When(
  "I click on the first product card in the list",
  async ({ sunglassesPage, page }) => {
    await sunglassesPage.clickOnProductByIndex(0);

    console.log("After product click URL:", page.url());
  }
);
