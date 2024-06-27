import { Page, expect } from "@playwright/test";

export class MainPage {
    constructor(readonly page: Page) {}
  
    async openMorelePage() {
        this.page.goto('https://www.morele.net/');
        await expect(this.page).toHaveTitle('Morele - zakupy online to pestka');
    }

    async confirmCookies() {
        await this.page.click('[data-action="cookie-consent#onApproveAll"]');
    }

    async openLoginPage() {
        await this.page.click(`//*[contains(text(), "Zaloguj się")]`, {force: true});
    }

    async searcher(searchedPhrase: string) {
        await this.page.click('[type="search"]');
        await this.page.fill('[type="search"]', `${searchedPhrase}`);
        await this.page.click('[type="submit"]');
    }
 
  }
  