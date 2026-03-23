@EZSANISOFT-5367
Feature: Verify filter selection and product result updates on Product Listing page - {{CATEGORY}}

Background:
  Given the user visite "{{CATEGORY}}" page
  
  
Scenario: Verify filter panel is displayed
  Then all available filters should be displayed on the Product Listing page

Scenario: Verify multiple filters applied together
  When the user applies multiple filters
  Then only products matching all selected filter criteria should be displayed
  Then the applied filters should be displayed above the product listing section
  When the user clicks on the remove (X) icon for an applied filter
  Then the selected filter should be removed
  And only products matching all selected filter criteria should be displayed

Scenario: Verify filter selection persists across pagination
  When the user applies a filter
  And the user views a product on the listing page
  And the user navigates to the next page using pagination
  And the user navigates to the previous page using pagination
  Then the selected filter should remain applied
  And the product name and review data should remain visible and unchanged

Scenario: Verify filter selection persists on page refresh
  When the user applies a filter
  And the user views a product on the listing page
  And the user refreshes the Product Listing page
  Then the selected filter should remain applied
  And the product results should remain filtered
  And the product name and review data should remain visible and unchanged
  
Scenario: Verify resetting all filters at once
  When the user applies a filter
  Then Reset All Filters link should get displayed at the top left of product listing section
  When the user clicks the Reset All Filters button
  Then no filters should remain applied
  # And the product results should reset to default