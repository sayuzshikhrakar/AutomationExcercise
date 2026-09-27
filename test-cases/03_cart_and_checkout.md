# 🛒 Domain: Cart & Checkout

> Test cases covering adding products to cart, quantity management, order placement, checkout flows, invoice download, and address verification.

---

## Test Case 12: Add Products in Cart

**URL:** https://automationexercise.com/products

### Preconditions
- None — no login required

### Step-by-Step Actions

| # | Action |
|---|--------|
| 1 | Navigate to `https://automationexercise.com` |
| 2 | Verify home page is visible |
| 3 | Click on `Products` button |
| 4 | Hover over the **first** product and click `Add to cart` |
| 5 | Click `Continue Shopping` button in the modal |
| 6 | Hover over the **second** product and click `Add to cart` |
| 7 | Click `View Cart` button in the modal |
| 8 | Verify both products are added to the cart |
| 9 | Verify their prices, quantity, and total prices are correct |

### Expected Results (Playwright Assertions)

```
✅ expect(page.locator('#cart_items tbody tr')).toHaveCount(2)
✅ expect(page.locator('.cart_price').first()).toBeVisible()
✅ expect(page.locator('.cart_quantity').first()).toBeVisible()
✅ expect(page.locator('.cart_total').first()).toBeVisible()
```

### Target Elements & Selector Strategy

| Element | Suggested Selector Strategy |
|---------|------------------------------|
| First product card | `page.locator('.productinfo').first()` |
| `Add to cart` (on hover) | `page.locator('.product-overlay .add-to-cart').first()` |
| Modal `Continue Shopping` | `page.getByRole('button', { name: 'Continue Shopping' })` |
| Modal `View Cart` | `page.getByRole('link', { name: 'View Cart' })` |
| Cart row items | `page.locator('#cart_items tbody tr')` |
| Cart price column | `page.locator('.cart_price')` |
| Cart quantity column | `page.locator('.cart_quantity')` |
| Cart total column | `page.locator('.cart_total')` |

---

## Test Case 13: Verify Product Quantity in Cart

**URL:** https://automationexercise.com

### Preconditions
- None — no login required

### Step-by-Step Actions

| # | Action |
|---|--------|
| 1 | Navigate to `https://automationexercise.com` |
| 2 | Verify home page is visible |
| 3 | Click `View Product` on any product on the home page |
| 4 | Verify the product detail page is opened |
| 5 | Increase the quantity to **4** |
| 6 | Click `Add to cart` button |
| 7 | Click `View Cart` button |
| 8 | Verify the product is displayed in the cart with a quantity of **4** |

### Expected Results (Playwright Assertions)

```
✅ expect(page.locator('.product-information')).toBeVisible()
✅ expect(page.locator('.cart_quantity button')).toHaveText('4')
```

### Target Elements & Selector Strategy

| Element | Suggested Selector Strategy |
|---------|------------------------------|
| `View Product` link (home) | `page.getByRole('link', { name: 'View Product' }).first()` |
| Quantity input | `page.locator('#quantity')` |
| `Add to cart` button | `page.getByRole('button', { name: 'Add to cart' })` |
| `View Cart` modal link | `page.getByRole('link', { name: 'View Cart' })` |
| Quantity in cart | `page.locator('.cart_quantity button')` |

---

## Test Case 14: Place Order — Register while Checkout

**URL:** https://automationexercise.com

### Preconditions
- No account logged in
- At least one product added to cart before proceeding to checkout

### Step-by-Step Actions

| # | Action |
|---|--------|
| 1 | Navigate to `https://automationexercise.com` |
| 2 | Verify home page is visible |
| 3 | Add products to the cart |
| 4 | Click the `Cart` button |
| 5 | Verify cart page is displayed |
| 6 | Click `Proceed To Checkout` |
| 7 | Click `Register / Login` button in the modal |
| 8 | Fill all signup details and create an account |
| 9 | Verify `ACCOUNT CREATED!` and click `Continue` |
| 10 | Verify `Logged in as username` at top |
| 11 | Click `Cart` button again |
| 12 | Click `Proceed To Checkout` |
| 13 | Verify **Address Details** and **Review Your Order** |
| 14 | Enter a description in the comment text area and click `Place Order` |
| 15 | Enter payment details: **Name on Card**, **Card Number**, **CVC**, **Expiration date** |
| 16 | Click `Pay and Confirm Order` button |
| 17 | Verify success message `Your order has been placed successfully!` |
| 18 | Click `Delete Account` and verify `ACCOUNT DELETED!` |

