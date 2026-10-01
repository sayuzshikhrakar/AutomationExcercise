# 📋 AutomationExercise.com — Test Case Catalogue

> Source: https://automationexercise.com/test_cases  
> QA Role: Test Lead  
> Total Test Cases: 26  
> Learner Goal: Write all Playwright automation scripts independently

---

## 📁 File Structure

```
test-cases/
├── README.md                          ← This file (master index)
├── 01_authentication.md               ← TC-1, 2, 3, 4, 5
├── 02_catalog_and_search.md           ← TC-8, 9, 18, 19, 21
├── 03_cart_and_checkout.md            ← TC-12, 13, 14, 15, 16, 17, 20, 22, 23, 24
├── 04_contact_and_forms.md            ← TC-6
├── 05_subscription_and_newsletter.md  ← TC-10, 11
└── 06_navigation_and_ui_behaviour.md  ← TC-7, 25, 26
```

---

## 🗂️ Test Case Index by Domain

### 🔐 Authentication
| ID | Title | File |
|----|-------|------|
| TC-1 | Register User | [01_authentication.md](./01_authentication.md) |
| TC-2 | Login User with correct email and password | [01_authentication.md](./01_authentication.md) |
| TC-3 | Login User with incorrect email and password | [01_authentication.md](./01_authentication.md) |
| TC-4 | Logout User | [01_authentication.md](./01_authentication.md) |
| TC-5 | Register User with existing email | [01_authentication.md](./01_authentication.md) |

---

### 🛍️ Catalog & Search
| ID | Title | File |
|----|-------|------|
| TC-8 | Verify All Products and product detail page | [02_catalog_and_search.md](./02_catalog_and_search.md) |
| TC-9 | Search Product | [02_catalog_and_search.md](./02_catalog_and_search.md) |
| TC-18 | View Category Products | [02_catalog_and_search.md](./02_catalog_and_search.md) |
| TC-19 | View & Cart Brand Products | [02_catalog_and_search.md](./02_catalog_and_search.md) |
| TC-21 | Add review on product | [02_catalog_and_search.md](./02_catalog_and_search.md) |

---

### 🛒 Cart & Checkout
| ID | Title | File |
|----|-------|------|
| TC-12 | Add Products in Cart | [03_cart_and_checkout.md](./03_cart_and_checkout.md) |
| TC-13 | Verify Product quantity in Cart | [03_cart_and_checkout.md](./03_cart_and_checkout.md) |
| TC-14 | Place Order: Register while Checkout | [03_cart_and_checkout.md](./03_cart_and_checkout.md) |
| TC-15 | Place Order: Register before Checkout | [03_cart_and_checkout.md](./03_cart_and_checkout.md) |
| TC-16 | Place Order: Login before Checkout | [03_cart_and_checkout.md](./03_cart_and_checkout.md) |
| TC-17 | Remove Products From Cart | [03_cart_and_checkout.md](./03_cart_and_checkout.md) |
| TC-20 | Search Products and Verify Cart After Login | [03_cart_and_checkout.md](./03_cart_and_checkout.md) |
| TC-22 | Add to cart from Recommended items | [03_cart_and_checkout.md](./03_cart_and_checkout.md) |
| TC-23 | Verify address details in checkout page | [03_cart_and_checkout.md](./03_cart_and_checkout.md) |
| TC-24 | Download Invoice after purchase order | [03_cart_and_checkout.md](./03_cart_and_checkout.md) |

---

### 📬 Contact & Forms
| ID | Title | File |
|----|-------|------|
| TC-6 | Contact Us Form | [04_contact_and_forms.md](./04_contact_and_forms.md) |

---

### 📧 Subscription & Newsletter
| ID | Title | File |
|----|-------|------|
| TC-10 | Verify Subscription in home page | [05_subscription_and_newsletter.md](./05_subscription_and_newsletter.md) |
| TC-11 | Verify Subscription in Cart page | [05_subscription_and_newsletter.md](./05_subscription_and_newsletter.md) |

---

### 🧭 Navigation & UI Behaviour
| ID | Title | File |
|----|-------|------|
| TC-7 | Verify Test Cases Page | [06_navigation_and_ui_behaviour.md](./06_navigation_and_ui_behaviour.md) |
| TC-25 | Verify Scroll Up using 'Arrow' button and Scroll Down functionality | [06_navigation_and_ui_behaviour.md](./06_navigation_and_ui_behaviour.md) |
| TC-26 | Verify Scroll Up without 'Arrow' button and Scroll Down functionality | [06_navigation_and_ui_behaviour.md](./06_navigation_and_ui_behaviour.md) |

---

## 🎯 Suggested Learning Order for Playwright Beginners

Follow this progression to build skills incrementally:

```
Stage 1 — Page Navigation & Assertions
  → TC-7  (Navigate to a page and assert URL/heading)
  → TC-25 (Scroll + assert visibility)
  → TC-26 (Scroll without button)

Stage 2 — Form Filling & Basic Interactions
  → TC-3  (Fill login form, assert error message)
  → TC-4  (Login + logout flow)
  → TC-10 (Fill subscription email in footer)

Stage 3 — Multi-Step Flows
  → TC-1  (Full registration flow with form filling)
  → TC-2  (Login → assert logged in → delete account)
  → TC-5  (Duplicate email validation)

Stage 4 — Catalog & Search
  → TC-9  (Search for products)
  → TC-8  (Navigate to product detail, assert fields)
  → TC-18 (Category sidebar navigation)
  → TC-19 (Brand sidebar navigation)

Stage 5 — Cart Operations
  → TC-12 (Add 2 products, hover interaction)
  → TC-13 (Change quantity, assert in cart)
  → TC-17 (Remove product from cart)
  → TC-22 (Recommended items → add to cart)
  → TC-11 (Subscription from cart page)

Stage 6 — Full Checkout Flows
  → TC-16 (Login → add → checkout → pay)
  → TC-15 (Register → add → checkout → pay)
  → TC-14 (Add → checkout → register mid-flow → pay)
  → TC-23 (Verify address at checkout matches registration)
  → TC-20 (Search → add → login → verify cart persists)

Stage 7 — Advanced Interactions
  → TC-6  (File upload + dialog handling)
  → TC-21 (Product review form)
  → TC-24 (Place order + download invoice file)
```

---

## 🔑 Common Playwright Concepts Used Across Test Cases

| Concept | Test Cases |
|---------|------------|
| `page.getByRole()` | All |
| `page.getByText()` | All |
| `page.getByPlaceholder()` | TC-1, 6, 9 |
| `page.locator()` with CSS | TC-8, 12, 13, 18, 19 |
| `page.hover()` | TC-12 |
| `page.waitForURL()` / `toHaveURL()` | TC-4, 7, 11 |
| `page.evaluate()` (scroll) | TC-25, 26 |
| `page.on('dialog')` | TC-6 |
| `page.waitForEvent('download')` | TC-24 |
| `locator.setInputFiles()` | TC-6 |
| `locator.fill()` | TC-1–6, 9–16 |
| `locator.check()` | TC-1 |
| `locator.selectOption()` | TC-1 (country dropdown) |
