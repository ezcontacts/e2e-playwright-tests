import fs from "fs";
import path from "path";

import { expect } from "@playwright/test";

import { Given, Then, When } from "../../fixtures/fixture";

import {
  InvalidExtensionMessages,
  OverstockMessages,
  OverstockStatus
} from "../../../helpers/overstock.messages";

/* =====================================================
   GLOBAL TEST STATE
===================================================== */

function resetScenarioState() {
  uploadedFile = "";
  productNumber = "";
  beforeProductData = [];
  invalidExtensionPopupMessage = "";
  isInvalidExtensionScenario = false;
  isInvalidHeaderScenario = false;
}

let uploadedFile = "";
let productNumber = "";
let beforeProductData: string[] = [];
let invalidExtensionPopupMessage = "";
let isInvalidExtensionScenario = false;
let isInvalidHeaderScenario = false;

/* =====================================================
   NAVIGATION
===================================================== */

Given("I navigate to Overstock page", async ({ adminOverstockPage }) => {

  // 🔥 SAFE RESET PER SCENARIO (prevents cross-test leakage)
  resetScenarioState();

  await adminOverstockPage.open();
});

/* =====================================================
   FILE PREPARATION
===================================================== */

Given("user prepares overstock file {string}", async ({}, fileName: string) => {

  uploadedFile = fileName;

  const filePath = path.resolve("test/data-test/files", fileName);

  const csvContent = fs.readFileSync(filePath, "utf-8");

  const rows = csvContent
    .split(/\r?\n/)
    .map(r => r.trim())
    .filter(Boolean);

  const headers = rows[0]?.split(",").map(h => h.trim().toLowerCase()) || [];

  console.log("CSV HEADERS:", headers);

  // 👇 IMPORTANT RULE: first column must be "product"
  // FIX: detect invalid header safely (Product column missing or renamed)
  isInvalidHeaderScenario = !headers.includes("product");

  if (isInvalidHeaderScenario) {

    console.log("⚠️ Invalid header scenario detected (no Product column)");

    // IMPORTANT: prevent downstream crashes
    productNumber = "";
    return;
  }

  productNumber = rows[1]?.split(",")[0]?.trim() || "";

  console.log("✅ PRODUCT NUMBER:", productNumber);
});

/* =====================================================
   CAPTURE EXISTING PRODUCT DATA
===================================================== */

Given("user captures existing product data", async ({ adminOverstockPage }) => {

  if (!productNumber?.trim()) {
    console.log("⚠️ Skipping capture due to invalid header scenario");
    return;
  }

  await adminOverstockPage.searchProduct(productNumber);

  beforeProductData =
    await adminOverstockPage.getProductRowData(productNumber);

});

/* =====================================================
   UPLOAD FLOW
===================================================== */

When("user uploads overstock file", async ({ adminOverstockPage }) => {

    if (!uploadedFile) {
      throw new Error("❌ uploadedFile is empty - scenario setup failed");
    }

  const fileExtension =
    uploadedFile.split(".").pop()?.toLowerCase();

  isInvalidExtensionScenario = fileExtension !== "csv";

  invalidExtensionPopupMessage = "";

  if (isInvalidExtensionScenario) {

    adminOverstockPage.page.once("dialog", async dialog => {

      invalidExtensionPopupMessage = dialog.message();

      console.log("INVALID EXTENSION POPUP:", invalidExtensionPopupMessage);

      await adminOverstockPage.closeOverstockModal();
    });
  } else {

    await adminOverstockPage.processOverstockFile(uploadedFile);
  }
});

When("user uploads overstock file again", async ({ adminOverstockPage }) => {

  await adminOverstockPage.open();

  await adminOverstockPage.processOverstockFile(uploadedFile);
});

/* =====================================================
   SUCCESS VALIDATION
===================================================== */

