import { createBdd, test as bddTest } from "playwright-bdd";
import { HomePage } from "../../page-objects/pages/HomePage";
import { LoginPage } from "../../page-objects/pages/LoginPage";
import { YopmailPage } from "../../page-objects/pages/YopmailPage";

export const test = bddTest.extend<{
  homePage: HomePage;
  loginPage: LoginPage;
  yopmailPage: YopmailPage;
}>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  yopmailPage: async ({ page }, use) => {
    const yopmailPage = new YopmailPage(page);
    await use(yopmailPage);
  },
});

export const expect = test.expect;

export const { Given, When, Then } = createBdd(test);
