import { expect, test } from "@playwright/test";

async function waitForPreloaderToFinish(page) {
  const loadingLabel = page.getByText("Loading", { exact: true });

  try {
    await loadingLabel.waitFor({ state: "hidden", timeout: 6000 });
  } catch {
    // If the preloader is already gone or text matching changes, continue.
  }
}

test("renders the main portfolio structure without runtime errors", async ({
  page,
}) => {
  const runtimeErrors = [];

  page.on("pageerror", (error) => {
    runtimeErrors.push(error.message);
  });

  page.on("console", (message) => {
    if (message.type() === "error") {
      runtimeErrors.push(message.text());
    }
  });

  await page.goto("/");
  await waitForPreloaderToFinish(page);

  await expect(page.locator("main#main")).toBeVisible();
  await expect(page.locator("section#top")).toBeVisible();
  await expect(page.locator("section#about")).toBeVisible();
  await expect(page.locator("section#architecture")).toBeVisible();
  await expect(page.locator("footer")).toBeVisible();

  await page.locator('a[href="#about"]').last().click();
  await expect(page).toHaveURL(/#about$/);

  expect(runtimeErrors).toEqual([]);
});

test.describe("mobile smoke", () => {
  test.use({
    viewport: { width: 390, height: 844 },
  });

  test("opens and closes the mobile menu", async ({ page }) => {
    await page.goto("/");
    await waitForPreloaderToFinish(page);

    const menuButton = page.locator('button[aria-controls="mobile-navigation-panel"]');

    await expect(menuButton).toBeVisible();
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");

    await menuButton.click();
    await expect(menuButton).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#mobile-navigation-panel")).toBeVisible();

    await page.locator('#mobile-navigation-panel a[href="#contact"]').click();

    await expect(page).toHaveURL(/#contact$/);
    await expect(page.locator("#mobile-navigation-panel")).toBeHidden();
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });
});
