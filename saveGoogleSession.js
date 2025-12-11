// saveGoogleSession.js
import { chromium } from "@playwright/test";

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://accounts.google.com/signin");

  console.log("Введи логин и пароль за 30 секунд...");
  await page.waitForTimeout(30000);

  await context.storageState({ path: "google-session.json" });
  console.log("Сессия сохранена в google-session.json");

  await browser.close();
})();
