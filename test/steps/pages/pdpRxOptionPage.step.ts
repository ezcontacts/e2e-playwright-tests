import { expect, Then, When } from "../../fixtures/fixture";
import { DataTable } from "playwright-bdd";
import { mapOptionBySection, isSectionName } from "../../../utils/optionsMapping";
import { RxPageType } from "../../data-test/productTypes";

Then(
  'I should see the {string} label', async ({ PdpRxOptionPage }, expectedText: string) => {
    await PdpRxOptionPage.verifyRxSection(expectedText);
    console.log("Visible Options:", await PdpRxOptionPage.RxStep2Section.textContent());
});

Then(
  'I should see the following options under the {string} section on the {string} page:',
  async ({ PdpRxOptionPage },sectionName: string,pageType: string,dataTable: DataTable) => {

    const options = dataTable.hashes().map(
      (row) => row['Option']
    );

    await PdpRxOptionPage.verifyOptions(
      pageType as RxPageType,
      sectionName,
      options
    );

    const visibleOptions =
      await PdpRxOptionPage.getVisibleOptions(
        pageType as RxPageType,
        sectionName
      );
    console.log('Visible Options:', visibleOptions);
  }
);

//this step is added to click the "Add to Cart" button from the PDP page
Then(
  'I click the Add to Cart button', async ({ PdpRxOptionPage }) => {
    await PdpRxOptionPage.clickAddToCart();
});

// This step is added to click the "Add Rx" button from the cart page
Then(
  'I click the "Add Rx" button', async ({ PdpRxOptionPage }) => {
    await PdpRxOptionPage.clickAddRxButton();
}); 

