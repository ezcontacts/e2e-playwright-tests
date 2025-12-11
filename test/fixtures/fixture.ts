import { createBdd, test as bddTest } from "playwright-bdd";
import { HomePage } from "../../page-objects/pages/HomePage";
import { LoginPage } from "../../page-objects/pages/LoginPage";
import { YopmailPage } from "../../page-objects/pages/YopmailPage";
import { EyeglassesPage } from "../../page-objects/pages/EyeglassesPage";
import { ContactUsPage } from "../../page-objects/pages/ContactUsPage";

export const test = bddTest.extend<{
  homePage: HomePage;
  loginPage: LoginPage;
  eyeglassesPage: EyeglassesPage;
  yopmailPage: YopmailPage;
  contactUsPage: ContactUsPage;
}>({
  context: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: "google-session.json",
    });
    await use(context);
    await context.close();
  },

  homePage: async ({ context }, use) => {
    const page = await context.newPage();
    const homePage = new HomePage(page);
    await use(homePage);
    await page.close();
  },

  loginPage: async ({ context }, use) => {
    const page = await context.newPage();
    const loginPage = new LoginPage(page);
    await use(loginPage);
    await page.close();
  },

  eyeglassesPage: async ({ context }, use) => {
    const page = await context.newPage();
    const eyeglassesPage = new EyeglassesPage(page);
    await use(eyeglassesPage);
    await page.close();
  },

  yopmailPage: async ({ context }, use) => {
    const page = await context.newPage();
    const yopmailPage = new YopmailPage(page);
    await use(yopmailPage);
    await page.close();
  },

  contactUsPage: async ({ context }, use) => {
    const page = await context.newPage();
    const contactUsPage = new ContactUsPage(page);
    await use(contactUsPage);
    await page.close();
  },
});

export const expect = test.expect;
export const { Given, When, Then } = createBdd(test);
