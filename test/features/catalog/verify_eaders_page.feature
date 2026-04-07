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

@skip
Scenario: Verify color options count matches product variants
  Then the number of color options displayed should match the color variants configured in admin

@skip
Scenario: Verify color options visibility across pagination
  When the user navigates to the next page using pagination
  Then the color options should be displayed correctly below each product icon

@skip
Scenario: Verify color options consistency on page refresh
  When the user refreshes the Product Listing page
  Then the color options should remain visible and unchanged for each produ