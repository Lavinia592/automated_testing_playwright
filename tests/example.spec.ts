import { test, expect } from '@playwright/test'
import { loadHomepage, assertTitle } from '../helpers'

test('Simple basic test', async ({ page }) => {
  ///Here goes the test code
  await page.goto('https://www.example.com')
  const pageTitle = await page.locator('h1')
  await expect(pageTitle).toContainText('Example Domain')
})

test('Click on elements', async ({ page }) => {
  await page.goto('http://zero.webappsecurity.com/')
  await page.click('#signin_button')
  await page.click('text=Sign in')

  const errorMessage = await page.locator('.alert-error')
  await expect(errorMessage).toContainText('Login and/or password are wrong')
})

test('Selectors', async ({ page }) => {
  //text
  await page.click('text=some text')

  //css selectors (id, class, button)
  await page.click('button')
  await page.click('#id')
  await page.click('.class')

  //only visible Css selector
  await page.click('.submit-button:visible')

  // Combinations
  await page.click('#username .first')

  //xpath
  await page.click('//button')
})

test.describe('My first test suite', () => {
  test('Working with inputs', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/')
    await page.click('#signin_button')

    await page.fill('#user_login', 'some username')
    await page.fill('#user_password', 'some password')
    await page.click('text=Sign in')
    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong')
  })

  test('Assertions @myTag', async ({ page }) => {
    await page.goto('https://www.example.com')
    await expect(page).toHaveURL('https://www.example.com')
    await expect(page).toHaveTitle('Example Domain')

    const element = await page.locator('h1')
    await expect(element).toBeVisible()
    await expect(element).toHaveText('Example Domain')
    await expect(element).toHaveCount(1)

    const nonExistingElement = await page.locator('h5')
    await expect(nonExistingElement).not.toBeVisible()
  })
})

test.describe.parallel.only('Hooks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.example.com')
  })

  test('Screenshots', async ({ page }) => {
    //1. step is load website
    // await page.goto('https://www.example.com')

    //2. take screenshot of full page
    await page.screenshot({ path: 'screenshot.png', fullPage: true })
  })

  test('single element screenshots', async ({ page }) => {
    // await page.goto('https://www.example.com')

    const element = await page.locator('h1')
    await element.screenshot({ path: 'single_element_screenshot.png' })
  })
})

test('Custom helpers', async ({ page }) => {
  await loadHomepage(page)
  // await page.pause()
  await assertTitle(page)
})
