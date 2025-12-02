@homePage_UI @validation
Feature: FAQ Section and UI verification

 Background:
  Given I visit the homepage
  And I have dismissed the "No Thanks" popup if present

 Scenario: Verify the FAQ section header and description
  Then I should see the FAQ section with the header "Frequently"
  And I should see the description containing "Have any questions or doubts about choosing the right pair of glasses or contact lenses?"


