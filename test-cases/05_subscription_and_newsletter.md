# 📧 Domain: Subscription & Newsletter

> Test cases covering email subscription via the footer widget on the home page and cart page.

---

## Test Case 10: Verify Subscription in Home Page

**URL:** https://automationexercise.com

### Preconditions
- None — no login required

### Step-by-Step Actions

| # | Action |
|---|--------|
| 1 | Navigate to `https://automationexercise.com` |
| 2 | Verify home page is visible |
| 3 | Scroll down to the **footer** |
| 4 | Verify the text `SUBSCRIPTION` is visible |
| 5 | Enter a valid email address in the subscription input |
| 6 | Click the arrow/submit button |
| 7 | Verify success message `You have been successfully subscribed!` is visible |

### Expected Results (Playwright Assertions)

```
✅ expect(page.getByRole('heading', { name: 'Subscription' })).toBeVisible()
✅ expect(page.getByText('You have been successfully subscribed!')).toBeVisible()
```

### Target Elements & Selector Strategy

| Element | Suggested Selector Strategy |
|---------|------------------------------|
| Footer section | `page.locator('footer')` |
| `SUBSCRIPTION` heading | `page.locator('footer h2').filter({ hasText: /Subscription/i })` |
| Email input (footer) | `page.locator('#susbscribe_email')` |
| Subscribe arrow button | `page.locator('#subscribe')` |
| Success alert | `page.locator('#success-subscribe')` or `page.getByText('You have been successfully subscribed!')` |

### Notes for Playwright Implementation

> **📜 Scrolling:** To scroll to the footer before interacting:
> ```js
> await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
> // OR use locator scroll:
> await page.locator('footer').scrollIntoViewIfNeeded();
> ```

---

## Test Case 11: Verify Subscription in Cart Page

**URL:** https://automationexercise.com/view_cart

### Preconditions
- None — no login required (cart page is accessible even when empty)

### Step-by-Step Actions

| # | Action |
|---|--------|
| 1 | Navigate to `https://automationexercise.com` |
| 2 | Verify home page is visible |
| 3 | Click the `Cart` button in the navbar |
| 4 | Scroll down to the **footer** |
| 5 | Verify the text `SUBSCRIPTION` is visible |
| 6 | Enter a valid email address in the subscription input |
| 7 | Click the arrow/submit button |
| 8 | Verify success message `You have been successfully subscribed!` is visible |

### Expected Results (Playwright Assertions)

```
✅ expect(page).toHaveURL(/view_cart/)
✅ expect(page.locator('footer h2').filter({ hasText: /Subscription/i })).toBeVisible()
✅ expect(page.getByText('You have been successfully subscribed!')).toBeVisible()
```

### Target Elements & Selector Strategy

| Element | Suggested Selector Strategy |
|---------|------------------------------|
| `Cart` nav link | `page.getByRole('link', { name: /Cart/i })` |
| Footer subscription heading | `page.locator('footer h2').filter({ hasText: /Subscription/i })` |
| Email input (footer) | `page.locator('#susbscribe_email')` |
| Subscribe arrow button | `page.locator('#subscribe')` |
| Success alert | `page.locator('#success-subscribe')` or `page.getByText('You have been successfully subscribed!')` |
