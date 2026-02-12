import { createBdd, test as bddTest } from "playwright-bdd";
import { Page } from "@playwright/test";

import { HomePage } from "../../page-objects/pages/HomePage";
import { LoginPage } from "../../page-objects/pages/LoginPage";
import { YopmailPage } from "../../page-objects/pages/YopmailPage";
import { EyeglassesPage } from "../../page-objects/pages/product-cataloge/EyeglassesPage";
import { ContactUsPage } from "../../page-objects/pages/ContactUsPage";
import { SunglassesPage } from "../../page-objects/pages/product-cataloge/SunglassesPage";
import { ProductPage } from "../../page-objects/pages/ProductPage";
import { FaqPage } from "../../page-objects/pages/FaqPage";
import { CartPage } from "../../page-objects/pages/CartPage";
import { EyeCarePage } from "../../page-objects/pages/product-cataloge/EyeCarePage";
import { ContactLensesPage } from "../../page-objects/pages/product-cataloge/ContactLensesPage";
import { ContactLensesProductPage } from "../../page-objects/pages/ContactLensesProductPage";
import { MeasurePupilDistancePage } from "../../page-objects/pages/MeasurePdActionsPage";
import { OnlineVisionTestPage } from "../../page-objects/pages/OnlineVisionTestPage";
import { VisionTestIntroductionPage } from "../../page-objects/pages/VisionTestIntroductionPage";
import { AdminPanelPage } from "../../page-objects/pages/AdminPanelPage";
import { CheckoutPage } from "../../page-objects/pages/CheckoutPage";
import { AccountPage } from "../../page-objects/pages/Account/AccountPage";
import { EzPointsPage } from "../../page-objects/pages/Account/EzPointsPage";
import { AccountSettingsPage } from "../../page-objects/pages/Account/AccountSettingsPage";
import { AccountInfoPage } from "../../page-objects/pages/Account/AcountInfoPage";


export const test = bddTest.extend<{
  page: Page;
  homePage: HomePage;
  loginPage: LoginPage;
  eyeglassesPage: EyeglassesPage;
  sunglassesPage: SunglassesPage;
  yopmailPage: YopmailPage;
  contactUsPage: ContactUsPage;
  productPage: ProductPage;
  faqPage: FaqPage;
  cartPage: CartPage;
  eyeCarePage: EyeCarePage;
  contactLensesPage: ContactLensesPage;
  contactLensesProductPage: ContactLensesProductPage;
  measurePdActionsPage: MeasurePupilDistancePage;
  onlineVisionPage: OnlineVisionTestPage;
  visionTestIntroductionPage: VisionTestIntroductionPage;
  adminPanelPage: AdminPanelPage;
  checkoutPage: CheckoutPage;
  accountPage: AccountPage;
  ezPointsPage: EzPointsPage;
  accountSettingsPage: AccountSettingsPage;
  accountInfoPage: AccountInfoPage;
  clContext: clContext;
}>({
  context: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: "google-session.json",
    });

    await use(context);
    await context.close();
  },

  clContext: async ({}, use) => {
    await use({ selectedTab: undefined });
  },

  page: async ({ context }, use) => {
    const page = await context.newPage();

    await page.addInitScript(() => {
      const removeAttentive = () => {
        const overlay = document.getElementById('attentive_overlay');
        if (overlay) overlay.remove();
      };
      removeAttentive();
      const observer = new MutationObserver(removeAttentive);
      observer.observe(document.documentElement, { childList: true, subtree: true });
    });

    await page.addStyleTag({
      content: `
        * {
          animation: none !important;
          transition: none !important;
        }
      `,
    });

    await use(page);
  },

  homePage: async ({ page }, use) => await use(new HomePage(page)),
  loginPage: async ({ page }, use) => await use(new LoginPage(page)),
  eyeglassesPage: async ({ page }, use) => await use(new EyeglassesPage(page)),
  sunglassesPage: async ({ page }, use) => await use(new SunglassesPage(page)),
  productPage: async ({ page }, use) => await use(new ProductPage(page)),
  yopmailPage: async ({ page }, use) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await use(new YopmailPage(page));
  },
  contactUsPage: async ({ page }, use) => await use(new ContactUsPage(page)),
  faqPage: async ({ page }, use) => await use(new FaqPage(page)),
  cartPage: async ({ page }, use) => await use(new CartPage(page)),
  eyeCarePage: async ({ page }, use) => await use(new EyeCarePage(page)),
  contactLensesPage: async ({ page }, use) =>
    await use(new ContactLensesPage(page)),
  contactLensesProductPage: async ({ page }, use) =>
    await use(new ContactLensesProductPage(page)),
  measurePdActionsPage: async ({ page }, use) =>
    await use(new MeasurePupilDistancePage(page)),
  onlineVisionPage: async ({ page }, use) =>
    await use(new OnlineVisionTestPage(page)),
  visionTestIntroductionPage: async ({ page }, use) =>
    await use(new VisionTestIntroductionPage(page)),
  adminPanelPage: async ({ page }, use) =>
    await use(new AdminPanelPage(page)),
  checkoutPage: async ({ page }, use) =>
    await use(new CheckoutPage(page)),
  accountPage: async ({ page }, use) =>
    await use(new AccountPage(page)),
  ezPointsPage: async ({ page }, use) =>
    await use(new EzPointsPage(page)),
  accountSettingsPage: async ({ page }, use) =>
    await use(new AccountSettingsPage(page)),
  accountInfoPage: async ({ page }, use) =>
    await use(new AccountInfoPage(page)),
}




);


export type clContext = {
  selectedTab?: string;
  previousTab?: string;
};

export const expect = test.expect;
export const { Given, When, Then } = createBdd(test);
