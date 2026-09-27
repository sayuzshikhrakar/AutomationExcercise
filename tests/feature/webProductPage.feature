@web
Feature: Catalog & Search

  Scenario: Verify All Products and Product Detail Page
    Given I am on the web home page
    When I click on the Products button in the navbar
    Then I should be navigated to the ALL PRODUCTS page
    Then I should see the product list
    Then I click View Product on the first product
    Then I should see the product detail page
    Then I should see product name, category, price, availability, condition, and brand

  Scenario: Search Product
    Given I am on the web home page
    When I click on the Products button in the navbar
    Then I should be navigated to the ALL PRODUCTS page
    When I enter a product name and search
    Then I should see the SEARCHED PRODUCTS heading
    And I should see all products related to the search

  Scenario: View Category Products
    Given I am on the web home page
    When I click on the Products button in the navbar
    Then I should be navigated to the ALL PRODUCTS page
    Then I should see categories on the left sidebar
    When I click on the "<category>" category and select a sub-category
    Then I should see the "<category>" category page

    Examples:
      | category |
      | WOMEN    |
      | MEN      |
      | KIDS     |

  Scenario: View Brand Products
    Given I am on the web home page
    When I click on the Products button in the navbar
    Then I should see the Brands section on the left sidebar
    When I click on a "<brand>" name
    Then I should be navigated to that "<brand>" page

    Examples:
      | brand              |
      | POLO               |
      | H&M                |
      | MADAME             |
      | MAST & HARBOUR     |
      | BABYHUG            |
      | ALLEN SOLLY JUNIOR |
      | KOOKIE KIDS        |
      | BIBA               |

  Scenario: Add Review on Product
    Given I am on the web home page
    When I click on the Products button in the navbar
    Then I should be navigated to the ALL PRODUCTS page
    When I click View Product on the first product
    Then I should see the Write Your Review section
    When I submit a review with name, email, and review text
    Then I should see the review success message
