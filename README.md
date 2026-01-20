# Portfolio: White-Label Broker Smoke Test Suite

Automated end-to-end smoke test suite for a fintech broker platform.

This project demonstrates how I design maintainable UI test automation using **Playwright**, **Page Object Model**, and **API/DB-backed test data management** to validate critical user journeys.

## What this suite validates

- **Sign-up**: multi-step registration (includes extracting the verification link from MongoDB)
- **Login**: password + **TOTP (2FA app)** for regular and corporate users
- **KYC**: user identity verification flow and **Sumsub** integration handshake
- **Deposits**: flow to payment gateway and gateway handshake assertion
- **Internal transfers**: wallet-to-wallet transfer scenarios
- **Withdrawals**: flow to payment gateway and gateway handshake assertion
- **Logout**

## Implementation

- **Page Object Model (POM)**
- **Test data automation**
  - **Admin API helper** to set preconditions (example: resetting a user’s KYC state).
  - **MongoDB helper** to fetch the sign-up verification link (avoids flaky email/UI dependency).
- **2FA support**
  - TOTP generation via `otplib` to validate real-world auth flows.

## Tech stack

- **Playwright**
- **JavaScript**
- **MongoDB driver** (DB reads for verification link)
- **otplib** (TOTP generation)
- **@faker-js/faker** (test data generation)

## Repo navigation

- **Smoke specs**
  - `tests/specs/smoke/`
- **Page objects**
  - `tests/pageObjectModel/pages/`
- **Reusable UI sections/components**
  - `tests/pageObjectModel/sections/`
- **Helpers (API, DB, auth)**
  - `tests/helpers/adminHelper.js` (Admin API auth + KYC reset)
  - `tests/helpers/mongoHelper.js` (MongoDB user.id lookup for creation of sign-up link)
  - `tests/helpers/authenticator.js` (TOTP generation)
  - `tests/helpers/index.js` (Centralized exports)
- **Test data**
  - `tests/test-data/users.js` (Users' data for tests)
  - `tests/test-data/env.js` (Environment's data for tests)

- **CI/CD workflows**
  - `.github/workflows/playwright.yml` (Automated smoke tests)

- **Configuration**
  - `playwright.config.js`
  - `.env.example` (Environment variables template)

## Notes for reviewers

- This suite is designed as a **smoke layer**: fast feedback on critical paths rather than exhaustive coverage.
- Integrations are validated via **positive handshakes** (e.g., reaching external gateway/verification steps) to confirm connectivity without owning 3rd-party systems.

## CI/CD

- **GitHub Actions** workflow runs smoke tests on:
  - Pull requests to main/master branches
  - Pushes to main/master branches
  - Daily schedule (8:00 AM UTC)
  - Manual trigger
- **Environment**: Staging with comprehensive secret management
- **Features**:
  - Email notifications on test failures to a shared inbox by the QA-Team
  - HTML report artifacts (30-day retention)

  ## Contact

  **LinkedIn:** [Marcelo Romero](https://www.linkedin.com/in/302-romero)