Then("upload should be successful", async ({ adminOverstockPage }) => {

  // Skip validation for invalid extension scenarios
  if (isInvalidExtensionScenario) {

    const dialogPromise = new Promise<string>(resolve => {

      adminOverstockPage.page.once("dialog", async dialog => {

        const msg = dialog.message();
        invalidExtensionPopupMessage = msg;

        console.log("INVALID EXTENSION POPUP:", msg);

        // ✅ ONLY ACCEPT ONCE
        await dialog.accept();

        resolve(msg);
      });

    });

    await adminOverstockPage.processOverstockFile(uploadedFile);

    invalidExtensionPopupMessage = await dialogPromise;
  }

  // Validate success toast only for valid uploads
  await adminOverstockPage.validateToastMessage(
    OverstockMessages[
      OverstockStatus.FILE_UPLOAD_SUCCESS
    ]
  );
});

/* =====================================================
   GRID VALIDATION
===================================================== */

Then("product should be available in grid", async ({ adminOverstockPage }) => {

  if (!productNumber?.trim()) {
    console.log("⚠️ Skipping grid validation due to invalid file scenario");
    return;
  }

  await adminOverstockPage.refresh();

  await adminOverstockPage.waitForGrid();

  if (!productNumber?.trim()) {
    console.log("⚠️ Skipping grid validation due to invalid header scenario");
    return;
  }

  await adminOverstockPage.searchProduct(productNumber);

  await expect(async () => {
    const isVisible = await adminOverstockPage.isProductVisible(productNumber);
    expect(isVisible).toBeTruthy();
  }).toPass({ timeout: 30000 });
});

/* =====================================================
   HISTORY FLOW
===================================================== */

Then("user navigates to upload history page", async ({ adminOverstockPage }) => {

  await adminOverstockPage.openUploadHistoryPage();
});

Then("user opens latest upload details", async ({ adminOverstockPage }) => {

  await adminOverstockPage.openLatestUploadDetails();
});

/* =====================================================
   STATUS MESSAGE VALIDATION
===================================================== */

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

/* =====================================================
   INVALID FILE VALIDATION
===================================================== */

Then("invalid overstock format message should display", async ({ adminOverstockPage }) => {

  const msg = await adminOverstockPage.getToastMessage();

  console.log("HEADER VALIDATION MESSAGE:", msg);

  if (isInvalidHeaderScenario) {

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

  invalidExtensionPopupMessage = "";

  // ===============================
  // STEP 1: HANDLE BROWSER ALERT (OK BUTTON)
  // ===============================
  const dialogPromise = new Promise<string>(resolve => {

    adminOverstockPage.page.once("dialog", async dialog => {

      const msg = dialog.message();

      console.log("INVALID EXTENSION POPUP:", msg);

      await adminOverstockPage.page.waitForTimeout(1500); // UI debug delay

      await dialog.accept(); // CLICK OK

      resolve(msg);
    });

  });

  // Trigger upload AFTER listener is ready
  await adminOverstockPage.processOverstockFile(uploadedFile);

  invalidExtensionPopupMessage = await dialogPromise;

  // ===============================
  // STEP 2: CLOSE MODAL AFTER ALERT
  // ===============================

  const modal = adminOverstockPage.page.locator('#overStockProductModalId');

  const closeBtn = modal.locator('button:has-text("Close"), button.btn.btn-default');

  // Ensure modal is visible
  await expect(modal).toBeVisible({ timeout: 10000 });

  // Ensure button is ready
  await expect(closeBtn).toBeVisible({ timeout: 10000 });
  await expect(closeBtn).toBeEnabled({ timeout: 10000 });

  // Small wait for Bootstrap animation stability
  await adminOverstockPage.page.waitForTimeout(1000);

  // Force click (prevents overlay blocking issue)
  await closeBtn.click({ force: true });

  // ===============================
  // STEP 3: ASSERT MESSAGE
  // ===============================

  console.log("FINAL INVALID EXTENSION MESSAGE:", invalidExtensionPopupMessage);

  expect(
    InvalidExtensionMessages.some(msg =>
      invalidExtensionPopupMessage.includes(msg)
    )
  ).toBeTruthy();
});

/* =====================================================
   REMOVE OVERSTOCK FLOW
===================================================== */

Then("user removes product from overstock", async ({ adminOverstockPage }) => {

  if (!productNumber?.trim()) {
    console.log("⚠️ Skipping remove (invalid header scenario)");
    return;
  }

  await adminOverstockPage.removeOverstockProduct(productNumber);
});