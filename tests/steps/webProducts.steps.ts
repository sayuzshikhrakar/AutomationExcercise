import { When, Then } from '@cucumber/cucumber';
import { CustomWorld } from 'support/world';
import { WebProductsPage } from 'pages/webProductsPage';
import { webProductDetailPage } from 'pages/webProductDetailPage';
import { assertObjectsEqual } from 'support/utils';

Then('I should see the product list', async function (this: CustomWorld) {
    const productsPage = new WebProductsPage(this.page);
    await productsPage.verifyProductList();
})

Then('I click View Product on the first product', async function (this: CustomWorld) {
    const productsPage = new WebProductsPage(this.page);
    await productsPage.viewFirstProduct();
})

Then('I should see the product detail page', async function (this: CustomWorld) {
    const productsPage = new WebProductsPage(this.page);
    await productsPage.verifyAllFirstProductDetailPage();
})

Then('I should see product name, category, price, availability, condition, and brand', async function (this: CustomWorld) {
    const productDetailPage = new webProductDetailPage(this.page);
    const scrapedProductInfo = await productDetailPage.getProductDetails();
    const productInfo = require('../fixtures/firstProductDetail.json');
    await assertObjectsEqual(scrapedProductInfo, productInfo);
})

When('I enter a product name and search', async function (this: CustomWorld) {
    const productsPage = new WebProductsPage(this.page);
    const testProducts = require('../fixtures/testProducts.json');
    this.randomProduct = testProducts[Math.floor(Math.random() * testProducts.length)];
    await productsPage.searchProduct(this.randomProduct.name);

})

Then('I should see the SEARCHED PRODUCTS heading', async function (this: CustomWorld) {
    const productsPage = new WebProductsPage(this.page);
    await productsPage.verifySearchedProductsHeading();
})

Then('I should see all products related to the search', async function (this: CustomWorld) {
    const productsPage = new WebProductsPage(this.page);
    await productsPage.verifySearchedProductsList();
    await productsPage.VerifyProductSearchResult(this.randomProduct.name, this.randomProduct.price);

})

Then('I should see categories on the left sidebar', async function (this: CustomWorld) {
    const productsPage = new WebProductsPage(this.page);
    await productsPage.verifyCategoryWrapper();
})

When('I click on the {string} category and select a sub-category', async function (this: CustomWorld, category: string) {
    const productsPage = new WebProductsPage(this.page);

    const categoriesData = require('../fixtures/productCategory.json');
    const subCategories = categoriesData[category];

    // Pick a random sub-category from the array
    const randomSubCategory = subCategories[Math.floor(Math.random() * subCategories.length)];

    // Save it to the world context so we can verify it in the next step
    this.selectedSubCategory = randomSubCategory;

    // Click it on the page
    await productsPage.clickCategoryAndSubCategory(category, randomSubCategory);
})

Then('I should see the {string} category page', async function (this: CustomWorld, category: string) {
    const productsPage = new WebProductsPage(this.page);

    // Verify using both the category from the Feature file, and the random sub-category we picked!
    await productsPage.verifyCategoryPage(category, this.selectedSubCategory!);
});

Then('I should see the Brands section on the left sidebar', async function (this: CustomWorld) {
    const productsPage = new WebProductsPage(this.page);
    await productsPage.verifyBrandWrapper();
})

Then('I click on a {string} name', async function (this: CustomWorld, brand: string) {
    const productsPage = new WebProductsPage(this.page);
    this.selectedBrand = brand;
    await productsPage.clickBrand(this.selectedBrand!);
})

Then('I should be navigated to that {string} page', async function (this: CustomWorld, brand: string) {
    const productsPage = new WebProductsPage(this.page);
    await productsPage.VerifyBrandPage(brand);
});

Then('I should see the Write Your Review section', async function (this: CustomWorld) {
    const productsPage = new WebProductsPage(this.page);
    await productsPage.verifyWriteReviewSection();
});

When('I submit a review with name, email, and review text', async function (this: CustomWorld) {
    const productsPage = new WebProductsPage(this.page);
    // Passing hardcoded dummy data for the test
    await productsPage.submitReview("John Doe", "john.doe@example.com", "This product is absolutely amazing! Highly recommend it.");
});

Then('I should see the review success message', async function (this: CustomWorld) {
    const productsPage = new WebProductsPage(this.page);
    await productsPage.verifyReviewSuccessMessage();
});
