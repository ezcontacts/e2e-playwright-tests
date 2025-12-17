import { Page, Locator } from "@playwright/test";
import { ProductStepComponent } from "./ProductStepComponent";

class EyeDetail {
  readonly sphere: Locator;
  readonly cylinder: Locator;
  readonly axis: Locator;

  constructor({
    sphere,
    cylinder,
    axis,
  }: {
    sphere: Locator;
    cylinder: Locator;
    axis: Locator;
  }) {
    this.sphere = sphere;
    this.cylinder = cylinder;
    this.axis = axis;
  }

  async selectSphereValue(index: number): Promise<void> {
    await this.sphere.selectOption({ index });
  }

  async selectCylinderValue(index: number): Promise<void> {
    await this.cylinder.selectOption({ index });
  }

  async selectAxisValue(index: number): Promise<void> {
    await this.axis.selectOption({ index });
  }
}

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
