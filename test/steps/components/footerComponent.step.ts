import { DataTable } from "playwright-bdd";
import { Then } from "../../fixtures/fixture";

Then("I should see the footer with policy links", async ({ homePage }) => {
  await homePage.footer.scrollToComponent();
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
  "the footer should include links in {string}:",
  async ({ homePage }, header: string, dataTable: DataTable) => {
    const links = dataTable.hashes();

    await homePage.footer.clickOnSection(header);

    for (const { linkText } of links) {
      await homePage.footer.verifyLinkIsVisible(linkText);
    }
  }
);

Then(
  "the user is viewing the footer",
  async ({ homePage }) => {
    await homePage.footer.verifyIsVisible();
  }
);

Then(
  "the {string} section should be displayed",
  async ({ homePage }, section: string) => {
    await homePage.footer.verifySectionIsVisible(section);
  }
);

Then(
  "the information text should be displayed as: {string}",
  async ({ homePage }, text: string) => {
    await homePage.footer.verifyQuestionContactUs(text);
  }
);

Then(
  "the following icons with titles should be displayed:",
  async ({ homePage }, dataTable: DataTable) => {
    const links = dataTable.hashes();

    for (const { Icon, Title } of links) {
      await homePage.footer.verifyContactUsLinkTitle(Title)
      await homePage.footer.verifyContactUsIcon(Title, Icon);
    }
  }
);

Then(
  "the user clicks on the {string}",
  async ({ homePage }, title: string) => {
    homePage.footer.clickOnContactUsIcon(title);
  }
);

Then(
  "the icon should have in link:",
  async ({ homePage }, dataTable: DataTable) => {
    const links = dataTable.hashes();
    for (const { Icon, Endpoint } of links) {
      homePage.footer.verifyContactUsLink(Icon, Endpoint);
    }
  }
);

