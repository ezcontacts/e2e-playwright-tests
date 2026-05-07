import { expect, Then, When } from "../../fixtures/fixture";
import { DataTable } from "playwright-bdd";
import { mapOptionBySection, isSectionName } from "../../../utils/optionsMapping";

Then(
  'I should see the {string} label', async ({ PdpRxOptionPage }, expectedText: string) => {
    await PdpRxOptionPage.verifyRxSection(expectedText);
    console.log("Visible Options:", await PdpRxOptionPage.RxStep2Section.textContent());
});

Then(
  'I should see the following options under the {string} section:',
    async ({ PdpRxOptionPage }, sectionName: string, dataTable: DataTable) => {

    if (!isSectionName(sectionName)) {
      throw new Error(`Invalid section: ${sectionName}`);
    }

    const options = dataTable.hashes().map((row) =>
      mapOptionBySection(sectionName, row['Option'])
    );

    //Print the Rx options to the console
    await PdpRxOptionPage.verifyOptions(sectionName, options);
    const visibleOptions = await PdpRxOptionPage.getVisibleOptions(sectionName);

    console.log("Visible Options:", visibleOptions);
  }
);

Then('I click the Add to Cart button', async ({ PdpRxOptionPage }) => {
  await PdpRxOptionPage.clickAddToCart();
});

Then('I click the Add Rx button', async ({ PdpRxOptionPage }) => {
  await PdpRxOptionPage.clickAddRxButton();
}); 