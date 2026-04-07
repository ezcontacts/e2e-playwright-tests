Feature: Address and Payment Management

Background:
  Given the user is logged in
  And the user is on the "Address and Payment" page

Scenario: Verify Address and Payment section layout
  Then the following sections should be displayed on the page:
    | Section Name     |
    | Shipping Address |
    | Billing Address  |
    | Payment Methods  |

Scenario Outline: Verify saved addresses are displayed with actions
  Then all saved "<addressType>" addresses should be visible
  And each "<addressType>" address should have the following actions:
    | Action |
    | Edit   |
    | Delete |
  And the "+ Add <addressType> Address" link should be visible

Examples:
  | addressType |
  | Shipping    |
  | Billing     |

Scenario Outline: Verify user can add a new address
  When the user clicks on "+ Add <addressType> Address"
  Then the "<addressType> Address" form should be displayed
  And the user should be redirected to "/account/address-and-payment/add-<addressType>-address"

Examples:
  | addressType |
  | Shipping    |
  | Billing     |

Scenario: Verify Payment Methods table structure
  Then the "Payment Methods" section should be displayed below the "Billing Address" section
  And the payment methods table should contain the following columns:
    | Column Name  |
    | Name on Card |
    | Card Details |
    | Actions      |

Scenario: Verify user can add a new Payment method
  When the user clicks on "+ Add Payment Method" link
  Then the "Add Payment Method" form should be displayed
  And the user should be redirected to "/account/address-and-payment/add-card-details"

Scenario: Verify Address and Payment Methods actions
  Then each saved address and payment method should have the following actions:
    | Action |
    | Edit   |
    | Delete |