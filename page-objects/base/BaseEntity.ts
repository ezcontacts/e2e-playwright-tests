import { Locator, Page } from "@playwright/test";
import { expect } from "../../test/fixtures/fixture";
import { randomUUID } from "crypto";

export abstract class BaseEntity {
  page: Page;

  readonly selectors: Locator[];
  readonly attentiveIframe: Locator;
  readonly popup: Locator;
  readonly closeBtn: Locator;
  readonly attentiveOverlay: Locator;
  readonly modalPanel: Locator;
  readonly closePanelBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.selectors = [
      this.locator("#closeIconContainer"),
      this.locator("#dismissbutton2header1"),
      this.locator(".close-icon"),
      this.locator('button[class*="close"]'),
      this.page.getByTestId('closeIcon'),
    ];

    this.modalPanel = this.locator(".css-183k8kr");

    this.attentiveIframe = this.locator("iframe#attentive_creative");
    this.popup = this.locator("#overlayContainer");
    this.closeBtn = this.locator("#closeIconContainer");
    this.attentiveOverlay = this.page.locator('#attentive_overlay');
    this.closePanelBtn = this.page
        .frameLocator('iframe#attentive_creative')
        .getByTestId('closeIcon');
  }

  async closeAttentiveOverlay(): Promise<void> {
    if (await this.attentiveOverlay.isVisible({ timeout: 5000 }).catch(() => false)) {
      await this.page.evaluate(() => {
        const overlay = document.getElementById('attentive_overlay');
        if (overlay) {
          overlay.remove();
        }
      });
    }
  }

  async safeClick(locator: Locator, timeout = 60000) {
    await locator.scrollIntoViewIfNeeded();
    await expect(locator).toBeVisible({ timeout });
    await expect(locator).toBeEnabled({ timeout });
    await locator.click({ timeout });
  }

  protected async safeClickAndWaitForNetworkIdle(
    locator: Locator,
    options?: { timeout?: number }
  ): Promise<void> {
    const timeout = options?.timeout ?? 60000;

    if (await this.attentiveOverlay.isVisible().catch(() => false)) {
      await this.attentiveOverlay.evaluate(el => el.remove());
    }

    await locator.scrollIntoViewIfNeeded();
    await expect(locator).toBeVisible({ timeout });

    await Promise.all([
      locator.click({force: true}),
    ]);
  }

  async safeFill(locator: Locator, value: string, timeout = 60000) {
    await locator.scrollIntoViewIfNeeded();
    await expect(locator).toBeVisible({ timeout });
    await expect(locator).toBeEnabled({ timeout });
    await locator.fill(value, { timeout });
  }

  async waitForDomContentLoad(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
  }

  async waitForLoadState(): Promise<void> {
    await this.page.waitForLoadState("load");
  }

  async reloadPage(): Promise<void> {
    await this.page.reload({ waitUntil: "domcontentloaded" });
  }

  async closeDynamicPopupIfPresent(): Promise<void> {
    if(this.isMobile()) return;

    try{
      await this.closePanelBtn.click();
    }catch(e){}
  }

  async waitAndClosePopup(): Promise<void> {
    if(this.isMobile()) return;

    await this.page.waitForTimeout(1000);

    if ((await this.popup.count()) > 0) {
      console.log("Popup detected, closing...");

      await this.closeBtn.click({ force: true }).catch(() => {
        console.warn("Close button found but click failed");
      });
    }
  }

  async clickIfVisible(locator: Locator): Promise<void> {
    const count = await locator.count();
    if (count > 0) {
      await locator.first().click();
    }
  }

  async verifyAnyCondition(
    locator: Locator,
    condition: (el: Locator) => Promise<boolean>,
    errorMessage = `Condition: ${condition} not valid`
  ) {
    const count = await locator.count();

    for (let i = 0; i < count; i++) {
      const el = locator.nth(i);

      if (await condition(el)) {
        return true;
      }
    }

    throw new Error(errorMessage);
  }

  protected getPlatformSelector(desktop: string, mobile: string): string {
    return this.isMobile() ? mobile : desktop;
  }

  protected isMobile(): boolean {
    return this.page.viewportSize()?.width! < 768;
  }

  protected locator(desktop: string, mobile?: string): Locator {
    return mobile === undefined
      ? this.page.locator(desktop)
      : this.page.locator(this.getPlatformSelector(desktop, mobile));
  }

  protected async enterField(locator: Locator, value: string) {
    await locator.scrollIntoViewIfNeeded();
    
    await expect(locator).toBeVisible();
    await expect(locator).toBeEnabled();

    await locator.fill(value);
  }

  public generateRandomEmail(): string {
    return `user_${randomUUID()}@example.com`;
  }
}
