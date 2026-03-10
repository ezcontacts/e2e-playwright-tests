import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class YopmailPage extends BasePage {
  readonly url = "https://yopmail.com/en/";

  readonly linkBtn: Locator;
  // Main page locators
  readonly loginField: Locator;
  readonly refreshBtn: Locator;

  // Frame locators
  readonly inboxFrame;
  readonly mailFrame;

  // Inbox locators
  readonly emailItems: Locator;
  readonly latestEmail: Locator;

  // Mail locators
  readonly mailLinks: Locator;
  private magicLinkUrl: string | null = null;

  constructor(page: Page) {
    super(page, "");

    this.linkBtn = this.page.locator("#ifmail");
    // Main page
    this.loginField = this.page.locator("#login");
    this.refreshBtn = this.page.locator("div[id='refreshbut']");

    // Frames
    this.inboxFrame = this.page.frameLocator("#ifinbox");
    this.mailFrame = this.page.frameLocator("#ifmail");

    // Inbox elements
    this.emailItems = this.inboxFrame.locator("div.m");
    this.latestEmail = this.emailItems.first();

    // Mail elements
    this.mailLinks = this.mailFrame.locator("a");
  }

  async open(): Promise<void> {
  await this.page.goto(this.url, {
    waitUntil: "domcontentloaded",
  });

  await this.loginField.waitFor({ state: "visible", timeout: 60000 });
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
  await this.loginField.waitFor({ state: "visible" });

  await this.loginField.fill(value);

  // THIS loads the mailbox
  await this.loginField.press("Enter");

  await this.inboxFrame.locator("div.m").first().waitFor({
    state: "visible",
    timeout: 60000,
  });
}

//EZSANISOFT-5409
async openLatestEmailAndGetMagicLink(keyword: string): Promise<string> {
  await this.latestEmail.waitFor({ state: "visible", timeout: 60000 });
  await this.latestEmail.click();

  // 🔥 keyword is valid here
  const magicLinkLocator = this.mailFrame
    .locator(`a[href*="${keyword}"]`)
    .first();

  await magicLinkLocator.waitFor({ state: "visible", timeout: 60000 });

  const href = await magicLinkLocator.getAttribute("href");

  if (!href) {
    throw new Error(`Magic link containing "${keyword}" not found`);
  }

  return href;
}

async openInbox(email: string) {
  await this.page.goto(`https://yopmail.com/en/?login=${email}`, {
    waitUntil: "domcontentloaded",
  });

  await this.inboxFrame.locator("div.m").first().waitFor({
    state: "visible",
    timeout: 60000,
  });
}

async getMagicLinkFromLatestEmail(
  keyword: string = "login-with-token"
): Promise<string> {

  // Open latest email
  await this.latestEmail.waitFor({ state: "visible", timeout: 60000 });
  await this.latestEmail.click();

  // Dynamically filter from predefined mailLinks
  const magicLinkLocator = this.mailLinks
    .filter({ has: this.page.locator(`a[href*="${keyword}"]`) })
    .first();

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

async extractMagicLink(keyword: string): Promise<string> {
  const magicLinkLocator = this.mailFrame
    .locator(`a[href*="${keyword}"]`)
    .first();

  await magicLinkLocator.waitFor({
    state: "visible",
    timeout: 60000,
  });

  const href = await magicLinkLocator.getAttribute("href");

  if (!href) {
    throw new Error(`Magic link containing "${keyword}" not found`);
  }

  return href;
}


async navigateToMagicLink(url: string): Promise<void> {
  await this.page.goto(url, { waitUntil: "load" });
  await this.page.waitForLoadState("networkidle");
}

async clickEmailByIndex(index: number = 0): Promise<void> {
  const email = this.emailItems.nth(index);

  await email.waitFor({ state: "visible", timeout: 60000 });

  await email.click();

  // Wait for email body to load
  await this.mailFrame.locator("body").waitFor({
    state: "visible",
    timeout: 60000,
  });
}

async clickLatestEmail(): Promise<void> {
  await this.clickEmailByIndex(0);
}

async openMagicLinkFromLatestEmail(
  email: string,
  options?: {
    emailIndex?: number;
    keyword?: string;
  }
): Promise<void> {
  const {
    emailIndex = 0,
    keyword = "login-with-token",
  } = options || {};

  await this.open();
  await this.openInbox(email);

  await this.clickEmailByIndex(emailIndex);

  const magicLink = await this.extractMagicLink(keyword);

  await this.navigateToMagicLink(magicLink);
}

}
