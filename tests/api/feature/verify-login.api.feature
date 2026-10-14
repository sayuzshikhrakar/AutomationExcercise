@api @verifyLogin
Feature: Verify Login API

  @smoke @regression @needsUser
  Scenario: Verify login with valid credentials
    When I send a POST request to verify login with a valid email and password
    Then the API response should be successfull
    Then the response should confirm that the user exists

  @regression @needsUser
  Scenario: Reject verify login with missing email parameter
    When I send a POST request to verify login with only a password
    Then the API response should report that the email or password parameter is missing

  @regression
  Scenario: Reject an unsupported DELETE request to verify login
    When I send a DELETE request to the verify login endpoint
    Then the API response should report that the request method is not supported for VerifyLogin

  @regression
  Scenario: Verify login with invalid credentials
    When I send a POST request to verify login with an invalid email and password
    Then the API response should report that the user was not found
