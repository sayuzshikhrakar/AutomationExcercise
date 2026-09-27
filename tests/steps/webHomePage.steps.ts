import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from 'support/world';
import { WebHomePage } from 'pages/webHomePage';
import { WebProductsPage } from 'pages/webProductsPage';
import { webProductDetailPage } from 'pages/webProductDetailPage';
import { assertArraysEqual, assertObjectsEqual } from 'support/utils';

Given('I am on the web home page', async function (this: CustomWorld) {
    const homePage = new WebHomePage(this.page);
    await homePage.navigate();
});

When('I click on the Products button in the navbar', async function (this: CustomWorld) {
    const homePage = new WebHomePage(this.page);
    await homePage.clickProducts();
})

Then('I should be navigated to the ALL PRODUCTS page', async function (this: CustomWorld) {
    const productsPage = new WebProductsPage(this.page);
    await productsPage.verifyAllProductsPage();
})

