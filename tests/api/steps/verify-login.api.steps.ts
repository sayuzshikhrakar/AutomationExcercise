import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../../support/world';
import { VerifyLoginAPIClient } from '../clients/verify-login.api.client';


When("I send a POST request to verify login with a valid email and password", async function (this: CustomWorld) {
    if (!this.apiRequestContext) {
        throw new Error('API request context was not created.');
    }
    const verifyloginAPIClient = new VerifyLoginAPIClient(this.apiRequestContext);
    this.apiResponse = await verifyloginAPIClient.verifyLogin(this.currentUser.email, this.currentUser.password);
    this.apiResponseBody = await this.apiResponse.json();
});

Then("the response should confirm that the user exists", async function (this: CustomWorld) {
    const body = this.apiResponseBody as {
        message: string
    }
    expect(body.message).toBe("User exists!");
});

When("I send a POST request to verify login with only a password", async function (this: CustomWorld) {
    const verifyloginAPIClient = new VerifyLoginAPIClient(this.apiRequestContext!);
    this.apiResponse = await verifyloginAPIClient.verifyLogin("", this.currentUser.password);
    this.apiResponseBody = await this.apiResponse.json();
});

Then("the API response should report that the email or password parameter is missing", async function (this: CustomWorld) {
    const body = this.apiResponseBody as {
        responseCode: number,
        message: string
    }
    expect(body.responseCode).toBe(400);
    expect(body.message).toBe("Bad request, email or password parameter is missing in POST request.");
})


When("I send a DELETE request to the verify login endpoint", async function (this: CustomWorld) {
    if (!this.apiRequestContext) {
        throw new Error('API request context was not created.');
    }
    const verifyloginAPIClient = new VerifyLoginAPIClient(this.apiRequestContext);
    this.apiResponse = await verifyloginAPIClient.deleteVerifyLogin();
    this.apiResponseBody = await this.apiResponse.json();
});

Then("the API response should report that the request method is not supported for VerifyLogin", async function (this: CustomWorld) {
    const body = this.apiResponseBody as {
        responseCode: number,
        message: string
    }
    expect(body.responseCode).toBe(405);
    expect(body.message).toBe("This request method is not supported.");
});

When("I send a POST request to verify login with an invalid email and password", async function (this: CustomWorld) {
    if (!this.apiRequestContext) {
        throw new Error('API request context was not created.');
    }
    const verifyloginAPIClient = new VerifyLoginAPIClient(this.apiRequestContext);
    this.apiResponse = await verifyloginAPIClient.verifyLogin("exaple@test.com", "pass@123");
    this.apiResponseBody = await this.apiResponse.json();
    console.log(this.apiResponseBody);
});

Then("the API response should report that the user was not found", async function (this: CustomWorld) {
    const body = this.apiResponseBody as {
        responseCode: number,
        message: string
    }
    expect(body.responseCode).toBe(404);
    expect(body.message).toBe("User not found!");
})