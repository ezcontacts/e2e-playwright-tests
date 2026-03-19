import { Given, When, Then } from "../../fixtures/fixture";

Given("I visit the contact lenses page", async ({ contactLensesPage }) => {
  await contactLensesPage.open();
});

When("I select contact lens details", async ({ contactLensesProductPage }) => {
  await contactLensesProductPage.enterPrescription.clickOnSamePrescriptionForBothEyesCheckbox();
  await contactLensesProductPage.enterPrescription.selectAllSphereValue(1);
  await contactLensesProductPage.enterPrescription.selectHowManyValueIfExist(2);
});

When(
  "I select contact lens details on Contact Lenses Product Page",
  async ({ contactLensesProductPage }) => {
    await contactLensesProductPage.clickOnAddToCart();
  },
);
