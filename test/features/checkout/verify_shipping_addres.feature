@EZSANISOFT-5407
Feature: Verify shipping options selection based on selected shipping address country

Background:
  Given the user is logged in
  When the user selects "Address & Payment" from the My Account menu
  When the user clicks on Add "Shipping Address" link
  Then the user enters shipping address details  
  And the user clicks on the "Save Changes" button
  Given I visit the sunglasses page
  When I click on the first product card in the list
  And I add the product to the cart
  When the user navigates to the cart page
  And the user proceeds to checkout from the cart page

Scenario: Verify shipping options for a supported country
  Then the selected shipping address should be displayed
  And the user should be able to open available shipping options
  And the user should be able to select created shipping options
  And the default shipping option should remain selected

Scenario Outline: Verify shipping options update when the shipping address country is changed
  When the user updates the shipping address country to "<Country>"
  Then the shipping options applicable to "<Country>" should be displayed
  And the previously displayed shipping options should no longer be available

  Examples:
    | Country        |
    | Canada         |
    | Puerto Rico    |
    | Mexico         |  