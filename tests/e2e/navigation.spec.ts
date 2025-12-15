import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to About page', async ({ page }) => {
    await page.getByRole('link', { name: 'About' }).first().click();
    await expect(page).toHaveURL(/.*about/);
    await expect(page.getByRole('heading', { name: 'About Me', level: 1 })).toBeVisible();
  });

  test('should navigate to Projects page', async ({ page }) => {
    await page.getByRole('link', { name: 'Projects' }).first().click();
    await expect(page).toHaveURL(/.*projects/);
    await expect(page.getByRole('heading', { name: 'Projects', level: 1 })).toBeVisible();
  });

  test('should navigate to Contact page', async ({ page }) => {
    await page.getByRole('link', { name: 'Contact' }).first().click();
    await expect(page).toHaveURL(/.*contact/);
    await expect(page.getByRole('heading', { name: 'Get in Touch', level: 1 })).toBeVisible();
  });
});
