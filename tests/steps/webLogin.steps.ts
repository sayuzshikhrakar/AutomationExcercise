import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from 'support/world';
import { WebLoginPage } from 'pages/webLoginPage';
import { WebHomePage } from 'pages/webHomePage';
import { generateRandomUser } from 'support/faker';
import path from 'path';
import fs from 'fs-extra';
import testSignupInfo from 'fixtures/testSignupInfo.json';


Given('I am on the web login page', async function (this: CustomWorld) {
    const loginPage = new WebLoginPage(this.page);
    await loginPage.navigate();

});

When('I submit an invalid email and password', async function (this: CustomWorld) {
    const loginPage = new WebLoginPage(this.page);
    await loginPage.login('invalid_user@gmail.com', 'JPT@123');
});

Then('I should see an incorrect credentials error message', async function (this: CustomWorld) {
    const loginPage = new WebLoginPage(this.page);
    await loginPage.expectedLoginError();
});

When('I submit a valid email and password', async function (this: CustomWorld) {
    const loginPage = new WebLoginPage(this.page);
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;

    if (!email || !password) {
        throw new Error('Missing email or password in environment variables');
    }

    await loginPage.login(email, password);


});

Then('I should be directed to homepage', async function (this: CustomWorld) {
    const homePage = new WebHomePage(this.page);
    const expectedURL = process.env.WEB_URL;
    if (!expectedURL) {
        throw new Error('Missing WEB_URL in environment variables');
    }
    await homePage.verifyHomePage(expectedURL);
});

Then('I should see a logout button', async function (this: CustomWorld) {
    const homePage = new WebHomePage(this.page);
    await homePage.verifyLogoutLink();
});

Then('I click the logout button', async function (this: CustomWorld) {
    const homePage = new WebHomePage(this.page);
    await homePage.clickLoutoutBtn();
});

Then('I should be redirected to the login page', async function (this: CustomWorld) {
    const loginPage = new WebLoginPage(this.page);
    await loginPage.verifyLoginBtn();
})


Then('I submit a new name and email for signup', async function (this: CustomWorld) {
    const { randomFirstName, randomLastName, randomEmail } = generateRandomUser();
    const loginPage = new WebLoginPage(this.page);
    await loginPage.signUp(randomFirstName, randomEmail);
    const testUserData = {
        firstName: randomFirstName,
        lastName: randomLastName,
        email: randomEmail
    };

    const fixturePath = path.join(__dirname, '../fixtures/testUser.json');

    await fs.outputJson(fixturePath, testUserData, { spaces: 2 });

});

Then('I fill in the account information details', async function (this: CustomWorld) {
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
    const fixturePath = path.join(__dirname, '../fixtures/testUser.json');
    const { firstName, lastName, email } = fs.readJsonSync(fixturePath);
    const loginPage = new WebLoginPage(this.page);
    await loginPage.selectTitle(title);
    await loginPage.verifyName(firstName);
    await loginPage.verifyEmail(email);
    await loginPage.enterFirstName(firstName);
    await loginPage.enterLastName(lastName);
    await loginPage.enterPassword(password);
    await loginPage.selectDOB(day, month, year);
    await loginPage.enterCompany(company);
    await loginPage.enterAddress1(address1);
    await loginPage.enterAddress2(address2);
    await loginPage.selectCountry(country);
    await loginPage.enterState(state);
    await loginPage.enterCity(city);
    await loginPage.enterZipCode(zipcode);
    await loginPage.enterMobileNumber(mobileNumber);
});

Then('I click on Create account button', async function (this: CustomWorld) {
    const loginPage = new WebLoginPage(this.page);
    await loginPage.clickCreateAccountBtn();
});

Then('I should be taken to account created page', async function (this: CustomWorld) {
    const loginPage = new WebLoginPage(this.page);
    await loginPage.verifyAccountCreatedPage();
});

When('I click on Continue button', async function (this: CustomWorld) {
    const loginPage = new WebLoginPage(this.page);
    await loginPage.clickContinueBtn();
});

Then('I should see I am logged in as freshly created account', async function (this: CustomWorld) {
    const fixturePath = path.join(__dirname, '../fixtures/testUser.json');
    const { firstName } = fs.readJsonSync(fixturePath);
    const loginPage = new WebLoginPage(this.page);
    await loginPage.verifyLoggedInUserName(firstName);
});

When('I submit a name and an already registered email', async function (this: CustomWorld) {
    const loginPage = new WebLoginPage(this.page);
    const fixturePath = path.join(__dirname, '../fixtures/testUser.json');
    const { firstName, email } = fs.readJsonSync(fixturePath);
    await loginPage.signUp(firstName, email);
})

Then('I should see an email already exists error message', async function (this: CustomWorld) {
    const loginPage = new WebLoginPage(this.page);
    await loginPage.verifyEmailAlreadyExist();
})


When("I click the delete account button", async function (this: CustomWorld) {
    const loginPage = new WebLoginPage(this.page);
    await loginPage.clickDeleteAccount();
});

Then('I should see the account deleted message', async function (this: CustomWorld) {
    const loginPage = new WebLoginPage(this.page);
    const homePage = new WebHomePage(this.page);

    await loginPage.verifyDeleteAccount();
    await loginPage.clickContinueBtn();
    const expectedURL = process.env.WEB_URL;
    if (!expectedURL) {
        throw new Error('Missing WEB_URL in environment variables');
    }
    await homePage.verifyHomePage(expectedURL);
})

When('I log in with the newly registered email', async function (this: CustomWorld) {
    const loginPage = new WebLoginPage(this.page);
    const fixturePath = path.join(__dirname, '../fixtures/testUser.json');
    const { email } = fs.readJsonSync(fixturePath);
    // testSignupInfo contains the default password
    await loginPage.login(email, testSignupInfo.password);
});