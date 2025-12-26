import { When } from "../../fixtures/fixture";

When(
  "I click on the first product card in the list",
  async ({ sunglassesPage }) => {
    await sunglassesPage.clickOnProductByIndex(0);
  }
);
