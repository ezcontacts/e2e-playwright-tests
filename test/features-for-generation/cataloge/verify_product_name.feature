@EZSANISOFT-5352
Feature: Catalog - Verify Product Name and Review Data

Background:
  Given the user visite "{{CATEGORY}}" page

Scenario Outline: Verify product name is displayed below each product icon
  Then each product icon should display the product name below it

Scenario Outline: Verify review data is displayed below each product icon
  When set first rating filter
  Then each product icon should display review data below it
  And the review data should include rating and review count

Scenario Outline: Verify product name and review alignment
  Then the product name and review data should be aligned correctly below the product icon
  
Scenario Outline: Verify product name and review data visibility across pagination
  When the user navigates to the next page using pagination
  Then the product name and review data should be displayed correctly for all products

Scenario Outline: Verify behavior when a product has no reviews
  When the user views a product with no reviews on the listing page
  Then the product should display only the product name
  And the review section should not be displayed

Scenario Outline: Verify product name and review data consistency on page refresh
  Given the user views a product on the listing page
  When the user refreshes the Product Listing page
  Then the product name and review data should remain visible and unchanged