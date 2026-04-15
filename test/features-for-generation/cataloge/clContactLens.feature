Feature: Contact Lens Product Detail Page

Scenario: Verify product title and brand are displayed
  When the user lands on the Contact Lenses detail page
  And I click on the first product card in the list
  Then the product brand should be visible
  And the product name should be visible