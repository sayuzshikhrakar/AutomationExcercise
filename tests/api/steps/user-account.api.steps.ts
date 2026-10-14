import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../../support/world';
import { UserAccountAPIClient } from '../clients/user-account.api.client';


When("I send a POST request to create a new user account with valid details", async function (this: CustomWorld) {
    if (!this.apiRequestContext) {
        throw new Error('API request context was not created.');
    }
    const userAccountAPIClient = new UserAccountAPIClient(this.apiRequestContext);
    const { response, userPayload } = await userAccountAPIClient.createNewValidUser();
    this.apiResponse = response;
    this.currentUser = userPayload;
    this.apiResponseBody = await this.apiResponse.json();
});

Then("the API response code should be {int}", async function (this: CustomWorld, expectedCode: number) {
    const body = this.apiResponseBody as { responseCode?: number };
    expect(body.responseCode).toBe(expectedCode);
});

Then("the response message should be {string}", async function (this: CustomWorld, expectedMessage: string) {
    const body = this.apiResponseBody as { message?: string };
    expect(body.message).toBe(expectedMessage);
});

When("I send a DELETE request to delete the user account with valid credentials", async function (this: CustomWorld) {
    if (!this.apiRequestContext) {
        throw new Error('API request context was not created.');
    }
    const userAccountAPIClient = new UserAccountAPIClient(this.apiRequestContext);
    this.apiResponse = await userAccountAPIClient.deleteUser(this.currentUser.email, this.currentUser.password);
    this.apiResponseBody = await this.apiResponse.json();
});

Then("the API response code should be {string} for deleted user", async function (this: CustomWorld, expectedCode: string) {
    const body = this.apiResponseBody as { responseCode?: string };
    expect(body.responseCode).toBe(expectedCode);
});


Then("the response message should be {string} for deleted user", async function (this: CustomWorld, expectedMessage: string) {
    const body = this.apiResponseBody as { message?: string };
    expect(body.message).toBe(expectedMessage);
});


When("I send a PUT request to update the user account with valid details", async function (this: CustomWorld) {
    if (!this.apiRequestContext) {
        throw new Error('API request context was not created.');
    }
    const userAccountAPIClient = new UserAccountAPIClient(this.apiRequestContext);
    this.apiResponse = await userAccountAPIClient.updateUser(this.currentUser.email, this.currentUser.password);
    this.apiResponseBody = await this.apiResponse.json();
});

Then("the API response code should be {int} for updated user", async function (this: CustomWorld, expectedCode: number) {
    const body = this.apiResponseBody as { responseCode?: number };
    expect(body.responseCode).toBe(expectedCode);
});

Then("the response message should be {string} for updated user", async function (this: CustomWorld, expectedMessage: string) {
    const body = this.apiResponseBody as { message?: string };
    expect(body.message).toBe(expectedMessage);
});

Then("the response should confirm that the user was updated", async function (this: CustomWorld) {
    const body = this.apiResponseBody as { message?: string };
    expect(body.message).toBe("User updated!");
});


When("I send a GET request to retrieve user details by email", async function (this: CustomWorld) {
    if (!this.apiRequestContext) {
        throw new Error('API request context was not created.');
    }
    const userAccountAPIClient = new UserAccountAPIClient(this.apiRequestContext);
    this.apiResponse = await userAccountAPIClient.getUser(this.currentUser.email);
    this.apiResponseBody = await this.apiResponse.json();
});

Then("the API response should be successfull for get account by email", async function (this: CustomWorld) {
    const body = this.apiResponseBody as { responseCode?: number };
    expect(body.responseCode).toBe(200);
});

Then("the response should contain the user detail for get account by email", async function (this: CustomWorld) {
    const body = this.apiResponseBody as { user?: any };
    expect(body.user).toMatchObject({
        name: this.currentUser.name,
        email: this.currentUser.email,
        title: this.currentUser.title,
        birth_day: this.currentUser.birth_date,
        birth_month: this.currentUser.birth_month,
        birth_year: this.currentUser.birth_year,
        first_name: this.currentUser.firstname,
        last_name: this.currentUser.lastname,
        company: this.currentUser.company,
        address1: this.currentUser.address1,
        address2: this.currentUser.address2,
        country: this.currentUser.country,
        state: this.currentUser.state,
        city: this.currentUser.city,
        zipcode: this.currentUser.zipcode,
    });
    expect(body.user.id).toBeDefined();
});