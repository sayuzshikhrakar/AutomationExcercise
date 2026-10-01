import { Page, Locator, expect } from '@playwright/test';

export class WebCartPage {
    private readonly page: Page;
    private readonly firstProductOverlayAddToCart: Locator;
    private readonly secondProductOverlayAddToCart: Locator;
    private readonly continueShoppingButton: Locator;
    private readonly viewCartModalLink: Locator;
    private readonly cartRows: Locator;
    private readonly productQuantityInput: Locator;
    private readonly productAddToCartButton: Locator;
    private readonly firstCartItemDeleteButton: Locator;
    private readonly emptyCartMessage: Locator;
    private readonly recommendedItemsHeading: Locator;
    private readonly recommendedItemsAddToCart: Locator;
    private readonly signupLoginLink: Locator;
    private readonly loginEmailInput: Locator;
    private readonly loginPasswordInput: Locator;
    private readonly loginButton: Locator;
    private readonly firstProductInfo: Locator;
    private readonly secondProductInfo: Locator;
    private readonly firstCartPrice: Locator;
    private readonly firstCartQuantity: Locator;
    private readonly firstCartTotal: Locator;
    private readonly cartQuantityButton: Locator;
    private readonly firstSearchedProductBtn: Locator;
    private readonly cartNavLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstProductOverlayAddToCart = page.locator('.product-overlay .add-to-cart').first();
        this.secondProductOverlayAddToCart = page.locator('.product-overlay .add-to-cart').nth(1);
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
        this.viewCartModalLink = page.locator('#cartModal').getByRole('link', { name: 'View Cart' });
        this.cartRows = page.locator('#cart_items tbody tr');
        this.productQuantityInput = page.locator('#quantity');
        this.productAddToCartButton = page.getByRole('button', { name: 'Add to cart' });
        this.firstCartItemDeleteButton = page.locator('.cart_quantity_delete').first();
        this.emptyCartMessage = page.getByText('Cart is empty!');
        this.recommendedItemsHeading = page.getByRole('heading', { name: /Recommended Items/i });
        this.recommendedItemsAddToCart = page.locator('#recommended-item-carousel .add-to-cart').first();
        this.signupLoginLink = page.getByRole('link', { name: 'Signup / Login' });
        this.loginEmailInput = page.locator('[data-qa="login-email"]');
        this.loginPasswordInput = page.locator('[data-qa="login-password"]');
        this.loginButton = page.locator('[data-qa="login-button"]');
        this.firstProductInfo = page.locator('.productinfo').first();
        this.secondProductInfo = page.locator('.productinfo').nth(1);
        this.firstCartPrice = page.locator('.cart_price').first();
        this.firstCartQuantity = page.locator('.cart_quantity').first();
        this.firstCartTotal = page.locator('.cart_total').first();
        this.cartQuantityButton = page.locator('.cart_quantity button');
        this.firstSearchedProductBtn = page.locator('.productinfo .btn').first();
        this.cartNavLink = page.getByRole('link', { name: 'Cart' }).first();
    }

    async addFirstProductToCart() {
        await this.firstProductInfo.hover();
        await this.firstProductOverlayAddToCart.click();
    }

    async addSecondProductToCart() {
        await this.secondProductInfo.hover();
        await this.secondProductOverlayAddToCart.click();
    }

    async clickContinueShopping() {
        await this.continueShoppingButton.click();
    }

    async clickViewCartModal() {
        await this.viewCartModalLink.click();
    }

    async verifyTwoProductsInCart() {
        await expect(this.cartRows).toHaveCount(2);
    }

    async verifyProductInCart() {
        await expect(this.cartRows).toHaveCount(1);
    }

    async verifyCartPricesAndQuantities() {
        await expect(this.firstCartPrice).toBeVisible();
        await expect(this.firstCartQuantity).toBeVisible();
        await expect(this.firstCartTotal).toBeVisible();
    }

    async increaseQuantity(quantity: string) {
        await this.productQuantityInput.fill(quantity);
    }

    async clickAddToCartButton() {
        await this.productAddToCartButton.click();
    }

    async verifyQuantityInCart(quantity: string) {
        await expect(this.cartQuantityButton).toHaveText(quantity);
    }

    async removeFirstProduct() {
        await this.firstCartItemDeleteButton.click();
    }

    async verifyCartIsEmpty() {
        await expect(this.cartRows).toHaveCount(0);
    }

    async scrollToBottom() {
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    }

    async verifyRecommendedItems() {
        await expect(this.recommendedItemsHeading).toBeVisible();
    }

    async addRecommendedProductToCart() {
        await this.recommendedItemsAddToCart.click();
    }

    async addSearchedProductsToCart() {
        await this.firstSearchedProductBtn.click();
    }

    async navigateToLogin(email: string, password: string) {
        await this.signupLoginLink.click();
        await this.loginEmailInput.fill(email);
        await this.loginPasswordInput.fill(password);
        await this.loginButton.click();
    }

    async navigateToCart() {
        await this.cartNavLink.click();
    }

    async verifyCartHasItems() {
        await expect(this.cartRows).not.toHaveCount(0);
    }
}
