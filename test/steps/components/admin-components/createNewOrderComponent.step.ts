import { ADMIN, BRANDS, CUSTOMER, MESSAGE} from "../../../data-test/testData";
import { ProductType } from "../../../data-test/productTypes";
import { Given, When, Then } from "../../../fixtures/fixture";

When(
  "I enter the customer email",
  async ({ adminPanelPage }) => {
    await adminPanelPage.createNewCustomer.enterEmail(CUSTOMER.email);
    await adminPanelPage.createNewCustomer.clickOnNextBtn();
  }
);

When(
  "I confirm the shipping address",
  async ({ adminPanelPage }) => {
    await adminPanelPage.createNewCustomer.verifyTitleIsVisible(ADMIN.createOrder.shippingAddressTitle);
    await adminPanelPage.createNewCustomer.clickOnNextBtn();
  }
);

When(
  "I confirm the billing address",
  async ({ adminPanelPage }) => {
    await adminPanelPage.createNewCustomer.verifyTitleIsVisible(ADMIN.createOrder.billingAddressTitle);
    await adminPanelPage.createNewCustomer.clickOnNextBtn();
  }
);

When(
  "I select the payment",
  async ({ adminPanelPage }) => {
    await adminPanelPage.createNewCustomer.clickOnNextBtn();
  }
);

When(
  "I do not select the payment method",
  async ({ adminPanelPage }) => {
    await adminPanelPage.createNewCustomer.clickOnNextBtn();
  }
);

When(
  "I select the shipping method",
  async ({ adminPanelPage }) => {
    await adminPanelPage.createNewCustomer.clickOnNextBtn();
  }
);

When(
  "I add a new item to the existing order",
  async ({ adminPanelPage }) => {
    await adminPanelPage.createNewCustomer.clickOnAddProductBtn();
    await adminPanelPage.addProductModelComponent.selectProductByType(ProductType.Sunglasses);
    await adminPanelPage.addProductModelComponent.clickOnContinueBtn();

    const brand = BRANDS[Math.floor(Math.random() * BRANDS.length)];
    await adminPanelPage.addProductModelComponent.searchProductByBrand(brand);
    await adminPanelPage.addProductModelComponent.clickOnInStockOnlyCheckbox();
    await adminPanelPage.addProductModelComponent.clickOnAddProductBtn(0);
    await adminPanelPage.addProductModelComponent.clickOnSummaryProductBtn();
  }
);

Then(
  "Account info should contain the customer email",
  async ({ adminPanelPage }) => {
    await adminPanelPage.createNewCustomer.verifyLabel(CUSTOMER.email);
    await adminPanelPage.createNewCustomer.clickOnNextBtn();
  }
);

Then(
  "The draft order should be successfully created",
  async ({ adminPanelPage }) => {
    await adminPanelPage.verifySuccessfulMessage(MESSAGE.successOrderCreated);
  }
);
