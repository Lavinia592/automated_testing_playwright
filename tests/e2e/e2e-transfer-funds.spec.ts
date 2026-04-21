import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { TransferFunds } from '../../page-objects/TransferFunds'

test.describe('transfer funds and make payments', () => {
  let homePage: HomePage
  let loginPage: LoginPage
  let transferFunds: TransferFunds

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    transferFunds = new TransferFunds(page)

    await homePage.visit()
    await homePage.clickSignIn()
    await loginPage.login('username', 'password')
  })

  test('transfer funds', async ({ page }) => {
    //bypass ssl ceritificate using page.goBack() method
    await page.goBack()

    await page.click('#transfer_funds_link')
    await transferFunds.transferFunds()
    await transferFunds.verifyTransfer()
  })
})
