@api
Feature: Products API

  @smoke
  Scenario: Get all products
    When I request the products list
    Then the API response should be successfull
    And the response should contain a non-empty list of products

  @regression
  Scenario: Reject an unsupported POST request to the products list
    When I send a POST request to the products list
    Then the API response should report that the request method is not supported

  @smoke
  Scenario: Search for products with a valid search term
    When I search for products using "top"
    Then the API response should be successfull
    Then the response should contain a non-empty searched products list

  @regression
  Scenario: Reject a product search without the required search term
    When I search for products without a search term
    Then the API response should report that the search product parameter is missing
