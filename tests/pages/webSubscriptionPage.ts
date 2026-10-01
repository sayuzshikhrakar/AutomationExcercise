import { Page, Locator, expect } from '@playwright/test';

export class WebSubscriptionPage {
    private readonly page: Page;
    private readonly footer: Locator;
    private readonly subscriptionHeading: Locator;
    private readonly emailInput: Locator;
    private readonly subscribeButton: Locator;
    private readonly successAlert: Locator;

    constructor(page: Page) {
        this.page = page;
        this.footer = page.locator('footer');
        this.subscriptionHeading = page.locator('footer h2').filter({ hasText: /Subscription/i });
        this.emailInput = page.locator('#susbscribe_email');
        this.subscribeButton = page.locator('#subscribe');
        this.successAlert = page.locator('#success-subscribe').getByText('You have been successfully subscribed!');
    }

    async scrollToFooter() {
        await this.footer.scrollIntoViewIfNeeded();
    }

    async verifySubscriptionHeading() {
        await expect(this.subscriptionHeading).toBeVisible();
    }

    async subscribe(email: string) {
        await this.emailInput.fill(email);
        await this.subscribeButton.click();
    }

    async verifySuccessMessage() {
        await expect(this.successAlert).toBeVisible();
    }
}
