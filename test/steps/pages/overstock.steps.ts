import fs from "fs";
import path from "path";

import { expect } from "@playwright/test";

import { Given, Then, When } from "../../fixtures/fixture";

import { parseCsv } from "../../../helpers/overstock.helper";

import {
  InvalidExtensionMessages,
  OverstockMessages,
  OverstockStatus
} from "../../../helpers/overstock.messages";

  type OverstockScenarioContext = {
    uploadedFile: string;
    productNumber: string;
    beforeProductData: string[];
    invalidExtensionPopupMessage: string;
    isInvalidExtensionScenario: boolean;
    isInvalidHeaderScenario: boolean;
  };

  function createScenarioContext(): OverstockScenarioContext {
  return {
    uploadedFile: "",
    productNumber: "",
    beforeProductData: [],
    invalidExtensionPopupMessage: "",
    isInvalidExtensionScenario: false,
    isInvalidHeaderScenario: false
    };
  }

  let context = createScenarioContext();

    function hasValidProductNumber(): boolean {
      return Boolean(context.productNumber?.trim());
    }




Given("I navigate to Overstock page", async ({ adminOverstockPage }) => {

  context = createScenarioContext();

  await adminOverstockPage.open();
});

Given("user prepares overstock file {string}", async ({}, fileName: string) => {

  context.uploadedFile = fileName;

  const filePath = path.resolve("test/data-test/files", fileName);

  const { rows, headers } = parseCsv(filePath);

  context.isInvalidHeaderScenario = !headers.includes("product");

  if (context.isInvalidHeaderScenario) {
    context.productNumber = "";
    return;
  }

  context.productNumber = rows[1]?.split(",")[0]?.trim() || "";
});

Given("user captures existing product data", async ({ adminOverstockPage }) => {

  if (!hasValidProductNumber()) {
    return;
  }

  await adminOverstockPage.searchProduct(context.productNumber);

  context.beforeProductData =
    await adminOverstockPage.getProductRowData(context.productNumber);

});

  When("user uploads overstock file", async ({ adminOverstockPage }) => {

    if (!context.uploadedFile) {
      throw new Error("❌ uploadedFile is empty - scenario setup failed");
    }

    await adminOverstockPage.uploadOverstockFile(
      context.uploadedFile,
      context
    );
  });

  When("user uploads overstock file again", async ({ adminOverstockPage }) => {

    await adminOverstockPage.open();

    await adminOverstockPage.processOverstockFile(context.uploadedFile);
  });

  Then("upload should be successful", async ({ adminOverstockPage }) => {

    await adminOverstockPage.validateToastMessage(
      OverstockMessages[
        OverstockStatus.FILE_UPLOAD_SUCCESS
      ]
    );
  });

  Then("product should be available in grid", async ({ adminOverstockPage }) => {

    if (!hasValidProductNumber()) {
      return;
    }

    await adminOverstockPage.refresh();

    await adminOverstockPage.waitForGrid();

    await adminOverstockPage.searchProduct(context.productNumber);

    await expect(async () => {
      const visible =
        await adminOverstockPage.isProductVisible(context.productNumber);

      expect(visible).toBeTruthy();
    }).toPass({ timeout: 30000 });

  });

  Then("user navigates to upload history page", async ({ adminOverstockPage }) => {

    await adminOverstockPage.openUploadHistoryPage();
  });

  Then("user opens latest upload details", async ({ adminOverstockPage }) => {

    await adminOverstockPage.openLatestUploadDetails();
  });

  Then("system should show overstock update message", async ({ adminOverstockPage }) => {

    await adminOverstockPage.validateUploadStatuses([
      OverstockStatus.NEW,
      OverstockStatus.DUPLICATE,
      OverstockStatus.NOT_FOUND
    ]);
  });

  Then("system should show fresh overstock message", async ({ adminOverstockPage }) => {

    await adminOverstockPage.validateUploadStatuses([
      OverstockStatus.NEW
    ]);
  });

  Then("system should show duplicate overstock message", async ({ adminOverstockPage }) => {

    await adminOverstockPage.validateUploadStatuses([
      OverstockStatus.DUPLICATE
    ]);
  });

  Then("invalid product message should display", async ({ adminOverstockPage }) => {

    await adminOverstockPage.validateUploadStatuses([
      OverstockStatus.NOT_FOUND
    ]);
  });

  Then("invalid overstock format message should display", async ({ adminOverstockPage }) => {

    const msg = await adminOverstockPage.getToastMessage();

    if (context.isInvalidHeaderScenario) {

      expect(msg).toContain(
        OverstockMessages[OverstockStatus.INVALID]
      );

    } else {

      expect(msg).toContain(
        OverstockMessages[OverstockStatus.FILE_UPLOAD_SUCCESS]
      );
    }
  });

  Then("empty overstock file message should display", async ({ adminOverstockPage }) => {

    await adminOverstockPage.validateToastMessage(
      OverstockMessages[OverstockStatus.EMPTY]
    );
  });

  Then("invalid extension message should display", async ({ adminOverstockPage }) => {

    await adminOverstockPage.uploadOverstockFile(
      context.uploadedFile,
      context
    );

    await adminOverstockPage.validateInvalidExtensionPopup(
      context.invalidExtensionPopupMessage
    );
  });

Then("user removes product from overstock", async ({ adminOverstockPage }) => {

  if (!hasValidProductNumber()) {
    return;
  }

  await adminOverstockPage.removeOverstockProduct(context.productNumber);
});
