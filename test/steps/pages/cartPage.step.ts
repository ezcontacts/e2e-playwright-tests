import { Given, When, Then } from "../../fixtures/fixture";

When("I click the checkout button for guest users", async ({ cartPage }) => {
    await cartPage.verifyCheckoutBtnIsVisible();
    await cartPage.clickOnCheckoutBtn();
});

Then("I should see the shopping cart title", async ({ cartPage }) => {
    await cartPage.verifyPageTitleIsVisible();
});

Then("I should see the cart number", async ({ cartPage }) => {
    await cartPage.verifyCartNumberIsVisible();
});

Then("I should see the continue shopping button", async ({ cartPage }) => {
    await cartPage.verifyContinueShoppingBtnIsVisible();
});

Then("I should see the items section with product details", async ({ cartPage }) => {
    await cartPage.verifyItemSectionIsVisible();
});

Then("I should see the product name and image", async ({ cartPage }) => {
    const item = cartPage.item(0);

    await item.verifyNameIsVisible();
    await item.verifyImageIsVisible();
});

Then("I should see the edit button", async ({ cartPage }) => {
    await cartPage.item(0).verifyEditBtnIsVisible();
});

Then("I should see the remove button", async ({ cartPage }) => {
    await cartPage.item(0).verifyRemoveBtnIsVisible();
});

Then("I should see the product price and total price", async ({ cartPage }) => {
    await cartPage.item(0).verifyPriceIsVisible();
    await cartPage.verifyTotalPriceIsVisible();
});