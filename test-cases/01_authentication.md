# 🔐 Domain: Authentication

> Test cases covering user registration, login, logout, and account management flows.

---

## Test Case 1: Register User

**URL:** https://automationexercise.com

### Preconditions
- Browser is open and internet is available
- No existing account with the test email

### Step-by-Step Actions

| # | Action |
|---|--------|
| 1 | Navigate to `https://automationexercise.com` |
| 2 | Verify that the home page is visible |
| 3 | Click on `Signup / Login` button in the navbar |
| 4 | Verify `New User Signup!` heading is visible |
| 5 | Enter a **name** and **email address** in the signup form |
| 6 | Click the `Signup` button |
| 7 | Verify that `ENTER ACCOUNT INFORMATION` section is visible |
| 8 | Fill in: **Title**, **Name**, **Email**, **Password**, **Date of Birth** |
| 9 | Check the `Sign up for our newsletter!` checkbox |
| 10 | Check the `Receive special offers from our partners!` checkbox |
| 11 | Fill in: **First name**, **Last name**, **Company**, **Address**, **Address2**, **Country**, **State**, **City**, **Zipcode**, **Mobile Number** |
| 12 | Click the `Create Account` button |
| 13 | Verify `ACCOUNT CREATED!` message is visible |
| 14 | Click the `Continue` button |
| 15 | Verify `Logged in as username` is visible in the navbar |
| 16 | Click the `Delete Account` button |
| 17 | Verify `ACCOUNT DELETED!` message is visible and click `Continue` |

### Expected Results (Playwright Assertions)

```
✅ expect(page).toHaveURL('https://automationexercise.com')
✅ expect(page.getByText('New User Signup!')).toBeVisible()
✅ expect(page.getByText('ENTER ACCOUNT INFORMATION')).toBeVisible()
✅ expect(page.getByText('ACCOUNT CREATED!')).toBeVisible()
✅ expect(page.getByText(/Logged in as/i)).toBeVisible()
✅ expect(page.getByText('ACCOUNT DELETED!')).toBeVisible()
```

### Target Elements & Selector Strategy

| Element | Suggested Selector Strategy |
|---------|------------------------------|
| `Signup / Login` nav link | `page.getByRole('link', { name: /Signup \/ Login/i })` |
| `New User Signup!` heading | `page.getByRole('heading', { name: 'New User Signup!' })` |
| Name input (signup) | `page.getByPlaceholder('Name')` (inside signup section) |
| Email input (signup) | `page.locator('[data-qa="signup-email"]')` |
| `Signup` button | `page.getByRole('button', { name: 'Signup' })` |
| Title radio (Mr/Mrs) | `page.getByLabel('Mr.')` or `page.getByLabel('Mrs.')` |
| Password input | `page.locator('#password')` |
| Newsletter checkbox | `page.getByLabel(/Sign up for our newsletter/i)` |
| `Create Account` button | `page.getByRole('button', { name: 'Create Account' })` |
| `Continue` button | `page.getByRole('link', { name: 'Continue' })` |
| `Logged in as` indicator | `page.getByText(/Logged in as/i)` |
| `Delete Account` link | `page.getByRole('link', { name: /Delete Account/i })` |

---

## Test Case 2: Login User with Correct Email and Password

**URL:** https://automationexercise.com

### Preconditions
- A registered user account must already exist with a known email and password

### Step-by-Step Actions

| # | Action |
|---|--------|
| 1 | Navigate to `https://automationexercise.com` |
| 2 | Verify that the home page is visible |
| 3 | Click on `Signup / Login` button |
| 4 | Verify `Login to your account` heading is visible |
| 5 | Enter correct **email address** and **password** |
| 6 | Click the `Login` button |
| 7 | Verify `Logged in as username` is visible |
| 8 | Click the `Delete Account` button |
| 9 | Verify `ACCOUNT DELETED!` message is visible |

### Expected Results (Playwright Assertions)

```
✅ expect(page.getByText('Login to your account')).toBeVisible()
✅ expect(page.getByText(/Logged in as/i)).toBeVisible()
✅ expect(page.getByText('ACCOUNT DELETED!')).toBeVisible()
```

