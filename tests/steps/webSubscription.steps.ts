import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { WebSubscriptionPage } from '../pages/webSubscriptionPage';

When('I scroll down to the footer section', async function (this: CustomWorld) {
    const subscriptionPage = new WebSubscriptionPage(this.page);
    await subscriptionPage.scrollToFooter();
});

Then('I should see the SUBSCRIPTION heading', async function (this: CustomWorld) {
    const subscriptionPage = new WebSubscriptionPage(this.page);
    await subscriptionPage.verifySubscriptionHeading();
});

When('I enter a valid email address and click the subscribe button', async function (this: CustomWorld) {
    const subscriptionPage = new WebSubscriptionPage(this.page);
    const testUser = require('../fixtures/testUser.json');
    await subscriptionPage.subscribe(testUser.email);
});

Then('I should see the subscription success message', async function (this: CustomWorld) {
    const subscriptionPage = new WebSubscriptionPage(this.page);
    await subscriptionPage.verifySuccessMessage();
});
