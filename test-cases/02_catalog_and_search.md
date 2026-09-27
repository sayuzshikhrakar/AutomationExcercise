# 🛍️ Domain: Catalog & Search

> Test cases covering product listing, product detail pages, search functionality, categories, and brand browsing.

---

## Test Case 8: Verify All Products and Product Detail Page

**URL:** https://automationexercise.com/products

### Preconditions
- None — accessible to all users (no login required)

### Step-by-Step Actions

| # | Action |
|---|--------|
| 1 | Navigate to `https://automationexercise.com` |
| 2 | Verify the home page is visible |
| 3 | Click on `Products` button in the navbar |
| 4 | Verify user is navigated to the `ALL PRODUCTS` page |
| 5 | Verify the product list is visible |
| 6 | Click `View Product` on the **first** product in the list |
| 7 | Verify the product detail page loads |
| 8 | Verify all of the following details are visible: **product name**, **category**, **price**, **availability**, **condition**, **brand** |

### Expected Results (Playwright Assertions)

```
✅ expect(page).toHaveURL(/products/)
✅ expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible()
✅ expect(page.locator('.productinfo')).toHaveCount.greaterThan(0)
✅ expect(page.locator('.product-information h2')).toBeVisible()   // product name
✅ expect(page.getByText(/Category/i)).toBeVisible()
✅ expect(page.getByText(/Price/i)).toBeVisible()
✅ expect(page.getByText(/Availability/i)).toBeVisible()
✅ expect(page.getByText(/Condition/i)).toBeVisible()
✅ expect(page.getByText(/Brand/i)).toBeVisible()
```

### Target Elements & Selector Strategy

| Element | Suggested Selector Strategy |
|---------|------------------------------|
| `Products` nav link | `page.getByRole('link', { name: /Products/i })` |
| `All Products` heading | `page.getByRole('heading', { name: /All Products/i })` |
| Product cards | `page.locator('.productinfo')` |
| First `View Product` link | `page.locator('a[href="/product_details/1"]')` or `page.getByRole('link', { name: 'View Product' }).first()` |
| Product name (detail page) | `page.locator('.product-information h2')` |
| Category info | `page.locator('.product-information p').filter({ hasText: /Category/i })` |
| Price | `page.locator('.product-information span span')` |
| Availability | `page.locator('.product-information p').filter({ hasText: /Availability/i })` |
| Condition | `page.locator('.product-information p').filter({ hasText: /Condition/i })` |
| Brand | `page.locator('.product-information p').filter({ hasText: /Brand/i })` |

---

## Test Case 9: Search Product

**URL:** https://automationexercise.com/products

### Preconditions
- None — no login required

### Step-by-Step Actions

| # | Action |
|---|--------|
| 1 | Navigate to `https://automationexercise.com` |
| 2 | Verify home page is visible |
| 3 | Click on `Products` button |
| 4 | Verify `ALL PRODUCTS` page is displayed |
| 5 | Enter a product name in the search input field |
| 6 | Click the `Search` button |
| 7 | Verify `SEARCHED PRODUCTS` heading is visible |
| 8 | Verify all products displayed are related to the search query |

### Expected Results (Playwright Assertions)

```
✅ expect(page.getByRole('heading', { name: /All Products/i })).toBeVisible()
✅ expect(page.getByRole('heading', { name: 'Searched Products' })).toBeVisible()
✅ expect(page.locator('.productinfo')).toHaveCount.greaterThan(0)
```

### Target Elements & Selector Strategy

| Element | Suggested Selector Strategy |
|---------|------------------------------|
| Search input | `page.locator('#search_product')` |
| Search button | `page.locator('#submit_search')` |
| `SEARCHED PRODUCTS` heading | `page.getByRole('heading', { name: /Searched Products/i })` |
| Product results | `page.locator('.productinfo')` |

---

## Test Case 18: View Category Products

**URL:** https://automationexercise.com

### Preconditions
- None — no login required

### Step-by-Step Actions

