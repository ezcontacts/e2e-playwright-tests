@EZSANISOFT-5353
Feature: Pagination on {{CATEGORY}}

Background:
  Given the user visite "{{CATEGORY}}" page

Scenario: Verify products per {{CATEGORY}} page
  Then the Products per page dropdown should be visible
  And the default 30 products per page value should be selected

Scenario Outline: Verify Products per page dropdown selection - {{CATEGORY}}
  When the user selects "<ProductCount>" from the Products per page dropdown
  Then the Product Listing page should display "<ProductCount>" products per page

Examples:
  | ProductCount |
  | 30           |
  | 48           |
  | 72           |
  | 96           |

Scenario: Verify Sort By dropdown is displayed
  Then the Sort By dropdown should be visible
  And the Sort By dropdown should display "Best Match" option as by default selected option

Scenario Outline: Verify Sort By dropdown selection works correctly
  When the user selects "<SortOption>" from the Sort By dropdown
  Then the products should be sorted according to "<SortOption>" 

Examples:
  | SortOption       |
  | Popularity       |
  | Newest           |
  | Name (A-Z)       |
  | Name (Z-A)       |
  | Price ($-$$$)    |
  | Price ($$$-$)    |