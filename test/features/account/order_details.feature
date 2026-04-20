@EZSANISOFT-5403
Feature: My Account - Order Details

Background:
  Given the user is logged in
  And the user is on the My Account page
  When the user selects "Order History" from the My Account menu
#   And the user has at least one order is palced.
#   And each order should have an "Order Details" action link

@skip
# Open Order Details Page
Scenario Outline: Open Order Details page for an order
  Given the user is viewing the Order History page
  When the user clicks on the "Order Details" link for order "<order_number>"
  Then the Order Details page should be displayed
  And the page URL should contain "/account/order-detail/<order_number>"

# Order Summary Information
Scenario: Verify order summary details on Order Details page
  Given the user is on the Order Details page
  Then the Order details have the following informations
  | OrderDate     |
  | Order Number  |
  | Order Total   |
  | Order Status  |

@skip
# Return and Order Status Section
Scenario: Verify return option and order status indicators
  Given the user is on the Order Details page
  Then the "Start Return" option from Narvar should be visible
  And the order status message "Order is being processed" should be displayed
  And the order progress states should be visible in the following order:
    | Ordered   |
    | Shipped   |
    | Delivered |
  Then the shipment tracking map tile should be visible
  And the order item details section should be displayed

@skip
# Shipping Information Section
Scenario Outline: Verify shipping information details
  Given the user is on the Order Details page
  Then the Shipping Address information should be visible
  And the user can see the Shipping Method and Track my Package link
  And the user can see the <<Customer Service>> options
  | Return Policy |
  | Shipping Info |
  | Contact Us    |

@skip
# Payment and Total Information
Scenario Outline: Verify payment and total information sections
  Given the user is viewing the Order Details page
  Then the "<payment_section>" should be visible

  Examples:
    | payment_section             |
    | Print Invoice (PDF) link    |
    | Payment Method              |
    | Billing Address             |
    | Order Total Section         |