Feature: Address and Payment Management

Background:
  Given the user is logged in
  When the user selects "Address & Payment" from the My Account menu

Scenario Outline: Verify user can add a new address or payment method
  When the user clicks on Add "<type>" link
  Then the "<formName>" form should be displayed
  And the user should be redirected to "<url>"

Examples:
  | type             | formName               | url                                                  |
  | Shipping Address | Add Shipping Address   | /account/address-and-payment/add-shipping-address    |
  | Billing Address  | Add Billing Address    | /account/address-and-payment/add-billing-address     |
  | Payment Method   | Add Card Details       | /account/address-and-payment/add-card-details        |


Scenario Outline: Verify user can add a new card
  Given the user is on the "<formName>" form
  When the user enters card details with "<cardNumber>", "<expiryMonth>", and "<expiryYear>"
  And the user clicks on the "<buttonName>" button
  Then the new card details should be displayed in the "<sectionName>" section

Examples:
  | formName         | cardNumber        | expiryMonth | expiryYear | buttonName   | sectionName     |
  | Add Card Details | 4111111111111111  | 12          | 26         | Save Changes | Payment Methods |


@skip
Scenario Outline: Verify saved addresses are displayed with actions
  Then all saved "<addressType>" addresses should be visible
  And each "<addressType>" address should have the following actions:
    | Action |
    | Edit   |
    | Delete |


@skip
Scenario: Verify Address and Payment Methods actions
  Then each saved address and payment method should have the following actions:
    | Action |
    | Edit   |
    | Delete |