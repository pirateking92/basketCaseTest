import { Builder, By, until, WebDriver } from "selenium-webdriver";

async function amazonTest() {
  // Initializing the driver
  let driver: WebDriver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://www.amazon.co.uk");

    // Wait for the search bar to be located and then perform a search
    await driver.wait(until.elementLocated(By.name("field-keywords")), 10000);
    let searchBar = await driver.findElement(By.name("field-keywords"));
    await searchBar.sendKeys("nalgene");
    await searchBar.submit();

    // Handle cookie consent form if present
    try {
      let cookieConsentButton = await driver.findElement(By.id("sp-cc-accept"));
      await cookieConsentButton.click();
    } catch (error) {
      // Ignore if cookie consent form is not present
    }

    // Wait for search results to load and select the first item
    await driver.wait(
      until.elementLocated(
        By.css("div.s-main-slot.s-result-list.s-search-results.sg-row > div")
      ),
      10000
    );
    let firstItem = await driver.findElement(
      By.css(
        "div.s-main-slot.s-result-list.s-search-results.sg-row > div[data-index='0']"
      )
    );
    await firstItem.click();

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

    // Wait for the checkout page to load
    await driver.wait(until.urlContains("/ap/signin?_"), 10000);

    // Assert that the checkout page is displayed
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