| # | Action |
|---|--------|
| 1 | Navigate to `https://automationexercise.com` |
| 2 | Verify that **categories** are visible on the left sidebar |
| 3 | Click on `Women` category |
| 4 | Click on a sub-category link under `Women` (e.g., **Dress**) |
| 5 | Verify the category page is displayed and text like `WOMEN - TOPS PRODUCTS` is shown |
| 6 | On left sidebar, click a sub-category under `Men` category |
| 7 | Verify user is navigated to that category page |

### Expected Results (Playwright Assertions)

```
✅ expect(page.locator('.left-sidebar')).toBeVisible()
✅ expect(page.getByText(/Women/i)).toBeVisible()
✅ expect(page.getByRole('heading', { name: /Women.*Products/i })).toBeVisible()
✅ expect(page.getByRole('heading', { name: /Men.*Products/i })).toBeVisible()
```

### Target Elements & Selector Strategy

| Element | Suggested Selector Strategy |
|---------|------------------------------|
| Left sidebar | `page.locator('.left-sidebar')` |
| Category heading `Women` | `page.getByRole('link', { name: /Women/i })` (in sidebar) |
| Sub-category under Women | `page.locator('#Women a').filter({ hasText: /Dress/i })` |
| Category page heading | `page.locator('.title.text-center')` |
| `Men` category | `page.getByRole('link', { name: /Men/i })` (in sidebar) |

---

## Test Case 19: View & Cart Brand Products

**URL:** https://automationexercise.com/products

### Preconditions
- None — no login required

### Step-by-Step Actions

| # | Action |
|---|--------|
| 1 | Navigate to `https://automationexercise.com` |
| 2 | Click on `Products` button |
| 3 | Verify **Brands** section is visible on the left sidebar |
| 4 | Click on any brand name |
| 5 | Verify user is navigated to that brand page with its products displayed |
| 6 | On the left sidebar, click a **different** brand link |
| 7 | Verify user is navigated to the new brand page and its products are visible |

### Expected Results (Playwright Assertions)

```
✅ expect(page.locator('.brands_products')).toBeVisible()
✅ expect(page.getByRole('heading', { name: /Brand -/i })).toBeVisible()
✅ expect(page.locator('.productinfo')).toHaveCount.greaterThan(0)
```

### Target Elements & Selector Strategy

| Element | Suggested Selector Strategy |
|---------|------------------------------|
| Brands sidebar section | `page.locator('.brands_products')` |
| Brand links | `page.locator('.brands_products .brands-name a')` |
| Brand page heading | `page.locator('.title.text-center')` (should contain brand name) |
| Products on brand page | `page.locator('.productinfo')` |

---

## Test Case 21: Add Review on Product

**URL:** https://automationexercise.com/products

### Preconditions
- None — no login required to submit a review

### Step-by-Step Actions

| # | Action |
|---|--------|
| 1 | Navigate to `https://automationexercise.com` |
| 2 | Click on `Products` button |
| 3 | Verify `ALL PRODUCTS` page is displayed |
| 4 | Click `View Product` on any product |
| 5 | Verify `Write Your Review` section is visible |
| 6 | Enter **name**, **email**, and **review text** |
| 7 | Click the `Submit` button |
| 8 | Verify success message `Thank you for your review.` is visible |

### Expected Results (Playwright Assertions)

```
✅ expect(page.getByText('Write Your Review')).toBeVisible()
✅ expect(page.getByText('Thank you for your review.')).toBeVisible()
```

### Target Elements & Selector Strategy

| Element | Suggested Selector Strategy |
|---------|------------------------------|
| `Write Your Review` heading | `page.getByText('Write Your Review')` |
| Reviewer name input | `page.locator('#name')` |
| Reviewer email input | `page.locator('#email')` |
| Review textarea | `page.locator('#review')` |
| Submit review button | `page.locator('#button-review')` or `page.getByRole('button', { name: 'Submit' })` |
| Success alert | `page.locator('.alert-success')` or `page.getByText('Thank you for your review.')` |
