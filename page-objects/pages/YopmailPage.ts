import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class YopmailPage extends BasePage {
  readonly url = "https://yopmail.com/en/";

  readonly linkBtn: Locator;
  readonly loginField: Locator;
  readonly refreshBtn: Locator;
  private magicLinkUrl: string | null = null;

  constructor(page: Page) {
    super(page, "");

    this.linkBtn = this.page.locator("#ifmail");
    this.loginField = this.page.locator("#login");
    this.refreshBtn = this.page.locator("div[id='refreshbut']");
  }

  async open(): Promise<void> {
    await this.page.goto(this.url, {
      timeout: 30000,
    });

    await this.waitForDomContentLoad();
  }

  async verifyEmailIsExist(): Promise<void> {
    await expect(this.linkBtn).toBeVisible();
  }

  async clickOnLinkBtn(): Promise<void> {
    await this.linkBtn.click();
  }

  async clickOnRefreshBtn(): Promise<void> {
    await this.refreshBtn.click();
  }

  async fillLogin(value: string): Promise<void> {
    await this.loginField.waitFor();
    await this.loginField.click();
    await this.loginField.fill(value);
  }

//EZSANISOFT-5409
  async openLatestEmailAndGetMagicLink(tokenKeyword: string): Promise<string> {
  const page = this.page;

  // Inbox frame
  const inboxFrame = page.frameLocator("#ifinbox");

  await inboxFrame.locator("div.m").first().waitFor({ timeout: 60000 });
  await inboxFrame.locator("div.m").first().click();

  // Email body frame
  const mailFrame = page.frameLocator("#ifmail");
  await mailFrame.locator("a").first().waitFor({ timeout: 60000 });

  const links = mailFrame.locator("a");
  const count = await links.count();

  for (let i = 0; i < count; i++) {
    const href = await links.nth(i).getAttribute("href");

    if (href && href.includes(tokenKeyword)) {
      return href;
    }
  }

  throw new Error(`Magic link containing "${tokenKeyword}" not found in email`);
}

async openInbox(email: string) {
  await this.fillLogin(email);
  await this.clickOnRefreshBtn();
}

async getMagicLinkFromLatestEmail(keyword: string = "login-with-token"): Promise<string> {
  // 🔹 Wait for inbox iframe and click latest email
  const inboxFrame = this.page.frameLocator("#ifinbox");

  const latestEmail = inboxFrame.locator("div.m").first();
  await latestEmail.waitFor({ state: "visible", timeout: 60000 });
  await latestEmail.click();

  // 🔹 Wait for mail content iframe to load
  const mailFrame = this.page.frameLocator("#ifmail");

  // Wait specifically for link containing keyword
  const magicLinkLocator = mailFrame.locator(`a[href*="${keyword}"]`).first();

  await magicLinkLocator.waitFor({
    state: "visible",
    timeout: 60000,
  });

  const magicLink = await magicLinkLocator.getAttribute("href");

  if (!magicLink) {
    throw new Error(`Magic login link containing "${keyword}" not found`);
  }

  return magicLink;
}

async extractMagicLink(keyword: string) {
  const mailFrame = this.page.frameLocator("#ifmail");

  await mailFrame.locator("a").first().waitFor({ timeout: 60000 });

  const links = mailFrame.locator("a");
  const count = await links.count();

  for (let i = 0; i < count; i++) {
    const href = await links.nth(i).getAttribute("href");

    if (href && href.includes(keyword)) {
      this.magicLinkUrl = href;
      return;
    }
  }

  throw new Error(`Magic link containing "${keyword}" not found`);
}


async navigateToMagicLink(url: string): Promise<void> {
  await this.page.goto(url, { waitUntil: "load" });
  await this.page.waitForLoadState("networkidle");
}

  async clickLatestEmail() {
    const inboxFrame = this.page.frameLocator("#ifinbox");

    await inboxFrame.locator("div.m").first().waitFor({ timeout: 60000 });
    await inboxFrame.locator("div.m").first().click();
  }

}
