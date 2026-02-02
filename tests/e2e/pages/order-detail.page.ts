import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class OrderDetailPage extends BasePage {
  private readonly orderId: Locator;
  private readonly total: Locator;
  private readonly items: Locator;

  constructor(page: Page) {
    super(page);
    this.orderId = page.getByTestId("order-id");
    this.total = page.getByTestId("order-total");
    this.items = page.getByTestId("order-items");
  }

  async waitUntilLoaded() {
    await expect(this.orderId).toBeVisible();
    await expect(this.total).toBeVisible();
  }

  async getOrderIdText(): Promise<string> {
    return this.orderId.innerText();
  }

  async getTotalText(): Promise<string> {
    return this.total.innerText();
  }

  async getItemsText(): Promise<string> {
    return this.items.innerText();
  }
}
