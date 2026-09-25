import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows text-only links for About, Projects and Contact, no Writing', async ({ page }) => {
    const header = page.locator('header');
    await expect(header.getByRole('link', { name: 'About' })).toBeVisible();
    await expect(header.getByRole('link', { name: 'Projects' })).toBeVisible();
    await expect(header.getByRole('link', { name: 'Contact' })).toBeVisible();
    await expect(header.getByRole('link', { name: 'Writing' })).toHaveCount(0);
  });

  test('has no hamburger menu button', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: /menu/i })
    ).toHaveCount(0);
  });

  test('navigates to About page', async ({ page }) => {
    await page.locator('header').getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL(/.*about/);
    await expect(page.getByRole('heading', { name: 'About', level: 1 })).toBeVisible();
  });

  test('navigates to Projects page', async ({ page }) => {
    await page.locator('header').getByRole('link', { name: 'Projects' }).click();
    await expect(page).toHaveURL(/.*projects/);
    await expect(page.getByRole('heading', { name: 'Projects', level: 1 })).toBeVisible();
  });

  test('navigates to Contact page', async ({ page }) => {
    await page.locator('header').getByRole('link', { name: 'Contact' }).click();
    await expect(page).toHaveURL(/.*contact/);
    await expect(page.getByRole('heading', { name: 'Contact', level: 1 })).toBeVisible();
  });

  test('/writing no longer exists', async ({ page }) => {
    const response = await page.goto('/writing');
    expect(response?.status()).toBe(404);
  });
});
