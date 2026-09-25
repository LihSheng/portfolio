import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Home/);
  });

  test('displays the intro heading', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: /Ng Lih Sheng.*full-stack software developer in Singapore/, level: 1 })
    ).toBeVisible();
  });

  test('displays the "At a glance" section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'At a glance', level: 2 })).toBeVisible();
  });

  test('displays the "How I work" section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'How I work', level: 2 })).toBeVisible();
  });

  test('displays the "Selected work" section linking to projects', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Selected work', level: 2 })).toBeVisible();
    await expect(page.locator('a[href="/projects"]').first()).toBeVisible();
  });

  test('has a link to contact', async ({ page }) => {
    await expect(page.locator('a[href="/contact"]').first()).toBeVisible();
  });
});
