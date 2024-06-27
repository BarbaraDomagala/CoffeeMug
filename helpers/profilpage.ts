import { Page, expect } from "@playwright/test";

export class ProfilPage {
    constructor(readonly page: Page) {}
  
    async verifyNewAccount(email: string) {
        await this.page.click('[href="/profil/"]');
        await this.page.click(`//*[contains(text(), "Zweryfikuj e-mail")]`, {force: true});
        expect(this.page.locator(`[value=" ${email}"]`)).toBeVisible;
    }
  
  }