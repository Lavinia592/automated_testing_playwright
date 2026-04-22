# Automated Testing with Playwright

A comprehensive end-to-end testing automation framework built with **Playwright** and **TypeScript** for testing a web-based banking application. This project demonstrates best practices for test automation including page object patterns, cross-browser testing, and visual regression testing.

---

## 📋 Project Overview

This project automates testing of a banking web application (Zero Bank Security) and includes:

- **End-to-End (E2E) Tests** - User flow testing across multiple features
- **Page Object Model (POM)** - Maintainable test structure with reusable components
- **Visual Regression Testing** - Screenshot comparison for UI consistency
- **Cross-Browser Testing** - Chromium, Firefox, and WebKit support
- **TypeScript** - Type-safe automation code

---

## 🎯 Key Features

### Test Coverage

| Feature                   | Test File                         | Description                                             |
| ------------------------- | --------------------------------- | ------------------------------------------------------- |
| **User Authentication**   | `e2e-login.spec.ts`               | Login/logout flows with positive and negative scenarios |
| **Payment Processing**    | `e2e-payment.spec.ts`             | Payment transaction workflows                           |
| **Search Functionality**  | `e2e-search.spec.ts`              | Transaction and data search capabilities                |
| **Form Submission**       | `e2e-submit-form.spec.ts`         | Feedback form submission validation                     |
| **Fund Transfers**        | `e2e-transfer-funds.spec.ts`      | Money transfer between accounts                         |
| **Currency Exchange**     | `e2e.currency-exchange.spec.ts`   | Foreign currency conversion features                    |
| **Transaction Filtering** | `e2e.filter-transactions.spec.ts` | Filter and sort transaction history                     |
| **Visual Regression**     | `visual/visual.spec.ts`           | Screenshot comparison testing                           |

### Architecture

**Page Object Model (POM) Structure:**

```
page-objects/
├── AbstractPage.ts          # Base class with common methods
├── LoginPage.ts             # Login-related interactions
├── HomePage.ts              # Home page elements and actions
├── PaymentPage.ts           # Payment processing flows
├── TransferFunds.ts         # Fund transfer interactions
├── ForeignCurrency.ts       # Currency exchange features
├── FeedbackPage.ts          # Feedback form interactions
└── components/
    └── Navbar.ts            # Shared navigation component
```

---

## 🛠️ Technology Stack

