import { Given, When, Then } from "../../fixtures/fixture";

Given("I visit the Contact Us page", async ({ contactUsPage }) => {
  await contactUsPage.open();
});

When(
  "I click on the {string} link in the Contact Us page",
  async ({ contactUsPage }, topic) => {
    await contactUsPage.clickOnTopic(topic);
  }
);

Then("I open the topic dropdown", async ({ contactUsPage }) => {
  await contactUsPage.openTopicDropdown();
});

Then("I should see the available contact topics", async ({ contactUsPage }) => {
  await contactUsPage.verifyAvailableTopics();
});
