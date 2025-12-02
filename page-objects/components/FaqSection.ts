import { expect, Locator, Page } from "@playwright/test";
import { BaseComponent } from "../base/BaseComponent";

export class FaqSection extends BaseComponent {
  readonly header: Locator;
  readonly description: Locator;
  readonly allFaqQuestions: Locator;
  readonly faqAnswer: Locator;
  readonly viewAllButton: Locator;

  constructor(page: Page, root: string) {
    super(page, root);

    this.header = this.within(".section-head h3");
    this.description = this.within(".section-head p");
    this.allFaqQuestions = this.within(".accordion-list li h3");
    this.faqAnswer = this.within(".accordion-list li .answer");
    this.viewAllButton = this.within("a");
  }

  async verifyDescriptionContains(expectedText: string): Promise<void> {
    await expect(this.description).toContainText(expectedText);
  }

  async verifyHeaderContains(expectedText: string): Promise<void> {
    await expect(this.header).toContainText(expectedText);
  }

  async getQuestions(): Promise<string[]> {
    return await this.allFaqQuestions.allTextContents();
  }

  async clickQuestion(index: number) {
    await this.allFaqQuestions.nth(index).click();
  }

  async getAnswerText(index: number): Promise<string | null> {
    return await this.faqAnswer.nth(index).textContent();
  }

  async clickViewAll() {
    await this.viewAllButton.click();
  }
}
