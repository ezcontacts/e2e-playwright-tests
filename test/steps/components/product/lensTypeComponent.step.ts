import { DataTable } from "playwright-bdd";
import { Then, When } from "../../../fixtures/fixture";

When(
  "the user selects the {string} lens type",
  async ({ contactLensesProductPage }, title: string) => {
    await contactLensesProductPage.lensType.setLensType(title);
  },
);

Then("I click on Lens Type section", async ({ contactLensesProductPage }) => {
  await contactLensesProductPage.lensType.clickOnLensTypeSection();
});

Then(
  "the following lens options should be displayed:",
  async ({ contactLensesProductPage }, dataTable: DataTable) => {
    const entries = dataTable.hashes();

    for (const { Option } of entries) {
      await contactLensesProductPage.lensType.verifyLensTypeIsVisible(Option);
    }
  },
);

Then(
  "the user views {string} options",
  async ({ contactLensesProductPage }, title: string) => {
    await contactLensesProductPage.lensType.verifySubtitle(title);
  },
);

Then(
  "the {string} option should be highlighted",
  async ({ contactLensesProductPage }, title: string) => {
    await contactLensesProductPage.lensType.verifyLensTypeIsChecked(title);
  },
);

Then(
  "the Continue button should become enabled",
  async ({ contactLensesProductPage }) => {
    await contactLensesProductPage.lensType.verifyContinueBtnIsEnabled();
  },
);

Then(
  "the user clicks the Continue button",
  async ({ contactLensesProductPage }) => {
    await contactLensesProductPage.lensType.clickOnContinueBtn();
  },
);

Then(
  "the system should redirect the user to Step-5 {string} section",
  async ({ contactLensesProductPage }) => {
    await contactLensesProductPage.lensMaterial.verifySectionIsActive();
  },
);

Then(
  "no lens type option should be selected by default",
  async ({ contactLensesProductPage }) => {
    await contactLensesProductPage.verifyEveryLensTypeNotSelectedByDefault();
  },
);
