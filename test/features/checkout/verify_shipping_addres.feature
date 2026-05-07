@EZSANISOFT-5407
Feature: Verify shipping options selection based on selected shipping address country

Background:
  Given the user is logged in
  When the user selects "Address & Payment" from the My Account menu
  When the user clicks on Add "Shipping Address" link
  Then the user enters shipping address details  
  And the user clicks on the "Save Changes" button


Scenario: Verify shipping options for a supported country
  Given I visit the sunglasses page
  When I click on the first product card in the list
  And I add the product to the cart
  When the user navigates to the cart page
  And the user proceeds to checkout from the cart page
  Then the selected shipping address should be displayed
  And the user should be able to open available shipping options
  And the user should be able to select created shipping options
  And the default shipping option should remain selected

# Scenario: Verify shipping options update when the shipping address country is changed
#   Given the user has added a shipping address with country "United States"
#   Given I visit the sunglasses page
#   When I click on the first product card in the list
#   And I add the product to the cart
#   When the user navigates to the cart page
#   And the user proceeds to checkout from the cart page
#   When the user updates the shipping address country to "Canada"
#   Then the shipping options applicable to "Canada" should be displayed
#   And the previously displayed shipping options should no longer be available


# Scenario: Verify only valid shipping options are shown for the selected country
#   Given the user has added a shipping address with country "Mexico"
#   When the user proceeds to the payment page
#   Then only shipping options supported for "Mexico" should be displayed
#   And unsupported shipping options should not be displayed
#   And disabled shipping options should not be displayed