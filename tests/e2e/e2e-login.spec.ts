import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'

test.describe.only('login / logout flow', () => {
  let loginPage: LoginPage
  let homePage: HomePage

  //Before Hook
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    homePage = new HomePage(page)
    await homePage.visit()
  })

  //Negative scenario
  test('Negative scenario for login', async ({ page }) => {
    await homePage.clickSignIn()
    await loginPage.login('invalid username', 'invalid password')
    await loginPage.wait(3000)
    await loginPage.assertErrorMessage('Login and/or password are wrong.')
  })
  // Positive scenario + logout
  test('Positive scenario for login + logout', async ({ page }) => {
    await homePage.clickSignIn()
    await loginPage.login('username', 'password')

    //bypass the ssl certificate
    page.goBack() // Go back to the previous page to bypass the SSL certificate warning
    //await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')

    const accountSummaryTab = await page.locator('#account_summary_tab')
    await expect(accountSummaryTab).toBeVisible()

    await page.goto('http://zero.webappsecurity.com/logout.html')
    await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
  })
})