### Target Elements & Selector Strategy

| Element | Suggested Selector Strategy |
|---------|------------------------------|
| `Login to your account` heading | `page.getByRole('heading', { name: 'Login to your account' })` |
| Email input (login) | `page.locator('[data-qa="login-email"]')` |
| Password input (login) | `page.locator('[data-qa="login-password"]')` |
| `Login` button | `page.getByRole('button', { name: 'Login' })` |
| `Logged in as` indicator | `page.getByText(/Logged in as/i)` |
| `Delete Account` link | `page.getByRole('link', { name: /Delete Account/i })` |

---

## Test Case 3: Login User with Incorrect Email and Password

**URL:** https://automationexercise.com

### Preconditions
- No account exists for the incorrect credentials being used

### Step-by-Step Actions

| # | Action |
|---|--------|
| 1 | Navigate to `https://automationexercise.com` |
| 2 | Verify that the home page is visible |
| 3 | Click on `Signup / Login` button |
| 4 | Verify `Login to your account` heading is visible |
| 5 | Enter **incorrect** email address and **incorrect** password |
| 6 | Click the `Login` button |
| 7 | Verify error message `Your email or password is incorrect!` is visible |

### Expected Results (Playwright Assertions)

```
✅ expect(page.getByText('Login to your account')).toBeVisible()
✅ expect(page.getByText('Your email or password is incorrect!')).toBeVisible()
```

### Target Elements & Selector Strategy

| Element | Suggested Selector Strategy |
|---------|------------------------------|
| Login email input | `page.locator('[data-qa="login-email"]')` |
| Login password input | `page.locator('[data-qa="login-password"]')` |
| `Login` button | `page.getByRole('button', { name: 'Login' })` |
| Error message | `page.getByText('Your email or password is incorrect!')` |

---

## Test Case 4: Logout User

**URL:** https://automationexercise.com

### Preconditions
- A valid registered account exists

### Step-by-Step Actions

| # | Action |
|---|--------|
| 1 | Navigate to `https://automationexercise.com` |
| 2 | Verify that the home page is visible |
| 3 | Click on `Signup / Login` button |
| 4 | Verify `Login to your account` heading is visible |
| 5 | Enter correct **email** and **password** |
| 6 | Click the `Login` button |
| 7 | Verify `Logged in as username` is visible |
| 8 | Click the `Logout` button |
| 9 | Verify that the user is redirected to the login page |

### Expected Results (Playwright Assertions)

```
✅ expect(page.getByText(/Logged in as/i)).toBeVisible()
✅ expect(page).toHaveURL(/login/)
✅ expect(page.getByText('Login to your account')).toBeVisible()
```

### Target Elements & Selector Strategy

| Element | Suggested Selector Strategy |
|---------|------------------------------|
| `Logout` link | `page.getByRole('link', { name: /Logout/i })` |
| Login page URL | `page.url()` should contain `/login` |

---

## Test Case 5: Register User with Existing Email

**URL:** https://automationexercise.com

### Preconditions
- A user account must already exist with the email to be reused

### Step-by-Step Actions

| # | Action |
|---|--------|
| 1 | Navigate to `https://automationexercise.com` |
| 2 | Verify that the home page is visible |
| 3 | Click on `Signup / Login` button |
| 4 | Verify `New User Signup!` heading is visible |
| 5 | Enter a **name** and an **already registered email address** |
| 6 | Click the `Signup` button |
| 7 | Verify error `Email Address already exist!` is visible |

### Expected Results (Playwright Assertions)

```
✅ expect(page.getByText('New User Signup!')).toBeVisible()
✅ expect(page.getByText('Email Address already exist!')).toBeVisible()
```

### Target Elements & Selector Strategy

| Element | Suggested Selector Strategy |
|---------|------------------------------|
| Name input | `page.getByPlaceholder('Name')` |
| Email input (signup) | `page.locator('[data-qa="signup-email"]')` |
| `Signup` button | `page.getByRole('button', { name: 'Signup' })` |
| Duplicate email error | `page.getByText('Email Address already exist!')` |
