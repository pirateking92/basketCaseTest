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
