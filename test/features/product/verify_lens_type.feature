@EZSANISOFT-5378
Feature: Rx Frames -> Verify the Lens Type for Progressive / Bifocal options

Background:
  Given the user visite "EYEGLASSES" page
  When I click on the first product card in the list
  And I select the Progressive/Bifocal type
  And I fill prescription details for the right eye
  And I fill prescription details for the left eye
  And I fill prescription details for the pupil distance
  And I click on Lens Type section

#--------------------------------------
# Lens Type – UI Validation
#--------------------------------------
@skip
Scenario: Verify Lens Type categories and default behavior
  Then the following <Lens Type categories> should be displayed:
    | Lens Type Category        |
    | Progressive No Line       |
    | Bifocal (with Line)       |

  And no lens type option should be selected by default
  And lens type selection should be mandatory
  And the Continue button should be displayed in red color
  And the Continue button should be disabled until a lens type is selected

#--------------------------------------
# Options Validation
#--------------------------------------

Scenario: Verify Progressive No Line lens options
  When the user views "Progressive No Line" options
  Then the following Progressive lens options should be displayed:
    | ProgressiveOption         |
    | Standard Progressive      |
    | Premium Progressive       |
    | Varilux X                 |

  When the user views "Bifocal (with Line)" options
  Then the following Bifocal lens options should be displayed:
    | BifocalOption             |
    | Bifocal - Flat Top 28     |
    | Bifocal - Flat Top 35     |

#--------------------------------------
# Lens Type Selection – Progressive
#--------------------------------------
@skip
Scenario Outline: Verify user can select a Progressive lens option
  Given the user selects one of the category
  When the user selects the "<Options>" lens type
  Then the "<Options>" option should be highlighted
  And the Continue button should become enabled
  
Examples:
    | Options                  |
    | Standard Progressive     |
    | Premium Progressive      |
    | Varilux XR Series        |
    | Bifocal - Flat Top 28    |
    | Bifocal - Flat Top 35    |

    # When the user clicks the Continue button
    # Then the system should redirect the user to Step-5 "Lens Material" section