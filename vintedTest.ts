import { Builder, By, until, WebDriver } from "selenium-webdriver";
import {
  handleCookieConsent,
  searchProduct,
  selectFirstProduct,
  proceedToCheckout,
  verifyCheckoutPage,
  buyNow,
} from "./utils";

// changing the test to be encapsulated in a class
// will make it easier to read and will make it so that

export class VintedTest {
  private driver: WebDriver;

  constructor() {
    this.driver = new Builder().forBrowser("chrome").build();
  }

  async runTest() {
    try {
      await this.driver.get("https://www.vinted.co.uk");
      await handleCookieConsent(this.driver, "onetrust-reject-all-handler");
      await searchProduct(this.driver, "search_text", "jeans");
      await selectFirstProduct(
        this.driver,
        "div.feed-grid__item:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > a:nth-child(3)"
      );
      await buyNow(this.driver, "button.web_ui__Button__filled");
      await proceedToCheckout(this.driver, "proceedToRetailCheckout");
      await verifyCheckoutPage(this.driver, "/ap/signin?_");
    } catch (error) {
      console.error("Test failed:", error);
    } finally {
      await this.driver.quit();
    }
  }
}
