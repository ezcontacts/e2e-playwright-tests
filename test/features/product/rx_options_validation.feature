@EZSANISOFT-5322
Feature: Rx Options Validation on Product Details Page

  Background:
    Given I visit the homepage
    And I visit the eyeglasses page

  Scenario: Verify Rx and Non-Rx options are displayed correctly on PDP
    When I click on the first product card in the list
    Then I should see the "2. Lens Type" label in 2 step
    And I should see the following options under the "Prescription Options" section on the product page:
      | Option                        |
      | Distance (Single Vision)      |
      | Reading (Single Vision)       |
      | Progressive / Bifocal         |

    And I should see the following options under the "Non-prescription Options" section on the product page:
      | Option                        |
      | Manufacturer's Display Lenses |
      | Non-Corrective (Plano) Lenses |
      | Blue Light lenses             | 

Scenario: Verify the Rx options from the Cart page using "Add Rx" button 
    When I click on the first product card in the list
    And I add the product to the cart
    And I click on Buy Frames Only button
    Then I should see the success message for adding the product to the cart
    When I click the Add Rx button
    Then I should see the following options under the "Prescription Options" section on the product page:
      | Option                        |
      | Distance (Single Vision)      |
      | Reading (Single Vision)       |
      | Progressive / Bifocal         |

    And I should see the following options under the "Non-prescription Options" section on the product page:
      | Option                        |
      | Non-Corrective (Plano) Lenses |
      | Blue Light lenses             |