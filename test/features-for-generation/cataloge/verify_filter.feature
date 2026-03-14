@EZSANISOFT-5367
Feature: Verify filter selection and product result updates on Product Listing page - {{CATEGORY}}

Background:
  Given the user visite "{{CATEGORY}}" page
  
  
Scenario: Verify filter panel is displayed
  Then all available filters should be displayed on the Product Listing page
  

# @skip
# Scenario Outline: Verify that a filter can be selected and applied
#   # Step 1 – Locate the filter section
#   When the user scrolls to the "<Filter Category>" filter section in the side panel
#   And the user verifies the "<Filter Category>" filter section is displayed

#   # Step 2 – Expand and select option
#   And the user expands the "<Filter Category>" filter section if it is collapsed
#   And the user selects the "<Filter Option>" option under "<Filter Category>"

#   # Step 3 – Verify applied filter section
#   Then the "<Filter Option>" filter should appear in the applied filters section
#   And the applied filters section should remain visible

#   # Step 4 – Verify product result update
#   And the product results should update based on "<Filter Category>" and "<Filter Option>"
#   And only products matching "<Filter Option>" should be displayed
#   And products not matching "<Filter Option>" should not appear

#   # Step 5 – Verify filter persistence
#   When the user refreshes the page
#   Then the "<Filter Option>" filter should remain applied
#   And the filtered product results should remain accurate after refresh

#   # Step 6 – Clear the selected filter
#   When the user removes the "<Filter Option>" filter from the applied filters section
#   Then the "<Filter Option>" filter should no longer be listed as applied
#   And the product results should reset to the default unfiltered state

# # Eyeglasses, Sunglasses, Readers category specific Filter option

#   Examples:
#   | Filter Category       | Filter Option               |
#   | Virtual Try-On        | Virtual Try-On              |
#   | In Stock              | In Stock                    |
#   | Clearance             | Clearance                   |
#   | Product Categories    | Eyeglasses                  |
#   | Product Categories    | Sunglasses                  |
#   | Frame Color           | Green                       |
#   | Frame Color           | Brown                       |
#   | Frame Color           | Blue                        |
#   | Gender                | Women's                     |
#   | Gender                | Unisex                      |
#   | Gender                | Men's                       |
#   | Gender                | Kids                        |
#   | Frame Type            | Full Rim                    |
#   | Frame Type            | Rimless                     |
#   | Frame Type            | Semi Rim                    |
#   | Brands                | Ray-Ban                     |
#   | Brands                | Oakley                      |
#   | Features              | Prescription Ready          |
#   | Features              | Polarized                   |
#   | Multifocal            | Bifocal                     |
#   | Multifocal            | Progressive                 |
#   | Frame Size            | Small                       |
#   | Frame Size            | Medium                      |
#   | Frame Size            | Large                       |
#   | Frame Size            | Extra Wide                  |
#   | Frame Size            | Extra Small                 |
#   | Frame Dimensions      | Lens Width                  |
#   | Frame Dimensions      | Bridge Width                |
#   | Frame Dimensions      | Arm Length                  |
#   | Size                  | Lens Width                  |
#   | Size                  | Bridge Width                |
#   | Size                  | Arm Length                  |
#   | Frame Shape           | Round                       |
#   | Frame Shape           | Square                      |
#   | Frame Material        | Plastic                     |
#   | Frame Material        | Metal                       |
#   | Frame Material        | Cellulose Acetate/zyl       |
#   | Material              | Plastic                     |
#   | Material              | Metal                       |
#   | Material              | Titanium                    |
#   | Overstock             | Yes                         |
#   | Overstock             | No                          |
#   | Reviews               | 5 Star                      |
#   | Reviews               | 4 Star & Up                 |
#   | Reviews               | 3 Star & Up                 |
#   | Reviews               | 2 Star & Up                 |
#   | Reviews               | 1 Star & Up                 |
#   | Price                 | Under $25                   |
#   | Price                 | $25 to $50                  |
#   | Price                 | $50 to $75                  |
#   | Price                 | $75 to $100                 |


# # Contact Lenses category specific Filter option


#   Examples:
#   | Filter Category          | Filter Option          |
#   | Brands                   | Acuvue                 |
#   | Brands                   | Biofinity              |
#   | Brands                   | Eiyan Lens             |
#   | Manufacturers            | Alcon                  |
#   | Manufacturers            | Bausch & Lomb          |
#   | Manufacturers            | Eiyan                  |
#   | Contact Lens Schedule    | Daily                  |
#   | Contact Lens Schedule    | Monthly                |
#   | Contact Lens Schedule    | 1-2 Weekly             |
#   | Contact Lens Types       | Sphere                 |
#   | Contact Lens Types       | Astigmatism/Toric      |
#   | Contact Lens Types       | Bifocal/Multifocal     |
#   | Contact Lens Types       | Color Lenses           |
#   | Contact Lens Types       | Multifocal+Toric       |
#   | Base Curve               | 8.2                    |
#   | Base Curve               | 8.5                    |
#   | Base Curve               | 9.0                    |
#   | Diameter                 | 13.8                   |
#   | Diameter                 | 14.1                   |
#   | Diameter                 | 14.5                   |
#   | Reviews                  | 5 Star                 |
#   | Reviews                  | 4 Star & Up            |
#   | Reviews                  | 3 Star & Up            |
#   | Reviews                  | 2 Star & Up            |
#   | Reviews                  | 1 Star & Up            |


# # Eyecare category specific Filter option


# Examples:
#   | Filter Category      | Filter Option       |
#   | Product Categories   | Dry Eye Relief      |
#   | Product Categories   | Eyelid Cleaners     |
#   | Product Categories   | Eye Vitamins        |
#   | Product Categories   | Contact Lens Care   |
#   | Product Categories   | Lens Care           |
#   | Product Categories   | Eye Cream           |
#   | Brands               | Alcon               |
#   | Brands               | Bausch & Lomb       |
#   | Brands               | Eye Promise         |
#   | Reviews              | 5 Star              |
#   | Reviews              | 4 Star & Up         |
#   | Reviews              | 3 Star & Up         |
#   | Reviews              | 2 Star & Up         |
#   | Reviews              | 1 Star & Up         |
#   | Price                | Under $25           |
#   | Price                | $25 to $50          |
#   | Price                | $50 to $75          |
#   | Price                | $75 to $100         |

@skip
Scenario: Verify multiple filters applied together
  When the user applies multiple filters
  Then only products matching all selected filter criteria should be displayed
  Then the applied filters should be displayed above the product listing section
  When the user clicks on the remove (X) icon for an applied filter
  Then the selected filter should be removed
  And only products matching all selected filter criteria should be displayed

@skip
Scenario: Verify filter selection persists across pagination
  When the user applies a filter
  And the user views a product on the listing page
  And the user navigates to the next page using pagination
  And the user navigates to the previous page using pagination
  Then the selected filter should remain applied
  And the product name and review data should remain visible and unchanged

@skip
Scenario: Verify filter selection persists on page refresh
  When the user applies a filter
  And the user views a product on the listing page
  And the user refreshes the Product Listing page
  Then the selected filter should remain applied
  And the product results should remain filtered
  And the product name and review data should remain visible and unchanged
  
@skip
Scenario: Verify resetting all filters at once
  When the user applies a filter
  Then Reset All Filters link should get displayed at the top left of product listing section
  When the user clicks the Reset All Filters button
  Then no filters should remain applied
  # And the product results should reset to default