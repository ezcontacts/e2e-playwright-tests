import { Given, Then, When } from "../../fixtures/fixture";

Given("I visit the Online Vision Test page", async ({ onlineVisionPage }) => {
  await onlineVisionPage.open();
});

When("I click {string} button", async ({ onlineVisionPage }, text) => {
  await onlineVisionPage.clickOnVisionTestBtn(text);
});