### Expected Results (Playwright Assertions)

```
✅ expect(page.getByText('ACCOUNT CREATED!')).toBeVisible()
✅ expect(page.getByText(/Logged in as/i)).toBeVisible()
✅ expect(page.getByText('Address Details')).toBeVisible()
✅ expect(page.getByText('Your order has been placed successfully!')).toBeVisible()
✅ expect(page.getByText('ACCOUNT DELETED!')).toBeVisible()
```

### Target Elements & Selector Strategy

| Element | Suggested Selector Strategy |
|---------|------------------------------|
| `Cart` nav link | `page.getByRole('link', { name: /Cart/i })` |
| `Proceed To Checkout` button | `page.getByRole('link', { name: /Proceed To Checkout/i })` |
| `Register / Login` modal link | `page.getByRole('link', { name: /Register \/ Login/i })` |
| Order comment textarea | `page.locator('textarea[name="message"]')` |
| `Place Order` button | `page.getByRole('link', { name: 'Place Order' })` |
| Name on Card | `page.locator('[data-qa="name-on-card"]')` |
| Card Number | `page.locator('[data-qa="card-number"]`)` |
| CVC | `page.locator('[data-qa="cvc"]')` |
| Expiry Month | `page.locator('[data-qa="expiry-month"]')` |
| Expiry Year | `page.locator('[data-qa="expiry-year"]')` |
| `Pay and Confirm Order` | `page.locator('[data-qa="pay-button"]')` |
| Order success message | `page.getByText('Your order has been placed successfully!')` |

---

## Test Case 15: Place Order — Register before Checkout

**URL:** https://automationexercise.com

### Preconditions
- No existing account — user will register first, then checkout

### Step-by-Step Actions

| # | Action |
|---|--------|
| 1 | Navigate to `https://automationexercise.com` |
| 2 | Verify home page is visible |
| 3 | Click `Signup / Login` button |
| 4 | Fill all signup details and create account |
| 5 | Verify `ACCOUNT CREATED!` and click `Continue` |
| 6 | Verify `Logged in as username` at top |
| 7 | Add products to cart |
| 8 | Click `Cart` button |
| 9 | Verify cart page is displayed |
| 10 | Click `Proceed To Checkout` |
| 11 | Verify **Address Details** and **Review Your Order** |
| 12 | Enter a description in the comment text area and click `Place Order` |
| 13 | Enter payment details: **Name on Card**, **Card Number**, **CVC**, **Expiration date** |
| 14 | Click `Pay and Confirm Order` |
| 15 | Verify success message `Your order has been placed successfully!` |
| 16 | Click `Delete Account` and verify `ACCOUNT DELETED!` |

### Expected Results (Playwright Assertions)

```
✅ expect(page.getByText('ACCOUNT CREATED!')).toBeVisible()
✅ expect(page.getByText(/Logged in as/i)).toBeVisible()
✅ expect(page.getByText('Your order has been placed successfully!')).toBeVisible()
✅ expect(page.getByText('ACCOUNT DELETED!')).toBeVisible()
```

### Target Elements & Selector Strategy

> Same selectors as **TC-14** above — the flow differs only in the **order of steps**.

---

## Test Case 16: Place Order — Login before Checkout

**URL:** https://automationexercise.com

### Preconditions
- A valid registered account already exists

### Step-by-Step Actions

| # | Action |
|---|--------|
| 1 | Navigate to `https://automationexercise.com` |
| 2 | Verify home page is visible |
| 3 | Click `Signup / Login` button |
| 4 | Enter email and password, click `Login` |
| 5 | Verify `Logged in as username` at top |
| 6 | Add products to cart |
| 7 | Click `Cart` button |
| 8 | Verify cart page is displayed |
| 9 | Click `Proceed To Checkout` |
| 10 | Verify **Address Details** and **Review Your Order** |
| 11 | Enter a description in the comment text area and click `Place Order` |
| 12 | Enter payment details: **Name on Card**, **Card Number**, **CVC**, **Expiration date** |
| 13 | Click `Pay and Confirm Order` |
| 14 | Verify success message `Your order has been placed successfully!` |
| 15 | Click `Delete Account` and verify `ACCOUNT DELETED!` |

