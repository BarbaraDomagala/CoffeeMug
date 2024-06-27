import { Page } from "@playwright/test";

export class ProductDetailsPage {
    constructor(readonly page: Page) {}
  
    async addProductToTheCart() {
        await this.page.click(`//*[contains(text(), "Do koszyka")]`, {force: true});
    }

    async openCart() {
        await this.page.click('[href="/koszyk/"]', {force: true});
    }
 
  }
  