Feature: Contact Lens Product Detail Page

Background:
  Given the user is on the contact lens product detail page
  When the product detail page loads successfully

Scenario: Verify product title and brand are displayed
  Then the product brand should be visible
  Then the product name should be visible