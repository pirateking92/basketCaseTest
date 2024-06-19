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

export class AmazonTest {
  private driver: WebDriver;

  constructor() {
    this.driver = new Builder().forBrowser("chrome").build();
  }

  async runTest() {
    try {
      await this.driver.get("https://www.amazon.co.uk");

      // checks all functions below. much cleaner than before
      await handleCookieConsent(this.driver, "sp-cc-accept");
      await searchProduct(this.driver, "field-keywords", "nalgene");
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
  // made utils file to handle some of these functions. test still passes

  // divide sections into different functions to improve readability and future changes
  // cookies function
  // private async handleCookieConsent(idInput: string) {
  //   try {
  //     await this.driver.wait(until.elementLocated(By.id(idInput)), 3000);
  //     let cookieConsentButton = await this.driver.findElement(
  //       By.id("sp-cc-accept")
  //     );
  //     await cookieConsentButton.click();
  //   } catch (error) {
  //     console.log("Cookie consent not found, continuing.");
  //   }
  // }

  // // search function
  // private async searchProduct(productName: string) {
  //   await this.driver.wait(
  //     until.elementLocated(By.name("field-keywords")),
  //     3000
  //   );
  //   let searchBar = await this.driver.findElement(By.name("field-keywords"));
  //   await searchBar.sendKeys(productName);
  //   await searchBar.submit();
  // }

  // // function for selecting first product
  // private async selectFirstProduct() {
  //   await this.driver.wait(
  //     until.elementLocated(
  //       By.css(
  //         "div.s-main-slot.s-result-list.s-search-results.sg-row > div[data-index='3']"
  //       )
  //     ),
  //     10000
  //   );
  //   let firstItem = await this.driver.findElement(
  //     By.css(
  //       "div.s-main-slot.s-result-list.s-search-results.sg-row > div[data-index='3']"
  //     )
  //   );
  //   await firstItem.click();
  // }

  // // add to cart function. will press the add to cart button
  // private async addToCart() {
  //   await this.driver.wait(
  //     until.elementLocated(By.id("add-to-cart-button")),
  //     3000
  //   );
  //   let addToCartButton = await this.driver.findElement(
  //     By.id("add-to-cart-button")
  //   );
  //   await addToCartButton.click();
  // }

  // // proceed to checkout, will press the checkout button
  // private async proceedToCheckout() {
  //   await this.driver.wait(
  //     until.elementLocated(By.name("proceedToRetailCheckout")),
  //     3000
  //   );
  //   let goToCheckoutButton = await this.driver.findElement(
  //     By.name("proceedToRetailCheckout")
  //   );
  //   await goToCheckoutButton.click();
  // }

  // verifies that after proceeding to the checkout, that the correct page has been accessed.
  // at this point it checks if the signin page is accessed as the user would have to login at this point
  // private async verifyCheckoutPage() {
  //   await this.driver.wait(until.urlContains("/ap/signin?_"), 3000);
  //   let currentUrl = await this.driver.getCurrentUrl();
  //   if (currentUrl.includes("/ap/signin?_")) {
  //     console.log("Test passed: Navigated to checkout.");
  //   } else {
  //     console.log("Test failed: Did not navigate to checkout.");
  //   }
  // }
}
//could add extra function that logs in. could add some credentials to a .env to load.
