import { createBdd, test as bddTest } from "playwright-bdd";
import { HomePage } from "../../page-objects/pages/HomePage";

export const test = bddTest.extend<{
  homePage: HomePage;
}>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
});

export const expect = test.expect;

export const { Given, When, Then } = createBdd(test);
