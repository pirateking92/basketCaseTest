import { By, until, WebDriver } from "selenium-webdriver";

export async function handleCookieConsent(driver: WebDriver, idInput: string) {
  try {
    await driver.wait(until.elementLocated(By.id(idInput)), 3000);
    let cookieConsentButton = await driver.findElement(By.id("sp-cc-accept"));
    await cookieConsentButton.click();
  } catch (error) {
    console.log("Cookie consent not found, continuing.");
  }
}

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
  let firstItem = await driver.findElement(
    By.css(
      "div.s-main-slot.s-result-list.s-search-results.sg-row > div[data-index='3']"
    )
  );
  await firstItem.click();
}
