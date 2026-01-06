@pd_measure @validation @func
Feature: Measure Pupil Distance

  Background:
    Given I visit the homepage

@smoke
  Scenario: Validate core sections of the PD page
    Given I visit the Measure Pupil Distance page
    Then I should see the page title "Measure Pupil Distance"
    And I should see the instructions for online tool
    And I should see a button with text "Click To Start Our Online PD Tool"
    And I should see a section titled "Manual Instructions"
    And I should see the PD instructional video
    And The video should autoplay and be muted
    And I should see the step text "Step 1"
    And I should see the step text "Step 2"
    And I should see the step text "Step 3"
