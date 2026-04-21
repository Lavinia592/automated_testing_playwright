import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { FeedbackPage } from '../../page-objects/FeedbackPage'

test.describe('Feedback form', () => {
  let homePage: HomePage
  let feedbackPage: FeedbackPage
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    feedbackPage = new FeedbackPage(page)
    await homePage.visit()
    await homePage.clickFeedback()
  })

  //Reset feedback fform
  test('reset feedback form', async ({ page }) => {
    await feedbackPage.fillForm(
      'name',
      'email',
      'subject',
      'my awesome message',
    )
    await feedbackPage.clearForm()
    await feedbackPage.assertClearedForm()
  })

  //Submit feedback form
  test('submit feedback form', async ({ page }) => {
    await feedbackPage.fillForm(
      'name',
      'email',
      'subject',
      'my awesome message',
    )
    await feedbackPage.submitForm()
    await feedbackPage.assertSubmittedForm()
  })
})
