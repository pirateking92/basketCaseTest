import { Builder, By, until, WebDriver } from "selenium-webdriver";
import {
  handleCookieConsent,
  searchProduct,
  selectFirstProduct,
  addToCart,
  proceedToCheckout,
  verifyCheckoutPage,
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

      // checks all functions below. much cleaner than before
      await handleCookieConsent(this.driver, "onetrust-banner-sdk");
      await searchProduct(this.driver, "search-text", "jeans");
      await selectFirstProduct(
        this.driver,
        "div.s-main-slot.s-result-list.s-search-results.sg-row > div[data-index='3']"
      );
      await addToCart(this.driver, "add-to-cart-button");
      await proceedToCheckout(this.driver, "proceedToRetailCheckout");
      await verifyCheckoutPage(this.driver, "/ap/signin?_");
    } catch (error) {
      console.error("Test failed:", error);
    } finally {
      await this.driver.quit();
    }
  }
}
