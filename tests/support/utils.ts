import { Page, expect, Locator } from '@playwright/test';
import { generateRandomUser } from './faker';
import testSignupInfo from '../fixtures/testSignupInfo.json'
import testUserUpdateInfo from '../fixtures/testUserUpdate.json';

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

export async function createUserPayload() {
    const { randomFirstName, randomLastName, randomEmail } = generateRandomUser();

    const { title,
        password,
        day,
        month,
        year,
        company,
        address1,
        address2,
        country,
        state,
        city,
        zipcode,
        mobileNumber } = testSignupInfo;

    const testUserData = {
        name: randomFirstName,
        email: randomEmail,
        password: password,
        title: title,
        birth_date: day,
        birth_month: month,
        birth_year: year,
        firstname: randomFirstName,
        lastname: randomLastName,
        company: company,
        address1: address1,
        address2: address2,
        country: country,
        zipcode: zipcode,
        state: state,
        city: city,
        mobile_number: mobileNumber,


    };
    return testUserData;


}


export async function UpdateUserPayload(createdEmail?: string, createdPassword?: string) {
    const { randomFirstName, randomLastName, randomEmail } = generateRandomUser();

    const { title,
        password,
        day,
        month,
        year,
        company,
        address1,
        address2,
        country,
        state,
        city,
        zipcode,
        mobileNumber } = testUserUpdateInfo;

    const testUserData = {
        name: randomFirstName,
        email: createdEmail ?? randomEmail,
        password: createdPassword ?? password,
        title: title,
        birth_date: day,
        birth_month: month,
        birth_year: year,
        firstname: randomFirstName,
        lastname: randomLastName,
        company: company,
        address1: address1,
        address2: address2,
        country: country,
        zipcode: zipcode,
        state: state,
        city: city,
        mobile_number: mobileNumber,
    };
    return testUserData;


}

