import { Then } from "../../fixtures/fixture";

Then("I should see the recommended products section", async ({ homePage }) => {
  await homePage.verifyListOfRecommendedProdsVisible();
});
