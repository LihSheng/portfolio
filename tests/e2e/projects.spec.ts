import { test, expect } from '@playwright/test';

test.describe('Projects list', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/projects');
  });

  test('displays the projects heading and rows', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Projects', level: 1 })).toBeVisible();
    await expect(page.getByRole('link', { name: /Trip Planner/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /LinkUp/i })).toBeVisible();
  });

  test('filters rows by tag', async ({ page }) => {
    const allRowsCount = await page.locator('a[href^="/projects/"]').count();

    const allButton = page.getByRole('button', { name: 'All', exact: true });
    const tagBar = allButton.locator('..');
    const firstTag = tagBar.getByRole('button').nth(1);
    const tagName = (await firstTag.textContent())?.trim() ?? '';
    await firstTag.click();

    await expect(page).toHaveURL(new RegExp(`tag=${encodeURIComponent(tagName)}`));
    const filteredCount = await page.locator('a[href^="/projects/"]').count();
    expect(filteredCount).toBeLessThanOrEqual(allRowsCount);
  });

  test('filters rows via the search box', async ({ page }) => {
    await page.getByPlaceholder('Search projects…').fill('trip planner');
    await expect(page.getByRole('link', { name: /Trip Planner/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /LinkUp/i })).toHaveCount(0);
  });
});

test.describe('Project detail', () => {
  test('trip-planner shows title, description and meta block', async ({ page }) => {
    await page.goto('/projects/trip-planner');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText('Year', { exact: true })).toBeVisible();
    await expect(page.getByText('Stack', { exact: true })).toBeVisible();
    await expect(page.getByText('Links', { exact: true })).toBeVisible();
  });

  test('linkup shows title and meta block', async ({ page }) => {
    await page.goto('/projects/linkup');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText('Year', { exact: true })).toBeVisible();
    await expect(page.getByText('Stack', { exact: true })).toBeVisible();
  });
});
