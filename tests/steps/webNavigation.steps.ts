import { When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { WebNavigationPage } from '../pages/webNavigationPage';

When('I click on the Test Cases button in the navbar', async function (this: CustomWorld) {
    const navigationPage = new WebNavigationPage(this.page);
    await navigationPage.clickTestCasesNavLink();
});

Then('I should be navigated to the Test Cases page', async function (this: CustomWorld) {
    const navigationPage = new WebNavigationPage(this.page);
    await navigationPage.verifyTestCasesPage();
});

When('I scroll down to the bottom of the page', async function (this: CustomWorld) {
    const navigationPage = new WebNavigationPage(this.page);
    await navigationPage.scrollToBottom();
});

Then('I should see the SUBSCRIPTION heading in the footer', async function (this: CustomWorld) {
    const navigationPage = new WebNavigationPage(this.page);
    await navigationPage.verifySubscriptionHeadingVisible();
});

When('I click the scroll-up arrow button', async function (this: CustomWorld) {
    const navigationPage = new WebNavigationPage(this.page);
    await navigationPage.clickScrollUpButton();
});

When('I scroll back to the top of the page without using the arrow button', async function (this: CustomWorld) {
    const navigationPage = new WebNavigationPage(this.page);
    await navigationPage.scrollToTop();
});

Then('I should see the hero text at the top of the page', async function (this: CustomWorld) {
    const navigationPage = new WebNavigationPage(this.page);
    await navigationPage.verifyHeroTextVisible();
});
