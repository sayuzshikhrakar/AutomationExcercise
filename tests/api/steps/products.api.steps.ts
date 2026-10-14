import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../../support/world';
import { ProductsApiClient } from '../clients/products.api.client';

When('I request the products list', async function (this: CustomWorld) {
    if (!this.apiRequestContext) {
        throw new Error('API request context was not created.');
    }
    const productsApiClient = new ProductsApiClient(this.apiRequestContext);
    this.apiResponse = await productsApiClient.getProducts();
    this.apiResponseBody = await this.apiResponse.json();

});

Then('the API response should be successfull', async function (this: CustomWorld) {
    expect(this.apiResponse).toBeDefined();
    expect(this.apiResponse?.status()).toBe(200);

});

Then('the response should contain a non-empty list of products', async function (this: CustomWorld) {

    const body = this.apiResponseBody as {
        responseCode?: number;
        products?: unknown[];
    };

    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products?.length).toBeGreaterThan(0);

});

When('I send a POST request to the products list', async function (this: CustomWorld) {
    if (!this.apiRequestContext) {
        throw new Error('API request context was not created.');
    }
    const productsApiClient = new ProductsApiClient(this.apiRequestContext);
    this.apiResponse = await productsApiClient.postProducts();
    this.apiResponseBody = await this.apiResponse.json();
});

Then('the API response should report that the request method is not supported', async function (this: CustomWorld) {

    const body = this.apiResponseBody as {
        responseCode?: number;
        message?: string;
    };
    expect(body.responseCode).toBe(405);
    expect(body.message).toBe('This request method is not supported.');
});

When('I search for products using {string}', async function (this: CustomWorld, searchTerm: string) {
    if (!this.apiRequestContext) {
        throw new Error('API request context was not created.');
    }
    const productsApiClient = new ProductsApiClient(this.apiRequestContext);
    this.apiResponse = await productsApiClient.searchProduct(searchTerm);
    this.apiResponseBody = await this.apiResponse.json();
});

Then('the response should contain a non-empty searched products list', async function (this: CustomWorld) {
    const body = this.apiResponseBody as {
        responseCode?: number;
        products?: any[];
    }
    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products?.length).toBeGreaterThan(0);
});

When('I search for products without a search term', async function (this: CustomWorld) {
    if (!this.apiRequestContext) {
        throw new Error('API request context was not created.');

    }
    const productsApiClient = new ProductsApiClient(this.apiRequestContext);
    this.apiResponse = await productsApiClient.searchProduct('');
    this.apiResponseBody = await this.apiResponse.json();
});

Then('the API response should report that the search product parameter is missing', async function (this: CustomWorld) {
    const body = this.apiResponseBody as {
        responseCode?: number;
        message?: string;
    }
    expect(body.responseCode).toBe(400);
    expect(body.message).toBe('Bad request, search_product parameter is missing in POST request.');
})