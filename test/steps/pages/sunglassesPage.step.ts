import { Given, Then } from "../../fixtures/fixture";

Given("I visit the sunglasses page", async ({ sunglassesPage }) => {
  await sunglassesPage.open();
});
