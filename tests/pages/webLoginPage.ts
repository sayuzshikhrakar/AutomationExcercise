import { Page, Locator, expect } from '@playwright/test';

export class WebLoginPage {
    private readonly page: Page;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginBtn: Locator;
    private readonly errorMessage: Locator;
    private readonly signupName: Locator;
    private readonly signupEmail: Locator;
    private readonly signupBtn: Locator;
    private readonly accountCreatedMessage: Locator;
    private readonly continueBtn: Locator;
    private readonly LoggedInUserName: Locator;
    private readonly Name: Locator;
    private readonly Email: Locator;
    private readonly Password: Locator;
    private readonly Day: Locator;
    private readonly Month: Locator;
    private readonly Year: Locator;
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly company: Locator;
    private readonly address1: Locator;
    private readonly address2: Locator;
    private readonly country: Locator;
    private readonly state: Locator;
    private readonly city: Locator;
    private readonly zipcode: Locator;
    private readonly mobileNumber: Locator;
    private readonly createAccountBtn: Locator;
    private readonly deleteAccountBtn: Locator;
    private readonly emailAlreadyExistsMsg: Locator;


    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('[data-qa="login-email"]');
        this.passwordInput = page.locator('[data-qa="login-password"]');
        this.loginBtn = page.locator('[data-qa="login-button"]');
        this.errorMessage = page.getByText('Your email or password is incorrect!');
        this.signupName = page.locator('[data-qa="signup-name"]');
        this.signupEmail = page.locator('[data-qa="signup-email"]');
        this.signupBtn = page.locator('[data-qa="signup-button"]');
        this.accountCreatedMessage = page.getByText('Account Created!');
        this.continueBtn = page.locator('[data-qa="continue-button"]');
        this.LoggedInUserName = page.locator("a >> b");
        this.Name = page.locator('[data-qa="name"]');
        this.Email = page.locator('[data-qa="email"]');
        this.Password = page.locator('[data-qa="password"]');
        this.Day = page.locator('#days');
        this.Month = page.locator('#months');
        this.Year = page.locator('#years');
        this.firstName = page.locator('[data-qa="first_name"]');
        this.lastName = page.locator('[data-qa="last_name"]');
        this.company = page.locator('[data-qa="company"]');
        this.address1 = page.locator('[data-qa="address"]');
        this.address2 = page.locator('[data-qa="address2"]');
        this.country = page.locator('#country');
        this.state = page.locator('[data-qa="state"]');
        this.city = page.locator('[data-qa="city"]');
        this.zipcode = page.locator('[data-qa="zipcode"]');
        this.mobileNumber = page.locator('[data-qa="mobile_number"]');
        this.createAccountBtn = page.locator('[data-qa="create-account"]');
        this.deleteAccountBtn = page.getByRole("link", { name: "Delete Account" });
        this.emailAlreadyExistsMsg = page.getByText("Email Address already exist!");

    }

    async navigate(): Promise<void> {
        await this.page.route('**/*googleads*', (route) => route.abort());
        await this.page.route('**/*doubleclick*', (route) => route.abort());
        await this.page.goto('/login');
    }

    async login(email: string, password: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginBtn.click();
    }

    async expectedLoginError(): Promise<void> {
        await expect(this.errorMessage).toBeVisible();
    }

    async verifyLoginBtn() {
        await expect(this.loginBtn).toBeVisible();
    }

    async signUp(name: string, email: string) {
        await this.signupName.fill(name);
        await this.signupEmail.fill(email);
        await this.signupBtn.click();
    }

    async selectTitle(title: string) {
        await this.page.locator(`label:has-text("${title}")`).click();
    }

    async verifyName(name: string) {
        await expect(this.Name).toHaveValue(name);
    }

    async verifyEmail(email: string) {
        await expect(this.Email).toHaveValue(email);
    }

    async enterPassword(password: string) {
        await this.Password.fill(password);
    }

    async selectDOB(day: string, month: string, year: string) {
        await this.Day.selectOption(day);
        await this.Month.selectOption(month);
        await this.Year.selectOption(year);
    }

    async enterFirstName(firstName: string) {
        await this.firstName.fill(firstName);
    }

    async enterLastName(lastName: string) {
        await this.lastName.fill(lastName);
    }

    async enterCompany(company: string) {
        await this.company.fill(company);
    }

    async enterAddress1(address1: string) {
        await this.address1.fill(address1);
    }

    async enterAddress2(address2: string) {
        await this.address2.fill(address2);
    }

    async selectCountry(country: string) {
        await this.country.selectOption(country);
    }

    async enterState(state: string) {
        await this.state.fill(state);
    }

    async enterCity(city: string) {
        await this.city.fill(city);
    }

    async enterZipCode(zipcode: string) {
        await this.zipcode.fill(zipcode);
    }

    async enterMobileNumber(mobileNumber: string) {
        await this.mobileNumber.fill(mobileNumber);
    }

    async clickCreateAccountBtn() {
        await this.createAccountBtn.click();
    }

    async clickContinueBtn() {
        await this.continueBtn.click();
    }

    async verifyLoggedInUser() {
        await expect(this.LoggedInUserName).toBeVisible();
    }


    async verifyAccountCreatedPage() {
        await expect(this.accountCreatedMessage).toBeVisible();
        await expect(this.page).toHaveURL('https://automationexercise.com/account_created');
    }

    async verifyLoggedInUserName(firstName: string) {
        await expect(this.LoggedInUserName).toHaveText(firstName);
    }

    async clickDeleteAccount() {
        await this.deleteAccountBtn.click();
    }

    async verifyDeleteAccount() {
        await expect(this.page).toHaveURL('https://automationexercise.com/delete_account');
    }

    async verifyEmailAlreadyExist() {
        await expect(this.emailAlreadyExistsMsg).toBeVisible();
    }
}



