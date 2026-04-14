@EZSANISOFT-5375
Feature: Verify Sort By drop down is displayed and product color options for Readers page

Background:
  Given the user visite "READERS" page


Scenario: Verify Sort By dropdown is displayed
  Then the Sort By dropdown should be visible
  And the Sort By dropdown should display "Bestselling" option as by default selected option

Scenario Outline: Verify Sort By dropdown selection works correctly
  When the user selects "<SortOption>" from the Sort By dropdown
  Then the products should be sorted according to "<SortOption>"
  
Examples:
  | SortOption          |
  | Bestselling         |
  | Newest              |
  | Price: Low to High  |
  | Price: High to Low  |

# Readers color options displayed below each product icon
Scenario: Verify color options are displayed below each product icon
  Then each product icon should display available color options below it

Scenario: Verify color options count matches product variants
  Then the number of color options displayed should match the color variants configured in admin

Scenario: Verify color options consistency on page refresh
  Given the user views a product on the listing page
  When the user refreshes the Product Listing page
  Then the color options should remain visible and unchanged for each product