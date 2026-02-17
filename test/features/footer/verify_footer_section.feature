@smoke
Feature: Verify Footer Section

  Background:
    Given I visit the homepage
  
  @desktopOnly
  Scenario: Verify footer sections
    Given I should see the footer with policy links
    And I should see the footer sections:
      | section        |
      | ACCOUNT        |
      | CATEGORIES     |
      | CUSTOMER CARE  |
      | HOW TOS        |
      | RESOURCES      |
      | CONTACT US     |
    And the footer should include links in "ACCOUNT":
      | linkText          |
      | Sign-in           |
      | Eyeglasses        |
      | About EZ Contacts |
      | Selecting Frames  |
      | Blog              |