@EZSANISOFT-5382
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
  When the user clicks on Add "Payment Method" link
  When the user enters card details with "<cardNumber>", "<expiryMonth>", and "<expiryYear>"
  And the user clicks on the "<buttonName>" button
  And a "Your card details have been added successfully." message should be displayed

Scenario: Verify that user can save the Shipping Address
  When the user clicks on Add "Shipping Address" link
  Then the user enters shipping address details  
  And the user clicks on the "<buttonName>" button
  And a "The account shipping address has been saved." message should be displayed

Scenario: Verify that user can save the Billing Address
  When the user clicks on Add "Billing Address" link
  Then the user enters billing address details
  And the user clicks on the "<buttonName>" button
  And a "The account billing address has been saved." message should be displayed