### Expected Results (Playwright Assertions)

```
✅ expect(page.getByText(/Logged in as/i)).toBeVisible()
✅ expect(page.getByText('Your order has been placed successfully!')).toBeVisible()
✅ expect(page.getByText('ACCOUNT DELETED!')).toBeVisible()
```

### Target Elements & Selector Strategy

> Same selectors as **TC-14** above.

---

## Test Case 17: Remove Products From Cart

**URL:** https://automationexercise.com

### Preconditions
- At least one product must already be in the cart

### Step-by-Step Actions

| # | Action |
|---|--------|
| 1 | Navigate to `https://automationexercise.com` |
| 2 | Verify home page is visible |
| 3 | Add products to the cart |
| 4 | Click the `Cart` button |
| 5 | Verify cart page is displayed |
| 6 | Click the `X` (delete) button for a specific product |
| 7 | Verify that the product is removed from the cart |

### Expected Results (Playwright Assertions)

```
✅ expect(page).toHaveURL(/view_cart/)
✅ expect(page.locator('#cart_items tbody tr')).toHaveCount(0)
// OR check that the specific product row no longer exists
```

### Target Elements & Selector Strategy

| Element | Suggested Selector Strategy |
|---------|------------------------------|
| Cart page | `page.getByRole('link', { name: /Cart/i })` |
| Delete button for product | `page.locator('.cart_quantity_delete')` (first or by row) |
| Cart items table rows | `page.locator('#cart_items tbody tr')` |
| Empty cart message | `page.getByText(/Cart is empty/i)` (if shown) |

---

## Test Case 20: Search Products and Verify Cart After Login

**URL:** https://automationexercise.com/products

### Preconditions
- A valid registered user account exists

### Step-by-Step Actions

| # | Action |
|---|--------|
| 1 | Navigate to `https://automationexercise.com` |
| 2 | Click on `Products` button |
| 3 | Verify `ALL PRODUCTS` page is displayed |
| 4 | Enter a product name in the search input and click `Search` |
| 5 | Verify `SEARCHED PRODUCTS` heading is visible |
| 6 | Verify all search-related products are displayed |
| 7 | Add those products to the cart |
| 8 | Click `Cart` button and verify products are in the cart |
| 9 | Click `Signup / Login` and log in with valid credentials |
| 10 | Navigate to the `Cart` page again |
| 11 | Verify the same products are still visible in the cart after login |

### Expected Results (Playwright Assertions)

```
✅ expect(page.getByRole('heading', { name: 'Searched Products' })).toBeVisible()
✅ expect(page.locator('#cart_items tbody tr')).toHaveCount.greaterThan(0)
// After login:
✅ expect(page.locator('#cart_items tbody tr')).toHaveCount.greaterThan(0)
```

### Target Elements & Selector Strategy

| Element | Suggested Selector Strategy |
|---------|------------------------------|
| Search input | `page.locator('#search_product')` |
| Search button | `page.locator('#submit_search')` |
| `Add to Cart` (from search results) | `page.locator('.productinfo .btn').first()` |
| `Cart` nav link | `page.getByRole('link', { name: /Cart/i })` |
| Cart table rows | `page.locator('#cart_items tbody tr')` |

---

## Test Case 22: Add to Cart from Recommended Items

**URL:** https://automationexercise.com

### Preconditions
- None — no login required

### Step-by-Step Actions

| # | Action |
|---|--------|
| 1 | Navigate to `https://automationexercise.com` |
| 2 | Scroll to the **bottom** of the page |
| 3 | Verify `RECOMMENDED ITEMS` section is visible |
| 4 | Click `Add To Cart` on a recommended product |
| 5 | Click `View Cart` button in the modal |
| 6 | Verify the product is displayed in the cart page |

### Expected Results (Playwright Assertions)

```
✅ expect(page.getByRole('heading', { name: /Recommended Items/i })).toBeVisible()
✅ expect(page.locator('#cart_items tbody tr')).toHaveCount(1)
```

### Target Elements & Selector Strategy

