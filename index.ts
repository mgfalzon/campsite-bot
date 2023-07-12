import { chromium } from "playwright";

const { DEBUG } = process.env;

(async () => {
  const browser = await chromium.launch({ headless: !DEBUG, slowMo: DEBUG ? 200 : 0 });
  const page = await browser.newPage();

  await page.goto("https://www.google.com");
  const searchbar = page.locator("[title='Search']");
  await searchbar.type("Hello World!");

  await browser.close();
})();