import { BasePage } from "./base.page";
import { expect, type Locator, type Page } from "@playwright/test";

export class HomePage extends BasePage {
    private readonly title: Locator;
    private readonly navHome: Locator;
    private readonly navProducts: Locator;
    private readonly navCreateOrder: Locator;

    constructor(page: Page) {
        super(page);
        this.title = page.getByTestId("home-title");
        this.navHome = page.getByTestId('nav-home');
        this.navProducts =page.getByTestId('nav-products');
        this.navCreateOrder = page.getByTestId('nav-create-order');
    }

    async open(){
        await this.goto('/');
    }

    async waitUntilLoaded(){
        await expect(this.title).toBeVisible();
    }
}