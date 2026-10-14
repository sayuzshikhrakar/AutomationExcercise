import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../../support/world';
import { BrandsApiClient } from '../clients/brands.api.client';

When('I request the brands list', async function (this: CustomWorld) {
    if (!this.apiRequestContext) {
        throw new Error('API request context was not created.');
    }
    const brandsApiClient = new BrandsApiClient(this.apiRequestContext);
    this.apiResponse = await brandsApiClient.getBrandsList();
    this.apiResponseBody = await this.apiResponse.json();

});

Then('the response should contain a non-empty list of brands', async function (this: CustomWorld) {
    const body = this.apiResponseBody as {
        responseCode?: number;
        brands?: any[];
    }
    expect(body.responseCode).toBe(200);
    expect(body.brands?.length).toBeGreaterThan(0);
});

When('I send a PUT request to the brands list', async function (this: CustomWorld) {
    if (!this.apiRequestContext) {
        throw new Error('API request context was not created.');
    }
    const brandsApiClient = new BrandsApiClient(this.apiRequestContext);
    this.apiResponse = await brandsApiClient.putBrandsList();
    this.apiResponseBody = await this.apiResponse.json();
    console.log("response body is", this.apiResponseBody);
})

Then('the API response should report that the request method is not supported in for BrandsList', async function (this: CustomWorld) {
    const body = this.apiResponseBody as {
        responseCode?: number;
        message?: string;
    }
    expect(body.responseCode).toBe(405);
    expect(body.message).toBe('This request method is not supported.');
})