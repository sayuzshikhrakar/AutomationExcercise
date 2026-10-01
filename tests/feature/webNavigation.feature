@web @webnavigation
Feature: Navigation and UI Behaviour

  Scenario: Verify Test Cases Page
    Given I am on the web home page
    When I click on the Test Cases button in the navbar
    Then I should be navigated to the Test Cases page

  Scenario: Verify Scroll Up using Arrow Button and Scroll Down Functionality
    Given I am on the web home page
    When I scroll down to the bottom of the page
    Then I should see the SUBSCRIPTION heading in the footer
    When I click the scroll-up arrow button
    Then I should see the hero text at the top of the page

  Scenario: Verify Scroll Up without Arrow Button and Scroll Down Functionality
    Given I am on the web home page
    When I scroll down to the bottom of the page
    Then I should see the SUBSCRIPTION heading in the footer
    When I scroll back to the top of the page without using the arrow button
    Then I should see the hero text at the top of the page
