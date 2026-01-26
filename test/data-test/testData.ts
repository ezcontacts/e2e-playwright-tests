import { AccountMenu, MatchFilterType } from "./productTypes";

export const ACCOUNT = {
  name: "John Doe",
  email: "lenja@yopmail.com",
  message: "PLEASE IGNORE. This is a test message ",
  mobileNumber: "1111111111",
  invalideMobileNumber: "11111"
};

export const CUSTOMER = {
  email: 'lenja@yopmail.com',

  firstName: 'Michael',
  lastName: 'Anderson',
  companyName: 'Anderson Solutions LLC',

  addressLine1: '742 Evergreen Terrace',
  addressLine2: 'Apt 5B',
  city: 'Springfield',
  state: 'AA',
  zipCode: '62704',

  phone: '+1 217 555 0198',
};

export const ADMIN = {
  createOrder:{
    shippingAddressTitle: "Select Shipping Address",
    billingAddressTitle: "Select Billing Address",
  }
}

export const ORDER = {
  orderNumber: "7790",
}

export const MESSAGE = {
  successAddToCart: "Item successfully added to your cart.",
  successLogin: "You have successfully logged in.",
  successOrderCreated: "Order created successfully.",
};

export const PRODUCT = {
  productDescription: {
    bridgeWidth: "Bridge Width",
    lensWidth: "Lens Width",
    armLength: "Arm Length",
  },
};


export const BRANDS = ["Polo", "Michael Kors", "Ralph Lauren", "Persol"];

export const FILTER_VALUE: Record<MatchFilterType | string, { endpoint: string; value: string }> = {
  [MatchFilterType.BEST_MATCH]: { endpoint: '', value: '-' },
  [MatchFilterType.POPULARITY]: { endpoint: '/sort:bestsellers/', value: 'total_sold-desc' },
  [MatchFilterType.NEWEST]: { endpoint: '/sort:newest/', value: 'date_created-desc' },
  [MatchFilterType.NAME_AZ]: { endpoint: '/sort:name-az/', value: 'name-asc' },
  [MatchFilterType.NAME_ZA]: { endpoint: '/sort:name-za/', value: 'name-desc' },
  [MatchFilterType.PRICE_LOW]: { endpoint: '/sort:price-low/', value: 'min_price-asc' },
  [MatchFilterType.PRICE_HIGH]: { endpoint: '/sort:price-high/', value: 'min_price-desc' },
};

export const ACCOUNT_MENU_LINKS: Record<AccountMenu | string, { endpoint: string; title: string }> = {
  [AccountMenu.AccountSettings]: { endpoint:'/account/main', title: 'Account settings'},
  [AccountMenu.AddressAndPayment]: { endpoint:'/account/address-and-payment', title: 'Account settings'},
  [AccountMenu.OrderHistory]: { endpoint:'/account/order-history', title: 'Order History'},
  [AccountMenu.RxInformation]: { endpoint:'/account/prescriptions', title: 'PRESCRIPTION INFORMATION'},
  [AccountMenu.EzPoints]: { endpoint:'/account/ezpoints',  title: 'EZPOINTS'},
  [AccountMenu.RecentPrescriptions]: { endpoint:'/account/prescriptions/contact-lenses/recent',  title: ''},
  [AccountMenu.WishList]: { endpoint:'/account/wishlist',  title: 'Wish List'},
  [AccountMenu.OnlineVisionTest]: { endpoint:'/account/online-vision-test-purchases',  title: 'ONLINE VISION TEST'},
  [AccountMenu.EzRefill]: { endpoint:'/account/subscription-history',  title: 'Subscription History'},
  [AccountMenu.StoreCredit]: { endpoint:'/account/store-credit',  title: 'Store Credit'},
};

export function getAccountMenuFromValue(
  value: string | AccountMenu
): AccountMenu {
  if (typeof value !== "string") {
      return value;
  }

  const menuBtn = Object.values(AccountMenu).find(
    v => v === value
  );

  if (!menuBtn) {
    throw new Error(`AccountMenu not found for value: "${value}"`);
  }

  return menuBtn;
}