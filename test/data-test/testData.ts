import { MatchFilterType } from "./productTypes";

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

// export const FILTER_VALUE: Record<
//   string,
//   { endpoint: string; value: string }
// >  = {
//   'Best Match': { endpoint: '', value: '-' },
//   'Popularity': { endpoint:'/sort:bestsellers/', value: 'total_sold-desc' },
//   'Newest': { endpoint:'/sort:newest/', value: 'date_created-desc' },
//   'Name (A-Z)': { endpoint:'/sort:name-az/', value: 'name-asc' },
//   'Name (Z-A)': { endpoint:'/sort:name-za/', value: 'name-desc' },
//   'Price ($-$$$)': { endpoint:'/sort:price-low/', value: 'min_price-asc' },
//   'Price ($$$-$)': { endpoint:'/sort:price-high/', value: 'min_price-desc' },
// };

export const FILTER_VALUE: Record<MatchFilterType | string, { endpoint: string; value: string }> = {
  [MatchFilterType.BEST_MATCH]: { endpoint: '', value: '-' },
  [MatchFilterType.POPULARITY]: { endpoint: '/sort:bestsellers/', value: 'total_sold-desc' },
  [MatchFilterType.NEWEST]: { endpoint: '/sort:newest/', value: 'date_created-desc' },
  [MatchFilterType.NAME_AZ]: { endpoint: '/sort:name-az/', value: 'name-asc' },
  [MatchFilterType.NAME_ZA]: { endpoint: '/sort:name-za/', value: 'name-desc' },
  [MatchFilterType.PRICE_LOW]: { endpoint: '/sort:price-low/', value: 'min_price-asc' },
  [MatchFilterType.PRICE_HIGH]: { endpoint: '/sort:price-high/', value: 'min_price-desc' },
};