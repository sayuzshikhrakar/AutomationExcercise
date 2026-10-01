import { test, expect } from '@playwright/test';
import * as path from 'path';

test('Debug contact us', async ({ page }) => {
    await page.goto('https://automationexercise.com/contact_us');
    await page.getByPlaceholder('Name').fill('Sayuz');
    await page.getByPlaceholder('Email', { exact: true }).fill('test@test.com');
    await page.getByPlaceholder('Subject').fill('Test Subject');
    await page.getByPlaceholder('Your Message Here').fill('Test Message');
    
    // Attach file
    const filePath = path.join(__dirname, '../fixtures/testUpload.txt');
    await page.locator('input[type="file"]').setInputFiles(filePath);

    page.once('dialog', async dialog => {
        console.log('Dialog appeared:', dialog.message());
        await dialog.accept();
    });

    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'before_submit.png' });

    const [response] = await Promise.all([
        page.waitForNavigation(),
        page.getByRole('button', { name: 'Submit' }).click()
    ]);
    
    console.log('Navigated to:', page.url());
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'after_submit.png' });

    const successMsg = await page.locator('.status.alert-success').innerText();
    console.log('Success message text:', successMsg);
});
