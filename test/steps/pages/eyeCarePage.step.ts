import { Given, When, Then } from "../../fixtures/fixture";

Given("I visit the eye care page", async ({ eyeCarePage }) => {
  await eyeCarePage.open();
});
