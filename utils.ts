import { Button, By, until, WebDriver } from "selenium-webdriver";

// cookies function
export async function handleCookieConsent(driver: WebDriver, idInput: string) {
  try {
    await driver.wait(until.elementLocated(By.id(idInput)), 3000);
    let cookieConsentButton = await driver.findElement(By.id(idInput));
    await cookieConsentButton.click();
  } catch (error) {
    console.log("Cookie consent not found, continuing.");
  }
}

// search product function
export async function searchProduct(
  driver: WebDriver,
  nameID: string,
  productName: string
) {
  await driver.wait(until.elementLocated(By.name(nameID)), 3000);
  let searchBar = await driver.findElement(By.name(nameID));
  await searchBar.sendKeys(productName);
  await searchBar.submit();
}

export async function selectFirstProduct(
  driver: WebDriver,
  productIdentifier: string
) {
  await driver.wait(until.elementLocated(By.css(productIdentifier)), 10000);
  let firstItem = await driver.findElement(By.css(productIdentifier));
  await firstItem.click();
}

export async function addToCart(driver: WebDriver, cartButtonID: string) {
  await driver.wait(until.elementLocated(By.id(cartButtonID)), 3000);
  let addToCartButton = await driver.findElement(By.id(cartButtonID));
  await addToCartButton.click();
}

export async function buyNow(driver: WebDriver, buyNowSelector: string) {
  await driver.wait(until.elementLocated(By.css(buyNowSelector)), 3000);
  let addToCartButton = await driver.findElement(By.css(buyNowSelector));
  await addToCartButton.click();
}

export async function proceedToCheckout(
  driver: WebDriver,
  checkoutButtonName: string
) {
  await driver.wait(until.elementLocated(By.name(checkoutButtonName)), 3000);
  let goToCheckoutButton = await driver.findElement(
    By.name(checkoutButtonName)
  );
  await goToCheckoutButton.click();
}

export async function verifyCheckoutPage(
  driver: WebDriver,
  checkoutURL: string
) {
  await driver.wait(until.urlContains(checkoutURL), 3000);
  let currentUrl = await driver.getCurrentUrl();
  if (currentUrl.includes(checkoutURL)) {
    console.log("Test passed: Navigated to checkout.");
  } else {
    console.log("Test failed: Did not navigate to checkout.");
  }
}
