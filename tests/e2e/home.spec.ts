import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have correct title', async ({ page }) => {
    // Page title is "Home | Ng Lih Sheng"
    await expect(page).toHaveTitle(/Home/);
  });

  test('should display main heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Ng Lih Sheng', level: 1 })).toBeVisible();
  });

  test('should display introductory text', async ({ page }) => {
    // Text is in an h2, matching by role/name is usually best even if text is split by spans
    await expect(page.getByRole('heading', { name: /Results-oriented Software Developer/, level: 2 })).toBeVisible();
  });

  test('should have call-to-action buttons', async ({ page }) => {
    // Using CSS selectors for links to be robust against text rendering/animation issues
    await expect(page.locator('a[href="/projects"]').first()).toBeVisible();
    await expect(page.locator('a[href="/contact"]').first()).toBeVisible();
  });

  test('should display featured projects section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Featured Projects', level: 2 })).toBeVisible();
  });
});
