import { Page, expect, Locator } from '@playwright/test';

export async function extractAllProductsInPage(page: Page) {
    await page.waitForSelector('.productinfo');
    const scrapedProductInfo = await page.locator('.productinfo').evaluateAll((elements) => {
        return elements.map(el => {
            const productName = el.querySelector('p')?.innerText.trim() || '';
            const productPrice = el.querySelector('h2')?.innerText.trim() || '';

            return {
                name: productName,
                price: productPrice
            }
        })

    })
    return scrapedProductInfo;

}

export function assertArraysEqual<T>(actual: T[], expected: T[]) {
    expect(actual as any).toEqual(expected);
}

export function assertObjectsEqual<T>(actual: T, expected: T) {
    expect(actual as any).toEqual(expected);
}

export async function getInneText(locator: Locator) {
    await locator.waitFor({
        state: "visible",
        timeout: 6000
    });
    return await locator.innerText();

}