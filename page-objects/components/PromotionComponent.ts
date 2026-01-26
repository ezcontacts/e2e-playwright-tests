import { expect, Locator, Page } from "@playwright/test";
import { BaseComponent } from "../base/BaseComponent";
import { LocatorConfig } from "../base/BaseEntity";
import { time } from "console";

export class PromotionComponent extends BaseComponent {
  readonly bubbleBtn: Locator;
  readonly promoteText: Locator;
  readonly closePromoteBtn: Locator;
  readonly fullPriceBtn: Locator;
  readonly emailField: Locator;
  readonly continueBtn: Locator;
  readonly errorMessage: Locator;
  readonly legalInformation: Locator;

  constructor(page: Page, root: string | LocatorConfig = {iframe: "iframe#attentive_creative", selector: "#contentframe"}) {
    super(page, root);

    this.bubbleBtn = this.locator("#page0");
    this.promoteText = this.within("#fieldcaptureheader2");

    this.fullPriceBtn = this.within('#dismissbutton2header1');
    this.emailField = this.within('#input0input')
    this.continueBtn = this.within('#ctabutton1header1');
    this.errorMessage = this.within('#input0input-error');
    this.legalInformation = this.within('#legalTextLabelForCheckbox-0');
    this.closePromoteBtn = this.page
        .frameLocator('iframe#attentive_creative')
        .getByTestId('closeIcon');
  }

  async clickOnBubbleBtnIfVisible(): Promise<void> {
    await this.clickIfVisible(this.bubbleBtn);
  }

  async verifyPromoteText(text: string): Promise<void> {
    await expect(this.promoteText).toHaveText(text);
  }

  async clickOnCloseBtn(): Promise<void>{
    await this.closePromoteBtn.click();
  }

  async clickOnContinueBtn(): Promise<void>{
    await this.continueBtn.click();
  }

  async fillEmailField(text: string): Promise<void>{
    await this.emailField.fill(text);
  }

  async verifyErrorMessage(text: string): Promise<void>{
    await expect(this.errorMessage).toHaveText(text);
  }

  async verifyLegalInformationIsVisible(): Promise<void>{
    await expect(this.legalInformation).toBeVisible();
  }

  async closeDynamicPopupIfPresent(): Promise<void> {
    try{
      await this.closePromoteBtn.click();
    }catch(e){}
  }
}
