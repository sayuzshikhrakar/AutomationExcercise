# 🧭 Domain: Navigation & UI Behaviour

> Test cases covering page navigation, scroll behaviour (with and without arrow button), and Test Cases page access.

---

## Test Case 7: Verify Test Cases Page

**URL:** https://automationexercise.com/test_cases

### Preconditions
- None — publicly accessible page

### Step-by-Step Actions

| # | Action |
|---|--------|
| 1 | Navigate to `https://automationexercise.com` |
| 2 | Verify home page is visible |
| 3 | Click on `Test Cases` button in the navbar |
| 4 | Verify the user is navigated to the Test Cases page successfully |

### Expected Results (Playwright Assertions)

```
✅ expect(page).toHaveURL(/test_cases/)
✅ expect(page.getByRole('heading', { name: 'Test Cases' })).toBeVisible()
```

### Target Elements & Selector Strategy

| Element | Suggested Selector Strategy |
|---------|------------------------------|
| `Test Cases` nav link | `page.getByRole('link', { name: /Test Cases/i })` |
| Test Cases page heading | `page.getByRole('heading', { name: 'Test Cases' })` |
| Page URL | `expect(page).toHaveURL('/test_cases')` |

---

## Test Case 25: Verify Scroll Up using 'Arrow' Button and Scroll Down Functionality

**URL:** https://automationexercise.com

### Preconditions
- None — no login required

### Step-by-Step Actions

| # | Action |
|---|--------|
| 1 | Navigate to `https://automationexercise.com` |
| 2 | Verify home page is visible |
| 3 | Scroll down to the **bottom** of the page |
| 4 | Verify `SUBSCRIPTION` text is visible (confirming scroll reached footer) |
| 5 | Click on the **arrow button** at the bottom-right to scroll back to the top |
| 6 | Verify the page has scrolled up and the text `Full-Fledged practice website for Automation Engineers` is visible |

### Expected Results (Playwright Assertions)

```
✅ expect(page.locator('footer h2').filter({ hasText: /Subscription/i })).toBeVisible()
✅ expect(page.getByText('Full-Fledged practice website for Automation Engineers')).toBeVisible()
```

### Target Elements & Selector Strategy

| Element | Suggested Selector Strategy |
|---------|------------------------------|
| Scroll-to-top arrow button | `page.locator('#scrollUp')` |
| Footer subscription text | `page.locator('footer h2').filter({ hasText: /Subscription/i })` |
| Hero text (top of page) | `page.getByText('Full-Fledged practice website for Automation Engineers')` |

### Notes for Playwright Implementation

> **📜 Scrolling to bottom:**
> ```js
> await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
> ```

> **⬆️ Scroll-to-top button:** The `#scrollUp` button becomes visible only after scrolling down.
> ```js
> await page.locator('#scrollUp').click();
> await page.waitForTimeout(500); // allow scroll animation
> ```

---

## Test Case 26: Verify Scroll Up without 'Arrow' Button and Scroll Down Functionality

**URL:** https://automationexercise.com

### Preconditions
- None — no login required

### Step-by-Step Actions

| # | Action |
|---|--------|
| 1 | Navigate to `https://automationexercise.com` |
| 2 | Verify home page is visible |
| 3 | Scroll down to the **bottom** of the page |
| 4 | Verify `SUBSCRIPTION` text is visible |
| 5 | Scroll back **up** to the top of the page (without using the arrow button) |
| 6 | Verify the page has scrolled up and the text `Full-Fledged practice website for Automation Engineers` is visible |

### Expected Results (Playwright Assertions)

```
✅ expect(page.locator('footer h2').filter({ hasText: /Subscription/i })).toBeVisible()
✅ expect(page.getByText('Full-Fledged practice website for Automation Engineers')).toBeVisible()
```

### Target Elements & Selector Strategy

| Element | Suggested Selector Strategy |
|---------|------------------------------|
| Footer subscription heading | `page.locator('footer h2').filter({ hasText: /Subscription/i })` |
| Hero text (top of page) | `page.getByText('Full-Fledged practice website for Automation Engineers')` |

### Notes for Playwright Implementation

> **📜 Scroll programmatically (no button):**
> ```js
> // Scroll down
> await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
>
> // Scroll back up without arrow button
> await page.evaluate(() => window.scrollTo(0, 0));
> await page.waitForTimeout(300); // allow render
> ```
