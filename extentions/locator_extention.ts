import { Locator } from "@playwright/test";

declare global {
  interface Array<T> {
    firstVisible(this: Locator[], timeout?: number): Promise<Locator>;
  }
}

Array.prototype.firstVisible = async function (
  this: Locator[],
  timeout = 5000,
): Promise<Locator> {
  const start = Date.now();

  while (Date.now() - start < timeout) {
    for (const locator of this) {
      try {
        if (await locator.isVisible()) {
          return locator;
        }
      } catch {}
    }

    await new Promise((r) => setTimeout(r, 50));
  }

  throw new Error("No visible locator found within timeout");
};
