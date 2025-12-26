import { Page } from "@playwright/test";
import { ProductStepComponent } from "./ProductStepComponent";
import { RadioButtonListComponent } from "./RadioButtonListComponent";
import { LensType } from "../../../test/data-test/productTypes";

export type { LensType };

export class LensMaterialComponent extends ProductStepComponent {
  readonly lensMaterial: RadioButtonListComponent;

  constructor(page: Page, root: string = "li#step-5") {
    super(page, root);

    this.lensMaterial = new RadioButtonListComponent(
      this.page,
      this.within(".lens-material")
    );
  }

  async setLensMaterial(type: LensType): Promise<void> {
    await this.lensMaterial.clickOnRadioBtnByText(type);
  }
}
