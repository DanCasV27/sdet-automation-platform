import { test, expect } from "@playwright/test";
import { ProductsPage } from "../pages/products.page";

test.describe("Products", () => {
  test("shows products list and laptop is visible", async ({ page }) => {
    const products = new ProductsPage(page);

    await products.open();
    await products.waitUntilLoaded();

    expect(await products.isProductVisible("p1")).toBe(true);
  });
});
