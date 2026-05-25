import { When } from "../../fixtures/fixture";

When("I login Facebook", async ({ facebookPage }) => {
  await facebookPage.login();
});

When("I continue login Facebook", async ({ facebookPage }) => {
  await facebookPage.clickContinue();
});

When("I cancel login Facebook", async ({ facebookPage }) => {
  await facebookPage.clickCancel();
});
