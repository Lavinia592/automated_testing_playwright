import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { Navbar } from '../../page-objects/components/Navbar'
import { CurrencyExchange } from '../../page-objects/ForeignCurrency'

test.describe('Currency exchange', () => {
  let homePage: HomePage
  let loginPage: LoginPage
  let currencyExchange: CurrencyExchange
  let navbar: Navbar

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    currencyExchange = new CurrencyExchange(page)
    navbar = new Navbar(page)

    await homePage.visit()
    await homePage.clickSignIn()
    await loginPage.login('username', 'password')
  })

  test('purchase foreign currency', async ({ page }) => {
    await page.goBack()

    await page.click('#account_activity_link')
    navbar.clickOnTab('Pay Bills')
    await page.click('text=Purchase Foreign Currency')

    await currencyExchange.purchaseCurrency()
    await currencyExchange.conversionMessage()
    await currencyExchange.clickPurchaseButton()
    await currencyExchange.assertMessage()
  })
})
