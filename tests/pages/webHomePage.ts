import { Page, Locator, expect } from '@playwright/test';

export class WebHomePage {
    private readonly page: Page;
    private readonly logoutLink: Locator;
    private readonly products: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
        this.products = page.getByRole('link', { name: 'Products' });
    }

    async navigate(): Promise<void> {
        await this.page.route('**/*googleads*', (route) => route.abort());
        await this.page.route('**/*doubleclick*', (route) => route.abort());
        await this.page.goto('/');
    }
    
    async verifyHomePage(expectedURL: string) {
        await expect(this.page).toHaveURL(expectedURL);
    }

    async clickLoutoutBtn() {
        await this.logoutLink.click();
    }

    async verifyLogoutLink() {
        await expect(this.logoutLink).toBeVisible();
    }

    async clickProducts() {
        await expect(this.products).toBeVisible();
        await this.products.click();
    }
}
