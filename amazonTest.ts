import { Builder, By, until, WebDriver } from "selenium-webdriver";

async function amazonTest() {
  let driver: WebDriver = await new Builder().forBrowser("firefox").build();

  try {
    await driver.get("https://www.amazon.co.uk");

    // Handle cookie consent if present
    await handleCookieConsent(driver);

    await searchProduct(driver, "nalgene");
    await selectFirstProduct(driver);
    await addToCart(driver);
    await proceedToCheckout(driver);
    await verifyCheckoutPage(driver);
  } catch (error) {
    console.error("Test failed:", error);
  } finally {
    await driver.quit();
  }
}

// divide sections into different functions to improve readability and future changes
// cookies function
async function handleCookieConsent(driver: WebDriver) {
  try {
    await driver.wait(until.elementLocated(By.id("sp-cc-accept")), 5000);
    let cookieConsentButton = await driver.findElement(By.id("sp-cc-accept"));
    await cookieConsentButton.click();
  } catch (error) {
    console.log("Cookie consent not found, continuing.");
  }
}

// search function
async function searchProduct(driver: WebDriver, productName: string) {
  await driver.wait(until.elementLocated(By.name("field-keywords")), 10000);
  let searchBar = await driver.findElement(By.name("field-keywords"));
  await searchBar.sendKeys(productName);
  await searchBar.submit();
}

// function for selecting first product
async function selectFirstProduct(driver: WebDriver) {
  await driver.wait(
    until.elementLocated(
      By.css(
        "div.s-main-slot.s-result-list.s-search-results.sg-row > div[data-index='3']"
      )
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

// last comment becuase it makes sense what they do haha
async function addToCart(driver: WebDriver) {
  await driver.wait(until.elementLocated(By.id("add-to-cart-button")), 10000);
  let addToCartButton = await driver.findElement(By.id("add-to-cart-button"));
  await addToCartButton.click();
}

async function proceedToCheckout(driver: WebDriver) {
  await driver.wait(
    until.elementLocated(By.name("proceedToRetailCheckout")),
    10000
  );
  let goToCheckoutButton = await driver.findElement(
    By.name("proceedToRetailCheckout")
  );
  await goToCheckoutButton.click();
}

async function verifyCheckoutPage(driver: WebDriver) {
  await driver.wait(until.urlContains("/ap/signin?_"), 10000);
  let currentUrl = await driver.getCurrentUrl();
  if (currentUrl.includes("/ap/signin?_")) {
    console.log("Test passed: Navigated to checkout.");
  } else {
    console.log("Test failed: Did not navigate to checkout.");
  }
}

amazonTest();
