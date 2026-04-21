import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { Navbar } from '../../page-objects/components/Navbar'
import { PaymentPage } from '../../page-objects/PaymentPage'

test.describe.only('payment', () => {
  let homePage: HomePage
  let loginPage: LoginPage
  let paymentPage: PaymentPage
  let navbar: Navbar

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    paymentPage = new PaymentPage(page)
    navbar = new Navbar(page)

    await homePage.visit()
    await homePage.clickSignIn()
    await loginPage.login('username', 'password')
  })

  test('should send new payment', async ({ page }) => {
    await page.goBack()
    await page.click('#account_activity_link')
    navbar.clickOnTab('Pay Bills')

    await paymentPage.createPayment()
    await paymentPage.successMessage()
  })
})
