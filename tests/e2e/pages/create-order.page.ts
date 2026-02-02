import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class CreateOrderPage extends BasePage {
  private readonly form: Locator;
  private readonly addItemBtn: Locator;
  private readonly submitBtn: Locator;
  private readonly errorBox: Locator;

  constructor(page: Page) {
    super(page);
    this.form = page.getByTestId("create-order-form");
    this.addItemBtn = page.getByTestId("add-item");
    this.submitBtn = page.getByTestId("submit-order");
    this.errorBox = page.getByTestId("create-order-error");
  }

  async open() {
    await this.goto("/orders/new");
  }

  async waitUntilLoaded() {
    await expect(this.form).toBeVisible();
  }

  private productSelect(index: number) {
    return this.page.getByTestId(`item-${index}-product`);
  }

  private qtyInput(index: number) {
    return this.page.getByTestId(`item-${index}-qty`);
  }

  async addItem() {
    await this.addItemBtn.click();
  }

  async setItem(index: number, productId: string, quantity: number) {
    await this.productSelect(index).selectOption(productId);
    await this.qtyInput(index).fill(String(quantity));
  }

  async submit() {
    await this.submitBtn.click();
  }

  async getErrorText(): Promise<string | null> {
    if (await this.errorBox.isVisible().catch(() => false)) {
      return this.errorBox.innerText();
    }
    return null;
  }
}
