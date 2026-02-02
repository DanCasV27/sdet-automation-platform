import { BasePage } from "./base.page";
import { expect, type Locator, type Page } from "@playwright/test";

export class ProductsPage extends BasePage {
    private readonly productsList: Locator;

    constructor(page: Page) {
        super(page);
        this.productsList = page.getByTestId("products-list");
    }

    async open() {
        await this.goto('/products');
    }

    async waitUntilLoaded() {
        await expect(this.productsList).toBeVisible();
    }

    async getProductText(productId:string): Promise<string>{
        return this.page.getByTestId(`product-row-${productId}`).innerText();
    }

    async isProductVisible(productId:string): Promise<boolean>{
        return this.page.getByTestId(`product-row-${productId}`).isVisible();
    }
}