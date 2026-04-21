import { test, expect } from '@playwright/test'

test.describe('Visual Regression Test', () => {
  test('full page snapshot', async ({ page }) => {
    await page.goto('https://www.example.com')
    const screenshot = await page.screenshot()
    expect(screenshot).toMatchSnapshot('homepage.png')
  })

  test('Single element snapshot', async ({ page }) => {
    await page.goto('https://www.example.com')
    const pageElement = await page.$('h1')
    const screenshot = await pageElement?.screenshot()
    expect(screenshot).toMatchSnapshot('heading.png')
  })
})
