import { DataTable } from "playwright-bdd";
import { Then } from "../../../fixtures/fixture";

Then("I click on Lens Type section", async ({ contactLensesProductPage }) => {
  await contactLensesProductPage.lensType.clickOnLensTypeSection();
});

Then(
  "the following Progressive lens options should be displayed:",
  async ({ contactLensesProductPage }, dataTable: DataTable) => {
    const entries = dataTable.hashes();

    for (const { ProgressiveOption } of entries) {
      await contactLensesProductPage.lensType.verifyProgressiveLensType(
        ProgressiveOption,
      );
    }
  },
);

Then(
  "the following Bifocal lens options should be displayed:",
  async ({ contactLensesProductPage }, dataTable: DataTable) => {
    const entries = dataTable.hashes();

    for (const { BifocalOption } of entries) {
      await contactLensesProductPage.lensType.verifyBifocalLensType(
        BifocalOption,
      );
    }
  },
);

Then(
  "the user views {string} options",
  async ({ contactLensesProductPage }, title: string) => {
    await contactLensesProductPage.lensType.verifySubtitle(title);
  },
);
