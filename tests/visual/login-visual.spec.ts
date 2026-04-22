import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe('Login Page Visual Tests', () => {
  let homePage: HomePage
  let loginPage: LoginPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)

    await homePage.visit()
    await homePage.clickSignIn()
  })

  test('Login Form', async () => {
    await loginPage.snapshotLoginForm()
  })

  test('Error Message', async () => {
    await loginPage.login('Fail', 'some invalid password')
    await loginPage.snapshotErrorMessage()
  })
})
