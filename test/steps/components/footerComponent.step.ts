import { DataTable } from "playwright-bdd";
import { Then } from "../../fixtures/fixture";

Then("I should see the footer with policy links", async ({ homePage }) => {
  await homePage.footer.verifyPrivatePolicyIsVisible();
});

Then(
  "I should see the footer sections:",
  async ({ homePage }, dataTable: DataTable) => {
    const entries = dataTable.hashes();

    for (const { section } of entries) {
      await homePage.footer.verifySectionIsVisible(section);
    }
  }
);

Then(
  "the footer should include links:",
  async ({ homePage }, dataTable: DataTable) => {
    const links = dataTable.hashes();

    for (const { linkText } of links) {
      await homePage.footer.verifyLinkIsVisible(linkText);
    }
  }
);
