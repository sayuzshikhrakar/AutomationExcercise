import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { WebContactUsPage } from '../pages/webContactUsPage';
import * as path from 'path';

When('I click on Contact Us button in the navbar', async function (this: CustomWorld) {
    const contactPage = new WebContactUsPage(this.page);
    await contactPage.clickContactUsLink();
});

Then('I should see the GET IN TOUCH heading', async function (this: CustomWorld) {
    const contactPage = new WebContactUsPage(this.page);
    await contactPage.verifyGetInTouchHeading();
});

When('I submit the contact form with valid details and an attachment', async function (this: CustomWorld) {
    const contactPage = new WebContactUsPage(this.page);
    const testUser = require('../fixtures/testUser.json');
    const testContactUs = require('../fixtures/testContactUs.json');
    const filePath = path.join(__dirname, '../fixtures/testUpload.txt');
    await contactPage.submitContactForm(
        testUser.firstName,
        testUser.email,
        testContactUs.subject,
        testContactUs.message,
        filePath
    );
});

Then('I should see the success message {string}', async function (this: CustomWorld, successMsg: string) {
    const contactPage = new WebContactUsPage(this.page);
    await contactPage.verifySuccessMessage(successMsg);
});

When('I click the Home button', async function (this: CustomWorld) {
    const contactPage = new WebContactUsPage(this.page);
    await contactPage.clickHomeButton();
});

Then('I should be navigated to the web home page', async function (this: CustomWorld) {
    const contactPage = new WebContactUsPage(this.page);
    await contactPage.verifyHomePageUrl();
});
