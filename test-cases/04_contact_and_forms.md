# 📬 Domain: Contact & Forms

> Test cases covering the Contact Us form submission.

---

## Test Case 6: Contact Us Form

**URL:** https://automationexercise.com/contact_us

### Preconditions
- None — the Contact Us page is publicly accessible
- A file must be available locally to upload as an attachment

### Step-by-Step Actions

| # | Action |
|---|--------|
| 1 | Navigate to `https://automationexercise.com` |
| 2 | Verify home page is visible |
| 3 | Click on `Contact Us` button in the navbar |
| 4 | Verify `GET IN TOUCH` heading is visible |
| 5 | Enter **name**, **email**, **subject**, and **message** in the form |
| 6 | Upload a file using the file input |
| 7 | Click the `Submit` button |
| 8 | Click `OK` on the browser dialog/alert that appears |
| 9 | Verify success message `Success! Your details have been submitted successfully.` is visible |
| 10 | Click the `Home` button and verify landing on the home page |

### Expected Results (Playwright Assertions)

```
✅ expect(page.getByRole('heading', { name: 'GET IN TOUCH' })).toBeVisible()
✅ expect(page.getByText('Success! Your details have been submitted successfully.')).toBeVisible()
✅ expect(page).toHaveURL('https://automationexercise.com/')
```

### Target Elements & Selector Strategy

| Element | Suggested Selector Strategy |
|---------|------------------------------|
| `Contact Us` nav link | `page.getByRole('link', { name: /Contact us/i })` |
| `GET IN TOUCH` heading | `page.getByRole('heading', { name: 'GET IN TOUCH' })` |
| Name input | `page.getByPlaceholder('Name')` |
| Email input | `page.getByPlaceholder('Email')` |
| Subject input | `page.getByPlaceholder('Subject')` |
| Message textarea | `page.getByPlaceholder('Your Message Here')` |
| File upload input | `page.locator('input[type="file"]')` |
| `Submit` button | `page.getByRole('button', { name: 'Submit' })` |
| Browser dialog (alert) | Use `page.on('dialog', dialog => dialog.accept())` before clicking Submit |
| Success message | `page.getByText('Success! Your details have been submitted successfully.')` |
| `Home` button after submit | `page.getByRole('link', { name: 'Home' })` |

### Notes for Playwright Implementation

> **⚠️ Dialog Handling:** The form triggers a native browser confirm/alert dialog. In Playwright, you must handle it **before** the action that triggers it:
> ```js
> page.on('dialog', async dialog => {
>   await dialog.accept();
> });
> await page.getByRole('button', { name: 'Submit' }).click();
> ```

> **📁 File Upload:** Use `setInputFiles()` to upload a file:
> ```js
> await page.locator('input[type="file"]').setInputFiles('/path/to/test-file.pdf');
> ```
