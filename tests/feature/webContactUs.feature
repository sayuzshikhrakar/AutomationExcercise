@web @webcontactus
Feature: Contact and Forms

  Scenario: Contact Us Form Submission
    Given I am on the web home page
    When I click on Contact Us button in the navbar
    Then I should see the GET IN TOUCH heading
    When I submit the contact form with valid details and an attachment
    Then I should see the success message "Success! Your details have been submitted successfully."
    When I click the Home button
    Then I should be navigated to the web home page
