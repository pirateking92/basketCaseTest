import { Builder, By, until, WebDriver } from "selenium-webdriver";

async function depopTest() {
  // intitialising the driver
  let driver: WebDriver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://www.amazon.co.uk");

    await driver.wait(until.elementLocated(By.name("field-keywords")), 10000);

    let searchBar = await driver.findElement(By.name("field-keywords"));
    await searchBar.sendKeys("nalgene");

    // Submit the search form
    await searchBar.submit();

    // Wait for search results to load
    await driver.wait(
      until.elementLocated(By.id("MAIN-SEARCH_RESULTS-4")),
      10000
    );

    // Select the first item from the search results
    let firstItem = await driver.findElement(By.id("MAIN-SEARCH_RESULTS-4"));
    await firstItem.click();

    // Wait for the item page to load
    await driver.wait(until.elementLocated(By.id("add-to-cart-button")), 10000);

    // Add item to cart
    let addToCartButton = await driver.findElement(By.id("add-to-cart-button"));
    await addToCartButton.click();

    // Wait for the cart confirmation
    await driver.wait(
      until.elementLocated(By.css("CORRECT_CART_CONFIRMATION_MODAL_SELECTOR")),
      10000
    );

    // Go to checkout
    let goToCheckoutButton = await driver.findElement(
      By.css("CORRECT_CHECKOUT_BUTTON_SELECTOR")
    );
    await goToCheckoutButton.click();

    // Wait for the checkout page to load
    await driver.wait(
      until.elementLocated(By.css("CORRECT_CHECKOUT_PAGE_SELECTOR")),
      10000
    );

    // Assert that the checkout page is displayed
    if (await (await driver.getCurrentUrl()).includes("/checkout")) {
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

depopTest();
