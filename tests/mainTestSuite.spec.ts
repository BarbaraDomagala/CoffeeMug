import { test, expect, Browser, Page, BrowserContext } from '@playwright/test';
import { chromium } from 'playwright';
import { MainPage } from "../helpers/mainpage";
import { LoginPage } from "../helpers/loginpage";
import { ProfilPage } from "../helpers/profilpage";
import { SearcherPage } from "../helpers/searcherpage";
import { ProductDetailsPage } from "../helpers/productdetailspage";
import credentials from "../login.config";

test.describe("recruitment task for Coffee Mug", () => {

  let browser: Browser;
  let context: BrowserContext;
  let page: Page;
  

test.beforeAll(async () => {
    // Create a browser instance
    browser = await chromium.launch();

    // let mainPage: MainPage;
    // mainPage = new MainPage(page);
    // let loginPage: LoginPage;
    // loginPage = new LoginPage(page);

});

test.beforeEach(async () => {
  // Create a new context for each test
  context = await browser.newContext();
    
  // Create a new page within the context
  page = await context.newPage();
  let mainPage: MainPage;
  mainPage = new MainPage(page);

  await mainPage.openMorelePage();
  await mainPage.confirmCookies();
});

test.afterEach(async () => {
  // After each test we need to close the browser
  await page.close();
});

test('User Registration and Login', async () => {
  let mainPage: MainPage;
  mainPage = new MainPage(page);  
  let loginPage: LoginPage;
  loginPage = new LoginPage(page);
  let profilPage: ProfilPage;
  profilPage = new ProfilPage(page);
  
  await mainPage.openLoginPage();
  await loginPage.createNewAccount(credentials.newEmail, credentials.pass);
  await loginPage.login(credentials.newEmail, credentials.pass);
  await profilPage.verifyNewAccount(credentials.newEmail);
  
  await expect(page).toHaveTitle('Morele - zakupy online to pestka');
});

test('Product search and Filter', async () => {
  let mainPage: MainPage;
  mainPage = new MainPage(page);  
  let loginPage: LoginPage;
  loginPage = new LoginPage(page);
  let searcherPage: SearcherPage;
  searcherPage = new SearcherPage(page);

  const min = 100;
  const max = 2000;

  await loginPage.login(credentials.newEmail, credentials.pass);
  await mainPage.searcher('elektronika');
  await searcherPage.selectPrice(min.toString(), max.toString());
  const price = parseFloat(await page.$eval('.price-new', (div) => div.innerHTML));
  
  expect(price).toBeGreaterThanOrEqual(min);
  expect(price).toBeLessThanOrEqual(max);
});

test('Adding Items to Cart', async () => {
  let mainPage: MainPage;
  mainPage = new MainPage(page);  
  let loginPage: LoginPage;
  loginPage = new LoginPage(page);
  let searcherPage: SearcherPage;
  searcherPage = new SearcherPage(page);
  let productDetailsPage: ProductDetailsPage;
  productDetailsPage = new ProductDetailsPage(page);

  const min = 100;
  const max = 2000;
 
  await loginPage.login(credentials.newEmail, credentials.pass);
  await mainPage.searcher('elektronika');
  await searcherPage.selectPrice(min.toString(), max.toString());
  const price = await page.$eval('.price-new', (div) => div.innerHTML);
  await searcherPage.openProductDetailsPage();

  await productDetailsPage.addProductToTheCart();
  await page.waitForTimeout(1000); 
  
  expect(page.locator(`data-default="${price} zł"]`)).toBeVisible;
  
});

});
