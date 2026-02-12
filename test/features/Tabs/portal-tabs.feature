Feature: Verify tabs display and functionality on the portal

  Background:
    Given the user is on any page of the application

  # ===================== Tabs visibility =====================
  Scenario: Verify all tabs are displayed on the portal
    When the user navigates to the portal homepage
    Then the following tabs should be visible
      | TAB            |
      | Sunglasses     |
      | Eyeglasses     |
      | Contact Lenses |
      | Readers        |
      | Eye Care       |
      | Deals          |
      | Sales          |

  # ===================== Tab redirection =====================
  Scenario Outline: Verify user is redirected to correct product listing page on tab click
    When the user clicks on the "<TAB>" tab
    Then the "<TAB>" tab should redirect to its product listing page

    Examples:
      | TAB            |
      | Sunglasses     |
      | Eyeglasses     |
      | Contact Lenses |
      | Readers        |
      | Eye Care       |
      | Deals          |

  # ===================== Hover and submenu (TEXT links only) =====================
  Scenario Outline: Verify hovering on a tab displays the correct text sub-menu
    When the user hovers over the "<Tab Name>" tab
    Then the "<Sub Menu Name>" submenu option should be displayed
    When the user clicks on the "<Sub Menu Name>" option
    Then the user should be redirected to the "<Sub Menu Name>" page

    Examples:
      | Tab Name        | Sub Menu Name |
      | Sunglasses      | Men’s         |
      | Sunglasses      | Women's       |
      | Sunglasses      | Children's    |
      | Eyeglasses      | Men’s         |
      | Eyeglasses      | Women's       |
      | Eyeglasses      | Children's    |
      | Contact Lenses  | Avaira        |
      | Contact Lenses  | Dailies       |
      | Contact Lenses  | CooperVision  |     
      | Eye Care        | Eye Drops     |
      | Eye Care        | Eye Vitamins  |



  # ===================== Hover out menu =====================
  Scenario: Verify menu hides when hover is removed
    When the user hovers over the "Sunglasses" tab
    And the corresponding dropdown menu is displayed
    When the user moves the cursor away from the tab
    Then the dropdown menu should no longer be displayed

  # ===================== Active tab highlighting =====================
  Scenario: Verify active tab highlighting
    When the user clicks on the "Sunglasses" tab
    Then the selected tab should be highlighted as active

    When the user clicks on the "Eyeglasses" tab
    Then the "Sunglasses" tab should NOT be active
    And the "Eyeglasses" tab should be highlighted as active

  # ===================== Tab content load =====================
  Scenario Outline: Verify user can switch tabs and see content
    When the user switches to and verifies the "<TAB>" tab
    Then the "<TAB>" tab should redirect to its product listing page

    Examples:
      | TAB            |
      | Sunglasses     |
      | Eyeglasses     |
      | Contact Lenses |
      | Readers        |
      | Eye Care       |
      | Deals          |
      | Sales          |
