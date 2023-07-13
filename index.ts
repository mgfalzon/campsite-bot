import { chromium } from "playwright";

const { DEBUG } = process.env;

(async () => {
  const browser = await chromium.launch({ headless: !DEBUG, slowMo: DEBUG ? 200 : 0 });
  const page = await browser.newPage();

  await page.goto("https://www.google.com");

  const searchbar = page.locator("[title='Search']");
  await searchbar.type("Hello World!");
  await searchbar.press("Enter");

  const links = page.locator("#search").getByRole("link");
  await links.first().click();

  /**
   * Waiting for demo purposes, you should never wait.
   * 
   * Tests that wait for time are inherently flaky (can ocassionally fail).
   * Use Locator actions and web assertions that wait automatically.
  */
  await page.waitForTimeout(1000);

  await browser.close();
})();