import { Builder, By, until, WebDriver } from "selenium-webdriver";

async function amazonTest() {
  // Initialising the driver
  let driver: WebDriver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://www.amazon.co.uk");

    // Wait for the search bar to be located and then perform a search
    await driver.wait(until.elementLocated(By.name("field-keywords")), 10000);
    let searchBar = await driver.findElement(By.name("field-keywords"));
    await searchBar.sendKeys("nalgene");
    await searchBar.submit();

    // divide sections into different functions to improve readability and future changes
    // cookies function
    async function handleCookieConsent(driver: WebDriver) {
      try {
        let cookieConsentButton = await driver.findElement(
          By.id("sp-cc-accept")
        );
        await cookieConsentButton.click();
      } catch (error) {
        // add console.log
        console.log("Cookie consent part not found, continuing.");
      }
    }

    // search function
    async function searcProduct(driver: WebDriver) {
      await driver.wait(
        until.elementLocated(
          By.css("div.s-main-slot.s-result-list.s-search-results.sg-row > div")
        ),
        10000
      );
      let firstItem = await driver.findElement(
        By.css(
          "div.s-main-slot.s-result-list.s-search-results.sg-row > div[data-index='3']"
        )
      );
      await firstItem.click();
    }
    // Wait for the item page to load and then add the item to the cart
    await driver.wait(until.elementLocated(By.id("add-to-cart-button")), 10000);
    let addToCartButton = await driver.findElement(By.id("add-to-cart-button"));
    await addToCartButton.click();

    // Wait for the cart confirmation modal and proceed to checkout
    await driver.wait(
      until.elementLocated(By.name("proceedToRetailCheckout")),
      10000
    );
    let goToCheckoutButton = await driver.findElement(
      By.name("proceedToRetailCheckout")
    );
    await goToCheckoutButton.click();

    // Would normally wait for the checkout page, but need to be signed in, so check it goes to signin
    await driver.wait(until.urlContains("/ap/signin?_"), 10000);

    // Assert that it goes to the signin page
    if (await (await driver.getCurrentUrl()).includes("/ap/signin?_")) {
      console.log("Test passed: Navigated to checkout.");
    } else {
      console.log("Test failed: Did not navigate to checkout.");
    }
  } catch (error) {
    console.error("Test failed:", error);
  } finally {
    // Quit the driver
    await driver.quit();
  }
}

amazonTest();
