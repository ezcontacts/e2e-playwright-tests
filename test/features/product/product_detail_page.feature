@EZSANISOFT-5331
Feature: Product Detail Page – Reader Category

Background:
  Given the user visite "READERS" page
  When I click on the first product card in the list

@skip
#Page Structure & Core Content
Scenario: Core Product Detail Page content is displayed
  Then the breadcrumb navigation should be visible
  And the product brand and product name should be displayed
  And the average rating, total reviews count, and Q&A count should be displayed
  And the default product image should be visible
  And the product price and discount information should be displayed correctly
  And the Add to Cart button should be visible
  And the availability status should be displayed
  And the Specifications tab should be visible
  And the 360-degree view button should be visible
  And the Try-On button should be visible
  And the footer should be visible when the end of the page is reached

#Wishlist
Scenario: Wishlist icon and tooltip behavior
  Then I should see the "Add to Wishlist" button
  When the user hovers over the wishlist heart icon
  Then a tooltip with text "Add to Wishlist." should be displayed
  When the user moves the cursor away
  Then the wishlist tooltip should disappear

Scenario: Wishlist behavior based on user logged-out state
  When the user clicks the wishlist add link
  Then the user should be redirected to "/account/sign-in"

@skip
#Pricing, Payments & Rewards
Scenario: Pricing, EZPoints and Affirm messaging
  Then the discounted price should be displayed
  And the original price should be shown as strikethrough
  And an EZPoints message with points value and info tooltip should be displayed
  And an Affirm monthly payment message should be visible

@skip
Scenario: User opens Affirm qualification popup
  When the user clicks the "See if you qualify" link
  Then the Affirm popup should be displayed

@skip
#Size, Color & Power Variant Selection
Scenario: Variant selectors are visible and defaulted
  Then the size dropdown should be visible with a default selection
  And the color dropdown should be visible with a default selection
  And the power dropdown should be visible with a default selection
  And the Choose Color tile section should display all available color variants

@skip
Scenario: Selecting a size updates product details
  When the user selects a different size
  Then the selected size should be applied
  And the SKU and specifications should update accordingly

@skip
Scenario: Selecting a color variant updates all dependent attributes
  When the user selects a color using either dropdown or color tiles
  Then the product image should update
  And the SKU should update
  And the specifications should update
  And the availability messaging should update
  And the price should update if applicable
  And the EZPoints value should update if price differs

@skip
Scenario: Color dropdown and tile selection stay synchronized
  When the user selects a color from the dropdown
  Then the matching color tile should be highlighted
  When the user selects a color tile
  Then the dropdown value should update to the selected color

@skip
Scenario: Selecting a different power option
  When the user selects a different power option
  Then the selected power should be applied

@skip
#Promotional Tags
Scenario: Promotional tags display based on selected variant
  Then promotional tags should be displayed only when applicable

@skip
Scenario: Promotional tags update when variant changes
  When the user switches between color variants
  Then the promotional tags should update accordingly
  And outdated promotional tags should be removed

@skip
Scenario: Promotional discount values change by variant
  When the user selects a variant with a different promotion
  Then the discount percentage should update correctly

@skip
#Cart
Scenario: User adds product to cart
  When the user clicks the Add to Cart button
  Then the product should be added to the cart
  And the user should be redirected to the cart page with a success message

@skip
#Product Description & Specifications
Scenario: Product description and specifications
  Then the product description should be displayed with a Read More option
  When the user opens the Specifications tab
  Then the product name, SKU, and frame & lens attributes should be displayed

@skip
Scenario: Specifications remain accurate across variant changes
  When the user switches between variants multiple times
  Then the specifications should always reflect the currently selected variant

@skip
#Ratings, Reviews & Q&A
Scenario: Ratings and reviews section is displayed
  Then the average rating, rating breakdown, and reviews list should be visible
  And the Write Review button should be displayed

@skip
Scenario: Review pagination and filtering
  When review pagination exists
  Then filters should be available
  And the user should be able to filter reviews by rating, relevance, or keyword

@skip
Scenario: Q&A section pagination
  Then the Q&A section should display existing questions and answers
  And pagination should appear when multiple Q&A pages exist

@skip
#Reviews Interaction
Scenario: User writes a review
  When the user clicks the Write Review button
  Then the review submission form should open

@skip
#Visual & Interactive Features
Scenario: 360-degree product view
  When the user clicks the 360-degree view icon
  Then the product should be viewable in a 360-degree interactive mode

@skip
Scenario: Try-On functionality
  When the user clicks the Try-On button
  Then the camera permission prompt should appear

@skip
Scenario: Try-On permission denied
  Given the user denies camera access
  Then an error message explaining camera access is required should be displayed

@skip
#Customer Photos
Scenario: Customer photos display and interaction
  When customer photos are available
  Then customer photo thumbnails should be displayed
  When the user clicks a customer photo
  Then the photo should open in a modal with review details and Shop Now option

@skip
#Recommendations & Recently Viewed
Scenario: Recommended products and recently viewed items
  Then the Recommended For You section should display related products
  And recently viewed products should be displayed when available

@skip
#Breadcrumb Navigation
Scenario: Breadcrumb navigation
  Then the breadcrumbs should be visible
  When the user clicks a breadcrumb link
  Then the user should be redirected to the corresponding category page

#Customer Support
Scenario: Customer support contact block
  Then the support representative image should be visible
  And the Contact Us link should navigate to the customer support page