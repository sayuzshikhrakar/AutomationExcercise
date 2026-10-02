@web @weblogin
Feature: Web User Authentication

  @regression @sanity
  Scenario: Unsuccessful login with invalid credentials
    Given I am on the web login page
    When I submit an invalid email and password
    Then I should see an incorrect credentials error message

  @smoke @sanity @regression
  Scenario: Successful login with valid credentials
    Given I am on the web login page
    When I submit a valid email and password
    Then I should be directed to homepage
    Then I should see a logout button

  @smoke @sanity @regression
  Scenario: Logout User
    Given I am on the web login page
    When I submit a valid email and password
    Then I click the logout button
    Then I should be redirected to the login page

  @smoke @regression
  Scenario: Register User
    Given I am on the web login page
    Then I submit a new name and email for signup
    Then I fill in the account information details
    Then I click on Create account button
    Then I should be taken to account created page
    When I click on Continue button
    Then I should see I am logged in as freshly created account

  @regression
  Scenario: Register User with Existing Email
    Given I am on the web login page
    When I submit a name and an already registered email
    Then I should see an email already exists error message

  @regression
  Scenario: Delete Existing User
    Given I am on the web login page
    When I log in with the newly registered email
    When I click the delete account button
    Then I should see the account deleted message
