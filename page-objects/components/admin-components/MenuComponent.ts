import { Page, Locator } from "@playwright/test";
import { BaseComponent } from "../../base/BaseComponent";

export class MenuComponent extends BaseComponent {
  readonly navTab: (text: string) => Locator;
  readonly mobileMenuBtn: Locator;

  constructor(page: Page, root: string = ".leftpanel") {
    super(page, root);

    this.navTab = (text: string) => this.within("li a").filter({hasText: text});
    this.mobileMenuBtn = this.locator(".mobile-menu-btn");
  }

  async clickOnTab(name: string): Promise<void> {
    const tab = this.navTab(name);
    if (this.isMobile()) {
        await this.mobileMenuBtn.click();
    }

    await tab.click();
  }
}
