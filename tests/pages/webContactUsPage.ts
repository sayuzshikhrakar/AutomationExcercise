import { Page, Locator, expect } from '@playwright/test';

export class WebContactUsPage {
    private readonly page: Page;
    private readonly contactUsLink: Locator;
    private readonly getInTouchHeading: Locator;
    private readonly nameInput: Locator;
    private readonly emailInput: Locator;
    private readonly subjectInput: Locator;
    private readonly messageTextarea: Locator;
    private readonly fileUploadInput: Locator;
    private readonly submitButton: Locator;
    private readonly successMessage: Locator;
    private readonly homeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.contactUsLink = page.getByRole('link', { name: /Contact us/i });
        this.getInTouchHeading = page.getByRole('heading', { name: 'GET IN TOUCH' });
        this.nameInput = page.getByPlaceholder('Name');
        this.emailInput = page.getByPlaceholder('Email', { exact: true });
        this.subjectInput = page.getByPlaceholder('Subject');
        this.messageTextarea = page.getByPlaceholder('Your Message Here');
        this.fileUploadInput = page.locator('input[type="file"]');
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.successMessage = page.locator('#contact-page').getByText('Success! Your details have been submitted successfully.');
        this.homeButton = page.locator('#form-section').getByRole('link', { name: 'Home' });
    }

    async clickContactUsLink() {
        await this.contactUsLink.click();
    }

    async verifyGetInTouchHeading() {
        await expect(this.getInTouchHeading).toBeVisible();
    }

    async submitContactForm(name: string, email: string, subject: string, message: string, filePath: string) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.subjectInput.fill(subject);
        await this.messageTextarea.fill(message);
        await this.fileUploadInput.setInputFiles(filePath);

        await this.page.waitForLoadState('networkidle');

        this.page.once('dialog', async (dialog) => {
            await dialog.accept();
        });

        await this.submitButton.click();
    }

    async verifySuccessMessage(expectedMessage: string) {
        await expect(this.successMessage).toBeVisible();
    }

    async clickHomeButton() {
        await this.homeButton.click();
    }

    async verifyHomePageUrl() {
        await expect(this.page).toHaveURL('https://automationexercise.com/');
    }
}
