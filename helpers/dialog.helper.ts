import { Dialog, Page } from "@playwright/test";

export async function handleDialogOnce(
  page: Page,
  callback: (msg: string) => void
): Promise<string> {

  return new Promise<string>((resolve) => {

    page.once("dialog", async (dialog: Dialog) => {

      const msg = dialog.message();

      callback(msg);

      await dialog.accept();

      resolve(msg);
    });

  });
}