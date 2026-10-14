@api
Feature: Brands API

  @smoke
  Scenario: Get all brands
    When I request the brands list
    Then the API response should be successfull
    And the response should contain a non-empty list of brands

  @regression
  Scenario: Reject an unsupported PUT request to the brands list
    When I send a PUT request to the brands list
    Then the API response should report that the request method is not supported in for BrandsList
