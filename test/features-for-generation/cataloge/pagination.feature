Feature: Pagination on {{CATEGORY}}

Background:
  Given the user visite "{{CATEGORY}}" page

Scenario: Verify products per {{CATEGORY}} page
  Then the Products per page dropdown should be visible
  And the default 30 products per page value should be selected

# @skip
# Scenario Outline: Verify Products per page dropdown selection - {{CATEGORY}}
#   When the user selects "<ProductCount>" from the Products per page dropdown
#   Then the Product Listing page should display "<ProductCount>" products per page

# Examples:
#   | ProductCount |
#   | 30           |
#   | 48           |
#   | 72           |
#   | 96           |