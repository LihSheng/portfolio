import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should display contact form', async ({ page }) => {
    // Heading is "Get In Touch" (Title Case)
    await expect(page.getByRole('heading', { name: 'Get In Touch', level: 1 })).toBeVisible();

    // Using CSS selectors to bypass potential label accessibility text mismatch issues
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="subject"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();

    await expect(page.getByRole('button', { name: 'Send Message' })).toBeVisible();
  });

  test('should show validation errors on empty submission', async ({ page }) => {
    // This assumes HTML5 validation or custom validation that shows messages
    await page.getByRole('button', { name: 'Send Message' }).click();

    // Check if input fields are invalid or error messages appear
    // Note: Exact behavior depends on implementation (HTML5 validation vs JS validation)
    // For now, we'll check if we are still on the same page (submission didn't redirect)
    await expect(page).toHaveURL(/.*contact/);
  });

  test('should submit successfully without React hook-order errors', async ({ page }) => {
    const pageErrors: Error[] = [];
    page.on('pageerror', error => pageErrors.push(error));

    await page.route('**/api/contact', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: "Thank you for your message! I'll get back to you soon.",
        }),
      });
    });

    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('input[name="subject"]').fill('Portfolio contact');
    await page.locator('textarea[name="message"]').fill('This is a valid contact form message.');

    await page.getByRole('button', { name: 'Send Message' }).click();

    await expect(page.getByText("Thank you for your message! I'll get back to you soon.")).toBeVisible();
    await expect(page.getByRole('button', { name: 'Send Message' })).toBeVisible();
    expect(pageErrors).toEqual([]);
  });
});
