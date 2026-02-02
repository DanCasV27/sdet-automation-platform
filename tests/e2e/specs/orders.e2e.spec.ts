import { test, expect } from "@playwright/test";
import { CreateOrderPage } from "../pages/create-order.page";
import { OrderDetailPage } from "../pages/order-detail.page";

test.describe("Orders E2E", () => {
  test("create order -> see order details", async ({ page }) => {
    const create = new CreateOrderPage(page);

    await create.open();
    await create.waitUntilLoaded();

    await create.setItem(0, "p1", 1);
    await create.addItem();
    await create.setItem(1, "p2", 2);
    await create.submit();

    const detail = new OrderDetailPage(page);
    await detail.waitUntilLoaded();

    const totalText = await detail.getTotalText();
    await expect(totalText).toBe("Total: 1300");

    const orderIdText = await detail.getOrderIdText();
    expect(orderIdText).toContain("Order");
  });
});
