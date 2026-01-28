import { Given, When, Then } from "../../fixtures/fixture";
import { TABS } from "../../data-test/testData";


Given("the user is on any page of the application", async ({ homePage }) => {
  await homePage.open();
});


Given("the user is on the portal homepage", async ({ homePage }) => {
 await homePage.open();
});



When("the user clicks on the {string} tab", async ({ homePage, portalContext }, tab: string) => {
  portalContext.selectedTab = tab; 
  await homePage.header.clickTab(tab);
});

When("the user hovers over the {string} tab", async ({ homePage, portalContext }, tab: string) => {
  portalContext.selectedTab = tab;
  await homePage.header.hoverTab(tab);
});

When("the user hovers over a tab", async ({ homePage, portalContext }) => {
  if (!portalContext.selectedTab) throw new Error("❌ No tab selected to hover over");
  await homePage.header.hoverTab(portalContext.selectedTab);
});


When("the corresponding dropdown menu is displayed", async ({ homePage, portalContext }) => {
  if (!portalContext.selectedTab) throw new Error("❌ No tab selected");
  await homePage.header.hoverTab(portalContext.selectedTab);
  await homePage.header.verifyDropdownVisible(portalContext.selectedTab);
});

When("the user moves the cursor away from the tab", async ({ homePage }) => {
  await homePage.page.mouse.move(0, 0); // move to safe location
});

When("the user clicks on the {string} option", async ({ homePage, portalContext }, option: string) => {
  if (!portalContext.selectedTab) throw new Error("❌ No tab selected before submenu click");
  await homePage.header.clickSubMenu(portalContext.selectedTab, option);
});

When("the user clicks on a tab", async ({ homePage, portalContext }, tab: string) => {
  portalContext.selectedTab = tab;
  await homePage.header.clickTab(tab);
});


When("the user switches between tabs", async ({ homePage, portalContext }, tab: string) => {
  for (const tab of Object.values(TABS)) {
    portalContext.selectedTab = tab;
    await homePage.header.clickTab(tab);
  }
});

When("the user navigates to the portal homepage", async ({ homePage }) => {
  await homePage.open();
});


When("the user switches to and verifies the {string} tab", async ({ homePage, portalContext }, tab: string) => {
  portalContext.selectedTab = tab;
  await homePage.header.switchTab(tab);
});


When("the user switches from {string} to {string}", async ({ homePage, portalContext }, previousTab: string, newTab: string) => {
  await homePage.header.clickTab(previousTab);
  await homePage.header.verifyTabIsActive(previousTab);

  await homePage.header.clickTab(newTab);
  await homePage.header.verifyTabIsNotActive(previousTab);
  await homePage.header.verifyTabIsActive(newTab);

  portalContext.selectedTab = newTab;
});


Then("the following tabs should be visible", async ({ homePage }) => {
  for (const tab of Object.values(TABS)) {
    await homePage.header.verifyTabVisible(tab);
  }
});

Then("the {string} submenu option should be displayed", async ({ homePage, portalContext }, option: string) => {
  if (!portalContext.selectedTab) throw new Error("❌ No tab selected");
  await homePage.header.verifySubMenuVisible(portalContext.selectedTab, option);
});



Then("the selected tab should be highlighted as active", async ({ homePage, portalContext }) => {
  if (!portalContext.selectedTab) throw new Error("❌ No tab selected");
  await homePage.header.verifyTabIsActive(portalContext.selectedTab);
});


Then("the user should be redirected to the {string} page", async ({ homePage }, pageName: string) => {
  const slug = pageName.toLowerCase().replace(/[’']/g, "").replace(/\s+/g, "-");
  await homePage.page.waitForURL(new RegExp(slug, "i"), { timeout: 15000 });
});



Then("the {string} tab should redirect to its product listing page", async ({ homePage }, tab: string) => {
  await homePage.header.verifyTabRedirect(tab);
});


Then("the {string} tab should NOT be active", async ({ homePage }, tab: string) => {
  await homePage.header.verifyTabIsNotActive(tab);
});


Then("the {string} tab should be highlighted as active", async ({ homePage }, tab: string) => {
  await homePage.header.verifyTabIsActive(tab);
});



Then("the dropdown menu should no longer be displayed", async ({ homePage, portalContext }) => {
  if (!portalContext.selectedTab) throw new Error("❌ No tab selected");
  await homePage.header.verifyDropdownHidden(portalContext.selectedTab);
});

