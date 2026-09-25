import { test, expect, Page } from '@playwright/test';

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

/** The egg host renders with the layout; wait for hydration before triggering anything. */
async function waitForEggs(page: Page) {
  await expect(page.getByTestId('easter-egg-host')).toBeAttached();
  await expect(page.getByRole('button', { name: /Switch to (dark|light) mode/ })).toBeEnabled();
}

test.describe('Easter eggs', () => {
  test('Konami code shows a toast', async ({ page }) => {
    await page.goto('/');
    await waitForEggs(page);
    for (const key of KONAMI) await page.keyboard.press(key);
    await expect(page.getByText('Achievement unlocked')).toBeVisible();
  });

  test('typing a secret word shows a toast', async ({ page }) => {
    await page.goto('/');
    await waitForEggs(page);
    await page.keyboard.type('hello');
    await expect(page.getByText('Hello to you too')).toBeVisible();
  });

  test('typing inside the contact form never triggers an egg', async ({ page }) => {
    await page.goto('/contact');
    await waitForEggs(page);
    const name = page.getByLabel(/name/i).first();
    await name.click();
    await name.fill('');
    await name.type('hello');
    await expect(name).toHaveValue('hello');
    await expect(page.getByText('Hello to you too')).toHaveCount(0);
  });

  test('clicking the About portrait seven times shows a toast', async ({ page }) => {
    await page.goto('/about');
    await waitForEggs(page);
    const portrait = page.getByRole('img', { name: /Profile picture of/ }).first();
    await expect(portrait).toBeVisible();
    for (let i = 0; i < 7; i++) await portrait.click();
    await expect(page.getByText(/really me|Behind the scenes/)).toBeVisible();
  });

  test('rapid theme toggling unlocks the terminal theme and one click leaves it', async ({ page }) => {
    await page.goto('/');
    await waitForEggs(page);
    const toggle = page.locator('header').getByRole('button');
    for (let i = 0; i < 10; i++) await toggle.click();
    await expect(page.locator('html')).toHaveClass(/theme-terminal/);
    await toggle.click();
    await expect(page.locator('html')).not.toHaveClass(/theme-terminal/);
  });

  test('the hidden terminal route answers commands', async ({ page }) => {
    await page.goto('/terminal');
    const input = page.getByLabel('Terminal command');
    await input.fill('whoami');
    await input.press('Enter');
    await expect(page.getByRole('log')).toContainText('Ng Lih Sheng');
    await input.fill('hire');
    await input.press('Enter');
    await expect(page).toHaveURL(/contact/);
  });

  test('the 404 page keeps its links usable with the star field behind it', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');
    await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
    await page.getByRole('link', { name: 'Home' }).first().click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('normal pages log no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    await page.goto('/');
    await waitForEggs(page);
    await page.locator('header').getByRole('link', { name: 'About' }).click();
    await expect(page.getByRole('heading', { name: 'About', level: 1 })).toBeVisible();
    // Ignore blocked remote resources, which are unrelated to the page code.
    const ignored = /Failed to load resource|403|404 \(Not Found\)/i;
    expect(errors.filter((e) => !ignored.test(e))).toEqual([]);
  });
});
