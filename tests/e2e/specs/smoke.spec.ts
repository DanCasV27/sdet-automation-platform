import { test } from "@playwright/test";
import { HomePage } from "../pages/home.page";

test.describe("Smoke", () => {
  test("home loads", async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    await home.waitUntilLoaded();
  });
});
