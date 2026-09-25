import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('displays the contact form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Contact', level: 1 })).toBeVisible();

    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="subject"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();

    await expect(page.getByRole('button', { name: 'Send message' })).toBeVisible();
  });

  test('blocks empty submission via required-field validation', async ({ page }) => {
    const nameInput = page.locator('input[name="name"]');
    await page.getByRole('button', { name: 'Send message' }).click();

    // Native HTML5 validation stops submission; the page stays on /contact
    // and the first required field reports invalid.
    await expect(page).toHaveURL(/.*contact/);
    const isValid = await nameInput.evaluate((el: HTMLInputElement) => el.validity.valid);
    expect(isValid).toBe(false);
  });
});
