import { Page, Locator, expect } from '@playwright/test';

export class WebNavigationPage {
    private readonly page: Page;
    private readonly testCasesNavLink: Locator;
    private readonly testCasesHeading: Locator;
    private readonly subscriptionHeading: Locator;
    private readonly scrollUpButton: Locator;
    private readonly heroText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.testCasesNavLink = page.locator('.shop-menu').getByRole('link', { name: 'Test Cases' });
        this.testCasesHeading = page.getByRole('heading', { name: 'Test Cases', exact: true });
        this.subscriptionHeading = page.locator('footer h2').filter({ hasText: /Subscription/i });
        this.scrollUpButton = page.locator('#scrollUp');
        this.heroText = page.locator('.item.active').getByRole('heading', { name: /Full-Fledged practice website/i }).first();
    }

    async clickTestCasesNavLink() {
        await this.testCasesNavLink.click();
    }

    async verifyTestCasesPage() {
        await expect(this.page).toHaveURL(/test_cases/);
        await expect(this.testCasesHeading).toBeVisible();
    }

    async scrollToBottom() {
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    }

    async verifySubscriptionHeadingVisible() {
        await expect(this.subscriptionHeading).toBeVisible();
    }

    async clickScrollUpButton() {
        await this.scrollUpButton.click();
        await this.page.waitForTimeout(800);
    }

    async scrollToTop() {
        await this.page.evaluate(() => window.scrollTo(0, 0));
        await this.page.waitForTimeout(400);
    }

    async verifyHeroTextVisible() {
        await expect(this.heroText).toBeVisible();
    }
}
