import { AccountMenu } from "../../../data-test/productTypes";
import { Given, When, Then } from "../../../fixtures/fixture";

When("the user selects {string} from the My Account menu", async ({ accountPage }, text: string) => {
  await accountPage.menu.ClickOnMenuBtn(text);
});

Then("the Ez Points page should be displayed", async ({ accountPage }) => {
  await accountPage.verifyTitleHaveText(AccountMenu.EzPoints);
});

Then("the page URL should contain URL as: {string}", async ({ accountPage }, text: string) => {
  await accountPage.verifyUrlEndpoint(text);
});
