import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { ENDPOINT } from "../../constant/endpoint";
import { expect } from "../../test/fixtures/fixture";
import { EyeDetail } from "../base/types";

type PrescriptionUserData = {
  name?: string;

  birthMonth?: number;
  birthDay?: number;
  birthYear?: string;

  region?: string;

  rightSph?: string;
  rightCyl?: string;
  rightAxis?: string;

  leftSph?: string;
  leftCyl?: string;
  leftAxis?: string;

  pdValue?: string;
};

export class VisionTestIntroductionPage extends BasePage {
  readonly title: Locator;
  readonly preTestHeader: Locator;

  readonly patientNameField: Locator;
  readonly birthMonthSelect: Locator;
  readonly birthDaySelect: Locator;
  readonly birthYearSelect: Locator;
  readonly regionSelect: Locator;
  readonly pdSelect: Locator;

  readonly testBtn: (text: string) => Locator;

  readonly rightEye: EyeDetail;
  readonly leftEye: EyeDetail;
  
  constructor(page: Page) {
    super(page, ENDPOINT.onlineVisionTestIntroduction);

    this.title = this.locator(".row > h2");
    this.preTestHeader = this.locator('.row > h2');

    this.patientNameField = this.locator("#AccountPrescriptionPatientName").first();
    this.birthMonthSelect = this.locator("#AccountPrescriptionRxDateofbirthAtMonth");
    this.birthDaySelect = this.locator("#AccountPrescriptionRxDateofbirthAtDay");
    this.birthYearSelect = this.locator("#AccountPrescriptionRxDateofbirthAtYear");
    
    this.regionSelect = this.locator("#AccountPrescriptionRxRegionCode");
    this.pdSelect = this.locator("#AccountPrescriptionEyeglassesPd1Value");

    this.testBtn = (text: string) => this.locator('.btn-red').filter({ hasText: text }).first();

    this.rightEye = new EyeDetail({
      sphere: this.locator("#AccountPrescriptionEyeglassesRightSph"),
      cylinder: this.locator("#AccountPrescriptionEyeglassesRightCyl"),
      axis: this.locator("#AccountPrescriptionEyeglassesRightAxis"),
    });
    this.leftEye = new EyeDetail({
      sphere: this.locator("#AccountPrescriptionEyeglassesLeftSph"),
      cylinder: this.locator("#AccountPrescriptionEyeglassesLeftCyl"),
      axis: this.locator("#AccountPrescriptionEyeglassesLeftAxis"),
    });
  }

  async open(): Promise<void>{
    await super.open();
    await this.closeDynamicPopupIfPresent();
  }

  async verifyTitleIsVisible(): Promise<void>{
    await expect(this.title).toBeVisible();
  }

  async verifyPreTestHeaderIsVisible(): Promise<void>{
    await expect(this.preTestHeader).toBeVisible();
  }

  async fillCurrentPrescription(
    userData: PrescriptionUserData = {}
  ): Promise<this> {
    const data = {
      name: userData.name ?? 'John Doe',
      birthMonth: userData.birthMonth ?? Math.floor(Math.random() * 12) + 1,
      birthDay: userData.birthDay ?? Math.floor(Math.random() * 28) + 1,
      birthYear: userData.birthYear ?? '1985',
      region: userData.region ?? 'New York',
      rightSph: userData.rightSph ?? '-2.50',
      rightCyl: userData.rightCyl ?? '-2.50',
      rightAxis: userData.rightAxis ?? '50',
      leftSph: userData.leftSph ?? '-2.50',
      leftCyl: userData.leftCyl ?? '-2.50',
      leftAxis: userData.leftAxis ?? '50',
      pdValue: userData.pdValue ?? '59.0',
    };

    try{
      const btn = this.testBtn("Cancel The Previous Test");

      if(await btn.isVisible().catch(() => false)){
        await btn.click();
      }
      
    }catch(e){}
    
    await this.safeFill(this.patientNameField, data.name);

    const selectMap: Record<string, { locator: any; value: string }> = {
      birthMonth: { locator: this.birthMonthSelect, value: String(data.birthMonth) },
      birthDay: { locator: this.birthDaySelect, value: String(data.birthDay) },
      birthYear: { locator: this.birthYearSelect, value: data.birthYear },
      region: { locator: this.regionSelect, value: data.region },

      rightSph: { locator: this.rightEye.sphere, value: data.rightSph },
      rightCyl: { locator: this.rightEye.cylinder, value: data.rightCyl },
      rightAxis: { locator: this.rightEye.axis, value: data.rightAxis },

      leftSph: { locator: this.leftEye.sphere, value: data.leftSph },
      leftCyl: { locator: this.leftEye.cylinder, value: data.leftCyl },
      leftAxis: { locator: this.leftEye.axis, value: data.leftAxis },
      pdValue: { locator: this.pdSelect, value: data.pdValue },
    };

    for (const { locator, value } of Object.values(selectMap)) {
      await locator.selectOption(value);
    }

    return this;
  }

  async clickOnTestBtn(text: string): Promise<void> {
    const btn = this.testBtn(text);

    await btn.scrollIntoViewIfNeeded();
    await btn.click();
  }
}
