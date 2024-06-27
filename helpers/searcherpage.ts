import { Page } from "@playwright/test";

export class SearcherPage {
    constructor(readonly page: Page) {}
  
    async selectPrice(min: string, max: string) {
        await this.page.click('.form-control.form-control-sm.input-range-from');
        await this.page.fill('.form-control.form-control-sm.input-range-from', min);        
        await this.page.click('.form-control.form-control-sm.input-range-to');
        await this.page.fill('.form-control.form-control-sm.input-range-to', max);
        await this.page.click(`//*[contains(text(), "AKTYWNE FILTRY")]`); //this click is kind of click outside anywhere on the website to activate a given range
    }

    async openProductDetailsPage() {
        await this.page.locator('.productLink').first().click(); // I can click on first product on the list and open its details page
    }
  
  }