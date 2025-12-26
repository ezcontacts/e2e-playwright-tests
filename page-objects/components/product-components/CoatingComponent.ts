import { Page, Locator } from "@playwright/test";
import { RadioButtonListComponent } from "./RadioButtonListComponent";
import { ProductStepComponent } from "./ProductStepComponent";
import { LensCoatingType } from "../../../test/data-test/productTypes";

export type { LensCoatingType };

export class CoatingComponent extends ProductStepComponent {
  readonly coatings: RadioButtonListComponent;
  readonly noThanksCheckbox: Locator;

  constructor(page: Page, root: string = "#step-6") {
    super(page, root);

    this.coatings = new RadioButtonListComponent(
      this.page,
      this.within("ul.coating")
    );

    this.noThanksCheckbox = this.within(".no-thanks .ezMarkLabel");
  }

  async selectCoating(type: LensCoatingType): Promise<void> {
    await this.coatings.clickOnRadioBtnByText(type);
  }

  async declineCoating(): Promise<void> {
    const isChecked = await this.noThanksCheckbox.isChecked();
    if (!isChecked) {
      await this.noThanksCheckbox.click();
    }
  }
}
