import { expect, Locator, Page } from '@playwright/test'

export class CurrencyExchange {
  readonly page: Page
  readonly selectCurrencyBox: Locator
  readonly currencyAmountInput: Locator
  readonly selectRadioCurrencyButton: Locator
  readonly calculateCostsButton: Locator

  constructor(page: Page) {
    this.page = page
    this.selectCurrencyBox = page.locator('#pc_currency')
    this.currencyAmountInput = page.locator('#pc_amount')
    this.selectRadioCurrencyButton = page.locator('#pc_inDollars_true')
    this.calculateCostsButton = page.locator('#pc_calculate_costs')
  }

  async purchaseCurrency() {
    await this.selectCurrencyBox.selectOption('EUR')
    const currencyMessage = await this.page.locator('#sp_sell_rate')
    await expect(currencyMessage).toContainText('1 euro (EUR)')
    await this.currencyAmountInput.fill('400')
    await this.selectRadioCurrencyButton.click()
    await this.calculateCostsButton.click()
  }
  async conversionMessage() {
    const conversionMessage = await this.page.locator('#pc_conversion_amount')
    await expect(conversionMessage).toBeVisible()
    await expect(conversionMessage).toContainText('400.00 U.S. dollar (USD)')
  }

  async clickPurchaseButton() {
    await this.page.click('#purchase_cash')
  }

  async assertMessage() {
    const alertMessage = await this.page.locator('#alert_content')
    await expect(alertMessage).toContainText(
      'Foreign currency cash was successfully purchased.',
    )
  }
}
