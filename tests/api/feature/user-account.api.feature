@api @userAccount
Feature: User Account API

  @smoke @regression
  Scenario: Create a new user account
    When I send a POST request to create a new user account with valid details
    Then the API response code should be 201
    Then the response message should be "User created!"

  @regression @needsUser
  Scenario: Delete an existing user account
    When I send a DELETE request to delete the user account with valid credentials
    Then the API response code should be 200
    Then the response message should be "Account deleted!"

  @regression @needsUser
  Scenario: Update an existing user account
    When I send a PUT request to update the user account with valid details
    Then the API response code should be 200 for updated user
    Then the response should confirm that the user was updated

  @smoke @regression @needsUser
  Scenario: Get user account detail by email
    When I send a GET request to retrieve user details by email
    Then the API response should be successfull for get account by email
    Then the response should contain the user detail for get account by email
