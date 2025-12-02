# UI Automation Framework — Playwright-BDD + TypeScript

## Overview

This project is a UI automation framework built with:

- **Playwright-BDD** (BDD style for Playwright)
- **Playwright**
- **TypeScript**
- **Page Object Model (POM)**

The framework supports:

- Clean Page Object architecture
- Test execution using tags (`@homePage_UI`, `@validation`, etc.)
- Environment configuration via `.env`
- Custom fixtures with Playwright hooks
- BDD scenarios with Given/When/Then steps

---

## Table of Contents

1. Setup
2. Project Structure
3. Environment Configuration
4. Running Tests
5. Tags
6. Best Practices
7. Example Test Case

---

## 1. Setup

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npm install @playwright/test
```

Install Playwright-BDD:

```bash
npm i -D @playwright/test playwright-bdd
---


```

Main components:

- **BasePage** — navigation and `open()` logic
- **BaseComponent** — internal UI components
- **Page Objects** — pages + components
- **Fixtures (`fixtures.ts`)** — custom `test` and BDD steps (Given/When/Then)
- **Step Definitions** — separate files per feature, import `Given/Then` from `fixtures.ts`

---

## 3. Environment Configuration

All environment variables are stored in `.env`.

Example:

```

ENV=dev

```

Variables can also be passed through CLI:

```bash
cross-env ENV=prod npx playwright test
```

---

## 4. Running Tests

Run all tests:

```bash
npx playwright test
```

Run tests in **UI mode**:

```bash
npx playwright test --ui
```

Run specific tagged tests using `grep`:

```bash
npx cross-env ENV=prod npx playwright test --grep @validation
npx cross-env ENV=prod npx playwright test --grep @homePage_UI
```

### Recommended `package.json` scripts

```json
{
  "scripts": {
    "test": "npx playwright test",
    "test:ui": "npx playwright test --ui",
    "test:validation": "cross-env ENV=prod npx playwright test --grep @validation",
    "test:homePage": "cross-env ENV=prod npx playwright test --grep @homePage_UI"
  }
}
```

---

## 5. Tags

Example in feature file:

```gherkin
@homePage_UI @validation
Scenario: Verify the FAQ section header and description
```

Run tests by tag:

```bash
npm run test:validation
```

---

## 6. Best Practices

- Use **Page Object Model (POM)** for all pages and components
- Split large pages into reusable components
- Do not place locators inside step files
- Keep step definitions minimal and reusable
- Use tags for grouping test types
- Store secrets and URLs in `.env`

---

## 7. Example Test Case (BDD)

### Feature: FAQ Section

```gherkin
@homePage_UI @validation
Scenario: Verify FAQ section content
  Given I visit the homepage
  Then I should see the FAQ section with the header "Frequently Asked Questions"
  And I should see the description containing "Have any questions or doubts about choosing the right pair of glasses"
```

### Breakdown

| Step              | Action                     | Expected Result                                 |
| ----------------- | -------------------------- | ----------------------------------------------- |
| Visit homepage    | Executes `HomePage.open()` | Homepage is loaded                              |
| Check header      | Validates header text      | `FaqSection.header` contains expected text      |
| Check description | Validates description text | `FaqSection.description` contains expected text |
