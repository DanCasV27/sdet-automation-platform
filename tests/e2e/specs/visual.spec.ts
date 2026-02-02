import { test, expect } from "@playwright/test";
import { ProductsPage } from "../pages/products.page";

test.describe("Visual regression", () => {
  test("products page snapshot", async ({ page }) => {
    const products = new ProductsPage(page);

    await products.open();
    await products.waitUntilLoaded();

    await expect(page).toHaveScreenshot("products-page.png", { fullPage: true });
  });
});
