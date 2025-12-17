import { Page, Locator } from "@playwright/test";
import { RadioButtonListComponent } from "./RadioButtonListComponent";
import { ProductStepComponent } from "./ProductStepComponent";
import { LensCoatingType } from "../../../test/data-test/productTypes";

export type { LensCoatingType };

export class EnterPrescriptionComponent extends ProductStepComponent {
  readonly samePrescriptionForBothEyes: Locator;
  readonly allSphere: Locator;

  constructor(page: Page, root: string = ".prescription") {
    super(page, root);

    this.samePrescriptionForBothEyes = this.within(
      ".same-prescription-how-many-style a"
    );

    this.allSphere = this.locator(".product_name_right_power-error");
  }

  async clickOnSamePrescriptionForBothEyesCheckbox(): Promise<void> {
    await this.samePrescriptionForBothEyes.click();
  }

  async selectAllSphereValue(index: number): Promise<void> {
    await this.allSphere.selectOption({ index });
  }
}
