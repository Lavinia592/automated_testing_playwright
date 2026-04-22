import { expect, Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class LoginPage extends AbstractPage {
  //Define Selectors
  //readonly page: Page
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator
  readonly errorMessage: Locator
  readonly loginForm: Locator

  //Init selectors using constructor
  constructor(page: Page) {
    //this.page = page
    super(page) // Call the constructor of the AbstractPage to initialize the page property
    this.usernameInput = page.locator('#user_login')
    this.passwordInput = page.locator('#user_password')
    this.submitButton = page.locator('text=Sign in')
    this.errorMessage = page.locator('.alert-error')
    this.loginForm = page.locator('#login_form')
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
    await this.submitButton.click()
  }

  //assert error message
  async assertErrorMessage(expectedMessage: string) {
    await expect(this.errorMessage).toHaveText(
      'Login and/or password are wrong.',
    )
  }

  async snapshotLoginForm() {
    await expect(this.loginForm).toHaveScreenshot('login-form.png')
  }

  async snapshotErrorMessage() {
    await expect(this.errorMessage).toHaveScreenshot('login-error.png')
  }
}
