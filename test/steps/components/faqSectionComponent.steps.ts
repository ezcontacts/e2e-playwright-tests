import { Given, Then } from "../../fixtures/fixture";

Given("I visit the homepage", async ({ homePage }) => {
  await homePage.open();
});

Then(
  "I should see the FAQ section with the header {string}",
  async ({ homePage }, header: string) => {
    await homePage.faqSection.verifyHeaderContains(header);
  }
);

Then(
  "I should see the description containing {string}",
  async ({ homePage }, header: string) => {
    await homePage.faqSection.verifyDescriptionContains(header);
  }
);

Then("I should see the All FAQ’s button", async ({ homePage }) => {
  await homePage.faqSection.verifyViewAllIsVisible();
});

Then("I should be redirected to the {string} page", async ({ homePage }) => {
  await homePage.faqSection.verifyViewAllHaveCorrectUrl();
});
