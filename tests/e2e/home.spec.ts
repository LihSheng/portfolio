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

  test('draws the pointing hand and lets the visitor hide it', async ({ page }) => {
    const canvas = page.locator('canvas[data-pointing-hand]');
    await expect(canvas).toHaveCount(1);
    await expect(canvas).toHaveCSS('pointer-events', 'none');

    await page.getByRole('button', { name: 'Hide hand' }).click();
    await expect(canvas).toHaveCount(0);

    await page.reload();
    await expect(page.locator('canvas[data-pointing-hand]')).toHaveCount(0);
    await page.getByRole('button', { name: 'Show hand' }).click();
    await expect(page.locator('canvas[data-pointing-hand]')).toHaveCount(1);
  });

  test('does not show the pointing hand or its toggle on phones', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    await page.reload();
    await expect(page.locator('canvas[data-pointing-hand]')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Hide hand' })).toBeHidden();
  });

  test('does not show the pointing hand on other pages', async ({ page }) => {
    await page.goto('/about');
    await expect(page.locator('canvas[data-pointing-hand]')).toHaveCount(0);
  });
});
