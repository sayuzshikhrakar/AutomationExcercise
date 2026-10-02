@web @websubscription
Feature: Subscription and Newsletter

  @smoke @sanity @regression
  Scenario: Verify Subscription in Home Page
    Given I am on the web home page
    When I scroll down to the footer section
    Then I should see the SUBSCRIPTION heading
    When I enter a valid email address and click the subscribe button
    Then I should see the subscription success message

  @regression
  Scenario: Verify Subscription in Cart Page
    Given I am on the web home page
    When I navigate to the Cart page
    When I scroll down to the footer section
    Then I should see the SUBSCRIPTION heading
    When I enter a valid email address and click the subscribe button
    Then I should see the subscription success message
