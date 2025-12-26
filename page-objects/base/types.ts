import { Locator } from "@playwright/test";

export class EyeDetail {
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