| Element | Suggested Selector Strategy |
|---------|------------------------------|
| `RECOMMENDED ITEMS` heading | `page.getByRole('heading', { name: /Recommended Items/i })` |
| Recommended product cards | `page.locator('#recommended-item-carousel .item')` |
| `Add To Cart` in recommended | `page.locator('#recommended-item-carousel .add-to-cart').first()` |
| Modal `View Cart` | `page.getByRole('link', { name: 'View Cart' })` |

---

## Test Case 23: Verify Address Details in Checkout Page

**URL:** https://automationexercise.com

### Preconditions
- User creates a **new** account with specific address info (to be verified at checkout)

### Step-by-Step Actions

| # | Action |
|---|--------|
| 1 | Navigate to `https://automationexercise.com` |
| 2 | Verify home page is visible |
| 3 | Click `Signup / Login` and fill in all signup details (note the address entered) |
| 4 | Verify `ACCOUNT CREATED!` and click `Continue` |
| 5 | Verify `Logged in as username` at top |
| 6 | Add products to cart |
| 7 | Click `Cart` button and verify cart page |
| 8 | Click `Proceed To Checkout` |
| 9 | Verify the **delivery address** matches the address used during registration |
| 10 | Verify the **billing address** matches the address used during registration |
| 11 | Click `Delete Account` and verify `ACCOUNT DELETED!` |

### Expected Results (Playwright Assertions)

```
✅ expect(page.getByText('ACCOUNT CREATED!')).toBeVisible()
✅ expect(page.locator('#address_delivery')).toContainText('<registeredFirstName>')
✅ expect(page.locator('#address_invoice')).toContainText('<registeredFirstName>')
✅ expect(page.getByText('ACCOUNT DELETED!')).toBeVisible()
```

### Target Elements & Selector Strategy

| Element | Suggested Selector Strategy |
|---------|------------------------------|
| Delivery address block | `page.locator('#address_delivery')` |
| Billing (invoice) address block | `page.locator('#address_invoice')` |
| Address fields inside blocks | `page.locator('#address_delivery .address_address1')` etc. |

---

## Test Case 24: Download Invoice after Purchase Order

**URL:** https://automationexercise.com

### Preconditions
- No existing account; user registers during checkout

### Step-by-Step Actions

| # | Action |
|---|--------|
| 1 | Navigate to `https://automationexercise.com` |
| 2 | Verify home page is visible |
| 3 | Add products to cart |
| 4 | Click `Cart` and verify cart page |
| 5 | Click `Proceed To Checkout` |
| 6 | Click `Register / Login` in the modal |
| 7 | Fill all signup details and create account |
| 8 | Verify `ACCOUNT CREATED!` and click `Continue` |
| 9 | Verify `Logged in as username` at top |
| 10 | Click `Cart` and then `Proceed To Checkout` |
| 11 | Verify Address Details and Review Order |
| 12 | Enter comment and click `Place Order` |
| 13 | Enter payment details and click `Pay and Confirm Order` |
| 14 | Verify success message `Your order has been placed successfully!` |
| 15 | Click `Download Invoice` and verify the invoice is downloaded |
| 16 | Click `Continue` |
| 17 | Click `Delete Account` and verify `ACCOUNT DELETED!` |

### Expected Results (Playwright Assertions)

```
✅ expect(page.getByText('Your order has been placed successfully!')).toBeVisible()
✅ // For download: use page.waitForEvent('download') before clicking
✅ const download = await page.waitForEvent('download');
✅ expect(download.suggestedFilename()).toBeTruthy()
✅ expect(page.getByText('ACCOUNT DELETED!')).toBeVisible()
```

### Target Elements & Selector Strategy

| Element | Suggested Selector Strategy |
|---------|------------------------------|
| `Download Invoice` button | `page.getByRole('link', { name: /Download Invoice/i })` |
| Order success message | `page.getByText('Your order has been placed successfully!')` |

> **💡 Playwright tip:** To assert a file download, wrap the click inside `page.waitForEvent('download')`:
> ```js
> const [download] = await Promise.all([
>   page.waitForEvent('download'),
>   page.getByRole('link', { name: /Download Invoice/i }).click()
> ]);
> expect(download.suggestedFilename()).toContain('invoice');
> ```
