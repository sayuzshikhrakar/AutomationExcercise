import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { WebCartPage } from '../pages/webCartPage';

When('I hover over the first product and click Add to cart', async function (this: CustomWorld) {
    const cartPage = new WebCartPage(this.page);
    await cartPage.addFirstProductToCart();
});

When('I click Continue Shopping button in the modal', async function (this: CustomWorld) {
    const cartPage = new WebCartPage(this.page);
    await cartPage.clickContinueShopping();
});

When('I hover over the second product and click Add to cart', async function (this: CustomWorld) {
    const cartPage = new WebCartPage(this.page);
    await cartPage.addSecondProductToCart();
});

When('I click View Cart button in the modal', async function (this: CustomWorld) {
    const cartPage = new WebCartPage(this.page);
    await cartPage.clickViewCartModal();
});

Then('I should verify both products are added to the cart', async function (this: CustomWorld) {
    const cartPage = new WebCartPage(this.page);
    await cartPage.verifyTwoProductsInCart();
});

Then('I should verify their prices, quantity, and total prices are correct', async function (this: CustomWorld) {
    const cartPage = new WebCartPage(this.page);
    await cartPage.verifyCartPricesAndQuantities();
});

When('I increase the quantity to {int}', async function (this: CustomWorld, quantity: number) {
    const cartPage = new WebCartPage(this.page);
    await cartPage.increaseQuantity(quantity.toString());
});

When('I click Add to cart button', async function (this: CustomWorld) {
    const cartPage = new WebCartPage(this.page);
    await cartPage.clickAddToCartButton();
});

Then('I should verify the product is displayed in the cart with a quantity of {int}', async function (this: CustomWorld, quantity: number) {
    const cartPage = new WebCartPage(this.page);
    await cartPage.verifyQuantityInCart(quantity.toString());
});

Then('I should verify the product is added to the cart', async function (this: CustomWorld) {
    const cartPage = new WebCartPage(this.page);
    await cartPage.verifyProductInCart();
});

When('I click the X button for the product', async function (this: CustomWorld) {
    const cartPage = new WebCartPage(this.page);
    await cartPage.removeFirstProduct();
});

Then('I should verify that the product is removed from the cart', async function (this: CustomWorld) {
    const cartPage = new WebCartPage(this.page);
    await cartPage.verifyCartIsEmpty();
});


When('I add searched products to the cart', async function (this: CustomWorld) {
    const cartPage = new WebCartPage(this.page);
    await cartPage.addSearchedProductsToCart();
});

When('I navigate to login page and login with valid credentials', async function (this: CustomWorld) {
    const cartPage = new WebCartPage(this.page);
    const testUser = require('../fixtures/testUser.json');
    const testSignupInfo = require('../fixtures/testSignupInfo.json');
    await cartPage.navigateToLogin(testUser.email, testSignupInfo.password);
});

When('I navigate to the Cart page', async function (this: CustomWorld) {
    const cartPage = new WebCartPage(this.page);
    await cartPage.navigateToCart();
});

Then('I should verify the same products are still visible in the cart after login', async function (this: CustomWorld) {
    const cartPage = new WebCartPage(this.page);
    await cartPage.verifyCartHasItems();
});

When('I scroll to the bottom of the page', async function (this: CustomWorld) {
    const cartPage = new WebCartPage(this.page);
    await cartPage.scrollToBottom();
});

Then('I should verify RECOMMENDED ITEMS section is visible', async function (this: CustomWorld) {
    const cartPage = new WebCartPage(this.page);
    await cartPage.verifyRecommendedItems();
});

When('I click Add To Cart on a recommended product', async function (this: CustomWorld) {
    const cartPage = new WebCartPage(this.page);
    await cartPage.addRecommendedProductToCart();
});

Then('I should verify the product is displayed in the cart page', async function (this: CustomWorld) {
    const cartPage = new WebCartPage(this.page);
    await cartPage.verifyCartHasItems();
});
