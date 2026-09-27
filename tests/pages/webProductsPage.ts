import { Page, Locator, expect } from '@playwright/test';
import { assertArraysEqual, extractAllProductsInPage } from 'support/utils';

export class WebProductsPage {
    private readonly page: Page;
    private readonly allProductes: Locator;
    private readonly firstProduct: Locator;
    private readonly searchInput: Locator;
    private readonly searchButton: Locator;
    private readonly searchedProductsHeading: Locator;
    private readonly searchResults: Locator;
    private readonly productWrapper: Locator;
    private readonly categoryWrapper: Locator;
    private readonly titleInProductPage: Locator;
    private readonly brandWrapper: Locator;
    private readonly writeReviewHeading: Locator;
    private readonly reviewNameInput: Locator;
    private readonly reviewEmailInput: Locator;
    private readonly reviewTextInput: Locator;
    private readonly reviewSubmitButton: Locator;
    private readonly reviewSuccessMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.allProductes = page.getByText('ALL PRODUCTS');
        this.firstProduct = page.locator('.product-image-wrapper .choose .fa');
        this.searchInput = page.locator('#search_product');
        this.searchButton = page.locator('#submit_search');
        this.searchedProductsHeading = page.getByText('SEARCHED PRODUCTS');
        this.searchResults = page.locator('.features_items .product-image-wrapper');
        this.productWrapper = page.locator('.product-image-wrapper');
        this.categoryWrapper = page.locator('.left-sidebar #accordian');
        this.titleInProductPage = this.page.locator('.features_items h2.title');
        this.brandWrapper = page.locator('.left-sidebar .brands-name');
        this.writeReviewHeading = page.getByRole('link', { name: 'Write Your Review' });
        this.reviewNameInput = page.locator('#name');
        this.reviewEmailInput = page.locator('#email');
        this.reviewTextInput = page.locator('#review');
        this.reviewSubmitButton = page.locator('#button-review');
        this.reviewSuccessMessage = page.locator('.alert-success').getByText('Thank you for your review.');
    }

    async verifyAllProductsPage() {
        await expect(this.page).toHaveURL("https://automationexercise.com/products");
    }

    async verifyProductList() {
        await expect(this.allProductes).toBeVisible();
        const scrapedProductInfo = await extractAllProductsInPage(this.page);
        const testProducts = require('../fixtures/testProducts.json');
        await assertArraysEqual(scrapedProductInfo, testProducts);
    }

    async viewFirstProduct() {
        await this.firstProduct.first().click();
    }

    async searchProduct(productName: string) {
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }

    async verifySearchedProductsHeading() {
        await expect(this.searchedProductsHeading).toBeVisible();
    }

    async verifySearchedProductsList() {
        const count = await this.searchResults.count();
        expect(count).toBeGreaterThan(0);
    }

    async verifyAllFirstProductDetailPage() {
        await expect(this.page).toHaveURL("https://automationexercise.com/product_details/1");
    }

    async VerifyProductSearchResult(productName: string, productPrice: string) {
        await expect(this.searchedProductsHeading).toBeVisible();
        const pNameLocator = this.productWrapper.locator('.productinfo p');
        const pPriceLocator = this.productWrapper.locator('.productinfo h2');

        await expect(pNameLocator).toHaveText(productName);
        await expect(pPriceLocator).toHaveText(productPrice);
    }

    async verifyCategoryWrapper() {
        await expect(this.categoryWrapper).toBeVisible();
    }

    async clickCategoryAndSubCategory(category: string, subCategory: string) {
        // Format category to Match href (e.g., "MEN" -> "Men")
        const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

        // Expand the main category using exact href to avoid 'Men' matching 'Women'
        await this.categoryWrapper.locator(`a[href="#${formattedCategory}"]`).click();

        // Click the specific sub-category link
        await this.categoryWrapper.getByRole('link', { name: subCategory, exact: false }).click();
    }

    async verifyCategoryPage(category: string, subCategory: string) {
        // Verify the title on the resulting page, ignoring case since it appears as "Women - Dress Products"
        await expect(this.titleInProductPage).toBeVisible();
        await expect(this.titleInProductPage).toContainText(category, { ignoreCase: true });
        await expect(this.titleInProductPage).toContainText(subCategory, { ignoreCase: true });
    }

    async verifyBrandWrapper() {
        await expect(this.brandWrapper).toBeVisible();
    }

    async clickBrand(brand: string) {
        // Use getByRole instead of href to automatically handle case differences (e.g. "Polo" vs "polo")
        const brandLink = this.brandWrapper.getByRole('link', { name: brand, exact: false });
        await brandLink.scrollIntoViewIfNeeded();
        await brandLink.click();
    }

    async VerifyBrandPage(brand: string) {


        await expect(this.titleInProductPage).toBeVisible();
        // Ignore case for the assertion in case the page displays "Brand - Polo Products"
        await expect(this.titleInProductPage).toContainText(brand, { ignoreCase: true });
    }

    async verifyWriteReviewSection() {
        await expect(this.writeReviewHeading).toBeVisible();
    }

    async submitReview(name: string, email: string, reviewText: string) {
        await this.reviewNameInput.fill(name);
        await this.reviewEmailInput.fill(email);
        await this.reviewTextInput.fill(reviewText);
        await this.reviewSubmitButton.click();
    }

    async verifyReviewSuccessMessage() {
        await expect(this.reviewSuccessMessage).toBeVisible();
    }
}