- **Framework**: [Playwright](https://playwright.dev/) v1.58.0
- **Language**: TypeScript
- **Test Runner**: Playwright Test
- **Code Formatter**: Prettier
- **Browsers**: Chromium, Firefox, WebKit

---

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd automated_testing_playwright
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

---

## 🚀 Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests by Browser

**Chrome/Chromium:**

```bash
npm run tests:chrome
```

**Firefox:**

```bash
npm run tests:firefox
```

**WebKit:**

```bash
npm run tests:webkit
```

**E2E Tests Only:**

```bash
npm run tests:e2e
```

### Run Specific Test File

```bash
npx playwright test tests/e2e/e2e-login.spec.ts
```

### Run Tests in Debug Mode

```bash
npx playwright test --debug
```

### Run Tests with UI Mode

```bash
npx playwright test --ui
```

### Generate Test Report

```bash
npx playwright show-report
```

---

## ⚙️ Configuration

### Playwright Configuration (`playwright.config.ts`)

- **Timeout**: 60 seconds per test
- **Retries**: Disabled for clean test runs
- **Viewport**: 1280x720
- **Action Timeout**: 15 seconds
- **Video**: Retained on test failure
- **Screenshots**: Captured only on test failure

### E2E Configuration (`e2e.config.ts`)

Separate configuration for E2E test runs with project-specific settings.

---

## 📁 Project Structure

```
automated_testing_playwright/
├── tests/
│   ├── e2e/                    # End-to-end test suites
│   │   ├── e2e-login.spec.ts
│   │   ├── e2e-payment.spec.ts
│   │   ├── e2e-search.spec.ts
│   │   ├── e2e-submit-form.spec.ts
│   │   ├── e2e-transfer-funds.spec.ts
│   │   ├── e2e.currency-exchange.spec.ts
│   │   └── e2e.filter-transactions.spec.ts
│   └── visual/                 # Visual regression tests
│       ├── visual.spec.ts
│       └── visual.spec.ts-snapshots/
├── page-objects/               # Page Object Model classes
│   ├── AbstractPage.ts
│   ├── LoginPage.ts
│   ├── HomePage.ts
│   ├── PaymentPage.ts
│   ├── TransferFunds.ts
│   ├── ForeignCurrency.ts
│   ├── FeedbackPage.ts
│   └── components/
│       └── Navbar.ts
├── test-results/               # Test execution results
├── helpers.ts                  # Utility helper functions
├── playwright.config.ts        # Main test configuration
├── e2e.config.ts              # E2E-specific configuration
├── visual.config.ts           # Visual testing configuration
├── package.json
└── README.md
```

---

## 🧪 Test Examples

### Login Test Pattern

```typescript
test('Positive scenario for login + logout', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const homePage = new HomePage(page)

  await homePage.visit()
  await homePage.clickSignIn()
  await loginPage.login('username', 'password')
  await loginPage.assertLoginSuccess()
})
```

### Page Object Pattern

```typescript
export class LoginPage extends AbstractPage {
  async login(username: string, password: string) {
    // Page-specific interactions
  }

  async assertErrorMessage(message: string) {
    // Assertion logic
  }
}
```

---

## 📊 Test Results & Reports

- **Screenshots**: Captured on test failure in `test-results/`
- **Videos**: Recorded on test failure
- **HTML Report**: Generated after test runs
- **Visual Snapshots**: Stored in `visual.spec.ts-snapshots/`

---

## 🔍 Key Concepts Used

### Page Object Model (POM)

- Encapsulates page elements and interactions
- Improves test maintainability and readability
- Reduces code duplication

### Base Page Class

- `AbstractPage.ts` provides common functionality
- All page objects extend this base class
- Shared utility methods like `wait()`

### Cross-Browser Testing

- Tests run across Chromium, Firefox, and WebKit
- Ensures consistent behavior across browsers

### Visual Regression Testing

- Screenshot-based testing for UI consistency
- Snapshots stored for comparison

---

## 💡 Best Practices Implemented

✅ **Type Safety** - Full TypeScript support  
✅ **DRY Principle** - Reusable page objects and helpers  
✅ **Clear Naming** - Descriptive test and method names  
✅ **Assertions** - Explicit and meaningful assertions  
✅ **Test Organization** - Logical folder structure  
✅ **Configuration Management** - Separate configs for different scenarios  
✅ **Error Handling** - Proper timeout and retry mechanisms

---

## 🐛 Troubleshooting

### Tests Fail Due to SSL Certificate

The project handles SSL bypass scenarios:

```typescript
page.goBack() // Bypasses SSL certificate warning
```

### Headless Mode

To run tests in headed mode (see the browser):

```bash
npx playwright test --headed
```

### Clear Test Cache

```bash
rm -r test-results/ # macOS/Linux
rmdir /s test-results # Windows
```

---

## 📝 Notes

- **Application Under Test (AUT)**: Zero Bank Security (http://zero.webappsecurity.com)
- **Test Data**: Uses dummy credentials for negative/positive scenarios
- **Screenshots**: Available in `visual.spec.ts-snapshots/` folder

---

## 🚀 Future Enhancements

- [ ] Add API testing alongside E2E tests
- [ ] Implement custom reporters
- [ ] Add performance testing
- [ ] Integrate with CI/CD pipeline
- [ ] Add accessibility testing
- [ ] Expand visual regression coverage

---

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Zero Bank Security App](http://zero.webappsecurity.com)

---

## � Recent Changes

### Version 1.0.0 - Initial Release

- ✨ Initial project setup with Playwright framework
- 🧪 Created 8 comprehensive E2E test suites
- 📄 Implemented Page Object Model (POM) architecture
- 🎨 Added visual regression testing
- 🌐 Cross-browser testing support (Chromium, Firefox, WebKit)
- � Screenshot and video capture on test failure
- 📊 Test reporting and HTML reports
- 🛠️ Configured TypeScript for type-safe testing
- ⚙️ Created separate configurations for E2E and visual tests

---

**Happy Testing! 🎭**
