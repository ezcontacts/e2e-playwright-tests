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
