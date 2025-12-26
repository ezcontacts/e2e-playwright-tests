import { Page, Locator } from "@playwright/test";
import { ProductStepComponent } from "./ProductStepComponent";
import { EyeDetail } from "../../base/types";

export class PrescriptionDetailsComponent extends ProductStepComponent {
  readonly pupilDistance: Locator;

  readonly rightEye: EyeDetail;
  readonly leftEye: EyeDetail;

  constructor(page: Page, root: string = "li#step-3") {
    super(page, root);

    this.rightEye = new EyeDetail({
      sphere: this.within("#AccountPrescriptionRightSph"),
      cylinder: this.within("#AccountPrescriptionRightCyl"),
      axis: this.within("#AccountPrescriptionRightAxis"),
    });

    this.leftEye = new EyeDetail({
      sphere: this.within("#AccountPrescriptionLeftSph"),
      cylinder: this.within("#AccountPrescriptionLeftCyl"),
      axis: this.within("#AccountPrescriptionLeftAxis"),
    });

    this.pupilDistance = this.within("#AccountPrescriptionPd1");
  }

  async selectPupilDistanceValue(index: number): Promise<void> {
    await this.pupilDistance.selectOption({ index });
  }
}
