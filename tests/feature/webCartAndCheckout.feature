@web @webcheckout
Feature: Cart and Checkout

  Scenario: Add Products in Cart
    Given I am on the web home page
    When I click on the Products button in the navbar
    Then I should be navigated to the ALL PRODUCTS page
    When I hover over the first product and click Add to cart
    And I click Continue Shopping button in the modal
    And I hover over the second product and click Add to cart
    And I click View Cart button in the modal
    Then I should verify both products are added to the cart
    And I should verify their prices, quantity, and total prices are correct

  Scenario: Verify Product Quantity in Cart
    Given I am on the web home page
    When I click View Product on the first product
    Then I should see the product detail page
    When I increase the quantity to 4
    And I click Add to cart button
    And I click View Cart button in the modal
    Then I should verify the product is displayed in the cart with a quantity of 4

  Scenario: Remove Products From Cart
    Given I am on the web home page
    When I click on the Products button in the navbar
    And I hover over the first product and click Add to cart
    And I click View Cart button in the modal
    Then I should verify the product is added to the cart
    When I click the X button for the product
    Then I should verify that the product is removed from the cart

  Scenario: Search Products and Verify Cart After Login
    Given I am on the web home page
    When I click on the Products button in the navbar
    Then I should be navigated to the ALL PRODUCTS page
    When I enter a product name and search
    Then I should see the SEARCHED PRODUCTS heading
    And I should see all products related to the search
    When I add searched products to the cart
    And I click View Cart button in the modal
    Then I should verify the product is added to the cart
    When I navigate to login page and login with valid credentials
    And I navigate to the Cart page
    Then I should verify the same products are still visible in the cart after login

  Scenario: Add to Cart from Recommended Items
    Given I am on the web home page
    When I scroll to the bottom of the page
    Then I should verify RECOMMENDED ITEMS section is visible
    When I click Add To Cart on a recommended product
    And I click View Cart button in the modal
    Then I should verify the product is displayed in the cart page
