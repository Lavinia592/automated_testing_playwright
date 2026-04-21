import { expect, Locator, Page } from '@playwright/test'

export class TransferFunds {
  readonly page: Page
  readonly fromAccountSelectBox: Locator
  readonly toAccountSelectBox: Locator
  readonly amountInput: Locator
  readonly descriptionInput: Locator
  readonly submitButton: Locator
  readonly boardHeader: Locator
  readonly message: Locator

  constructor(page: Page) {
    this.page = page
    this.fromAccountSelectBox = page.locator('#tf_fromAccountId')
    this.toAccountSelectBox = page.locator('#tf_toAccountId')
    this.amountInput = page.locator('#tf_amount')
    this.descriptionInput = page.locator('#tf_description')
    this.submitButton = page.locator('#btn_submit')
    this.boardHeader = page.locator('h2.board-header')
    this.message = page.locator('.alert-success')
  }

  async transferFunds() {
    await this.fromAccountSelectBox.selectOption('2')
    await this.toAccountSelectBox.selectOption('3')
    await this.amountInput.fill('500')
    await this.descriptionInput.fill('Test message')
    await this.submitButton.click()
  }

  async verifyTransfer() {
    await expect(this.boardHeader).toContainText('Verify')
    await this.submitButton.click()
    await expect(this.message).toContainText(
      'You successfully submitted your transaction',
    )
  }
}
