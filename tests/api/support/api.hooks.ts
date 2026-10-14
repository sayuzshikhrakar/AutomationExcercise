import { Before, After } from '@cucumber/cucumber';
import { request } from '@playwright/test';
import { CustomWorld } from '../../support/world';
import { UserAccountAPIClient } from '../clients/user-account.api.client';


Before({ tags: '@api' }, async function (this: CustomWorld) {
    this.apiRequestContext = await request.newContext({
        baseURL: process.env.API_URL || 'https://automationexercise.com/api',
        extraHTTPHeaders: {
            Accept: 'application/json'
        }
    });
});

// Automatically creates a user before scenarios tagged with @needsUser
Before({ tags: '@needsUser' }, async function (this: CustomWorld) {
    if (!this.apiRequestContext) {
        throw new Error("API Request Context not initialized");
    }

    const userAccountAPIClient = new UserAccountAPIClient(this.apiRequestContext);
    const { response, userPayload } = await userAccountAPIClient.createNewValidUser();
    const body = await response.json();
    if (body.responseCode !== 201) {
        throw new Error(`Failed to create pre-requisite user in @needsUser hook: ${JSON.stringify(body)}`);
    }
    this.currentUser = userPayload;
})

After({ tags: '@api' }, async function (this: CustomWorld) {
    await this.apiRequestContext?.dispose();
})
