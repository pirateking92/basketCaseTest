import { Builder, By, until, WebDriver } from "selenium-webdriver";

async function depopTest() {
  // intitialising the driver
  let driver: WebDriver = await new Builder().forBrowser("firefox").build();

  try {
    await driver.get("https://www.depop.com");

    await driver.wait(until.elementLocated(By.name("q")), 10000);

    let searchBar = await driver.findElement(By.name("q"));
    await searchBar.sendKeys("towel t-shirt");

    await searchBar.submit();

    await driver.wait(
      until.elementLocated(
        By.css(".styles__HoverOverlay-sc-4aad5806-0.jPzBwX")
      ),
      10000
    );
    // Assert that results are displayed

    let firstResult = await driver.findElement(
      By.css(".styles__HoverOverlay-sc-4aad5806-0.jPzBwX")
    );
    await firstResult.click();

    // Wait for the item page to load
    await driver.wait(
      until.elementLocated(By.css('button[data-testid="add-to-bag"]')),
      10000
    );

    // Add item to cart
    let addToCartButton = await driver.findElement(
      By.css("button[Add to bag]")
    );
    await addToCartButton.click();

    // Wait for the cart confirmation
    await driver.wait(
      until.elementLocated(By.css(".styles__CartConfirmModal-sc-1q8ro6x-0")),
      10000
    );

    // Go to checkout
    let goToCheckoutButton = await driver.findElement(
      By.css('.styles__CartConfirmModal-sc-1q8ro6x-0 a[href="/checkout"]')
    );
    await goToCheckoutButton.click();

    // Wait for the checkout page to load
    await driver.wait(until.elementLocated(By.css(".checkout-content")), 10000);

    // Assert that the checkout page is displayed
    if ((await driver.getCurrentUrl()).includes("/checkout")) {
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
