import { Locator } from "@playwright/test";

export class EyeDetail {
  readonly sphere: Locator;
  readonly cylinder: Locator;
  readonly axis: Locator;
  readonly add: Locator;

  constructor({
    sphere,
    cylinder,
    axis,
    add,
  }: {
    sphere: Locator;
    cylinder: Locator;
    axis: Locator;
    add: Locator;
  }) {
    this.sphere = sphere;
    this.cylinder = cylinder;
    this.axis = axis;
    this.add = add;
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

  async selectAddValue(index: number): Promise<void> {
    await this.add.selectOption({ index });
  }
}
