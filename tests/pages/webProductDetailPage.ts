import { Page, Locator, expect } from '@playwright/test';
import { getInneText } from 'support/utils';
import { assertArraysEqual } from 'support/utils';

export class webProductDetailPage {
    private readonly page: Page;
    private readonly productName: Locator;
    private readonly productCategory: Locator;
    private readonly productPrice: Locator;
    private readonly productAvailability: Locator;
    private readonly productCondition: Locator;
    private readonly productBrand: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productName = page.locator('.product-information h2');
        this.productCategory = page.locator('.product-information p').nth(0);
        this.productPrice = page.locator('.product-information > span > span');
        this.productAvailability = page.locator('.product-information p').nth(1);
        this.productCondition = page.locator('.product-information p').nth(2);
        this.productBrand = page.locator('.product-information p').nth(3);
    }

    async getProductDetails() {
        const productName = await getInneText(this.productName);
        const productCategory = await getInneText(this.productCategory);
        const productPrice = await getInneText(this.productPrice);
        const productAvailability = await getInneText(this.productAvailability);
        const productCondition = await getInneText(this.productCondition);
        const productBrand = await getInneText(this.productBrand);

        return {
            name: productName,
            category: productCategory,
            price: productPrice,
            availability: productAvailability,
            condition: productCondition,
            brand: productBrand,
        }

    }

}