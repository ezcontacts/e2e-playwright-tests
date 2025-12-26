@skip @admin_orders_cancellation @e2e
Feature: Admin Order Cancellation Management
    

    Background:
        #Given The customer places an order from the Front end 
        Given I visit the admin panel page
        When I enter valid email and password
        Then I should be redirected to the dashboard
        When I search for the order by order number
        Then I should see the order search results
        # When I select the order:
        #     | Order Status                 | 
        #     | New Internet Order           | 


    @TEST_AC-1249 @skip
    Scenario Outline: Verify the impact when Pre Auth is open and Marked the Order as cancelled. 
        Then I ensure that all the remaining balance is not captured
        When I initiate the order cancellation
        And I choose the appropriate cancellation reason and confirm the cancellation
        Then the system should display the cancellation reason options
        And the notes at the bottom of the popup should be Void all the open Pre-Auth for This Order
        When I confirm the cancellation reason
        Then the order should be cancelled successfully



    @TEST_AC-1250 @skip
    Scenario: Verify the impact when payment is captured then no void message should show at the time of cancelling the record
        Given I ensure that all the remaining balance is captured
        When I initiate the order cancellation
        And I choose the appropriate cancellation reason and confirm the cancellation
        Then the system should display the cancellation reason options
        And no void related message should display at the bottom of the cancellation reason popup
        When I confirm the cancellation reason
        Then the order should be cancelled successfully
  


    @TEST_AC-1254 @skip
    Scenario: Verify the Void message when cancelling security hold order
        When I submit the order to Eye4Fraud
        Then the order should be on security hold
        When I cancel the order from the Order Status   
        Then the system should show the Void Pre-Auth label
        When I confirm the cancellation process
        Then the order should be cancelled successfully
