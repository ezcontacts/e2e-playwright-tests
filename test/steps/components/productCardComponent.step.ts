import { Then } from "../../fixtures/fixture";

Then(
  "I click on the first product card in the list",
  async ({ sunglassesPage }) => {
    await sunglassesPage.clickOnProductByIndex(1);
  }
);
