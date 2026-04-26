import { test, expect } from "@playwright/test";

test.describe("Quran App E2E", () => {
  test("home page loads with 114 surahs", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();
    const surahCards = page.locator("[data-surah]");
    await expect(surahCards).toHaveCount(114);
  });

  test("surah page displays Arabic text and translation", async ({ page }) => {
    await page.goto("/surah/1");
    await expect(page.locator("text=Al-Fatiha")).toBeVisible();
    const arabicText = page.locator(".arabic-text").first();
    await expect(arabicText).toBeVisible();
  });

  test("search returns results", async ({ page }) => {
    await page.goto("/search");
    await page.fill('input[type="text"]', "mercy");
    await page.waitForTimeout(500);
    const results = page.locator("[data-search-result]");
    const count = await results.count();
    expect(count).toBeGreaterThan(0);
  });

  test("dark mode toggle works", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");
    await expect(html).not.toHaveClass(/dark/);
    await page.click('[aria-label*="dark mode"]');
    await expect(html).toHaveClass(/dark/);
  });

  test("juz page lists 30 divisions", async ({ page }) => {
    await page.goto("/juz");
    await expect(page.locator("text=Juz 1")).toBeVisible();
    await expect(page.locator("text=Juz 30")).toBeVisible();
  });

  test("bookmarks page accessible", async ({ page }) => {
    await page.goto("/bookmarks");
    await expect(page.locator("text=Bookmarks")).toBeVisible();
  });

  test("404 page renders for unknown routes", async ({ page }) => {
    await page.goto("/nonexistent-page");
    await expect(page.locator("text=404")).toBeVisible();
  });

  test("surah navigation works", async ({ page }) => {
    await page.goto("/surah/2");
    await expect(page.locator("text=Al-Baqarah")).toBeVisible();
    await page.click("text=Next →");
    await expect(page.locator("text=Aal-e-Imran")).toBeVisible();
  });

  test("mushaf page loads", async ({ page }) => {
    await page.goto("/mushaf");
    await expect(page.locator("text=Mushaf View")).toBeVisible();
    await expect(page.locator("text=Page 1")).toBeVisible();
  });

  test("reading plans page loads", async ({ page }) => {
    await page.goto("/reading-plans");
    await expect(page.locator("text=Reading Plans")).toBeVisible();
    await expect(page.locator("text=30 Days")).toBeVisible();
  });
});
