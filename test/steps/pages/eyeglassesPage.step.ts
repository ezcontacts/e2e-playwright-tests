import { Given, Then } from "../../fixtures/fixture";

Given("I visit the eyeglasses page", async ({ eyeglassesPage }) => {
  await eyeglassesPage.open();
});
