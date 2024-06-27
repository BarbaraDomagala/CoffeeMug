import { Page } from "@playwright/test";

export class LoginPage {
    constructor(readonly page: Page) {}
  
    async createNewAccount(newEmail: string, password: string) {
        await this.page.click('[id="register-tab"]');
        await this.page.click('[id="user_userEmail"]');
        await this.page.fill('[id="user_userEmail"]', newEmail);
        await this.page.click('[id="user_plainPassword"]');
        await this.page.fill('[id="user_plainPassword"]', password);
        await this.acceptRegulations();
        await this.page.click(`//*[contains(text(), "Utwórz konto")]`, {force: true});
        await this.ignoreNewsletter();
    }

    async acceptRegulations() {
       await this.page.click(`//*[contains(text(), "Akceptuję")]`, {force: true});
    }

    async acceptNewsletter() {
        await this.page.click(`//*[contains(text(), "Chcę otrzymywać newsletter i korzystać ze specjalnych promocji. ")]`, {force: true});
    }

    async ignoreNewsletter() {
        await this.page.click(`//*[contains(text(), "Utwórz konto")]`, {force: true});
    }

    async login(Email: string, password: string) {
        await this.page.goto('https://www.morele.net/login');
        await this.page.waitForTimeout(1000);
        await this.page.click('[id="username"]');
        await this.page.fill('[id="username"]', Email);
        await this.page.click('[id="password-log"]');
        await this.page.fill('[id="password-log"]', password);
        await this.page.click(`//*[contains(text(), "Zaloguj się")]`, {force: true});     
        await this.page.waitForTimeout(1000);   
    }

  }
  