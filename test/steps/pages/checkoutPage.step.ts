import { Given, When, Then } from "../../fixtures/fixture";

Then("I should proceed to the checkout page", async ({ checkoutPage }) => {
    await checkoutPage.verifyUrl();
});