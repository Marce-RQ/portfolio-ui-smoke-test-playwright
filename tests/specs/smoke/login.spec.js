import { test, expect } from '@playwright/test';
import { LoginPage, Verify2FAPage } from '../../../pageObjectModel/pages/index.js'; // Ensure DashboardPage is not imported here
import { HeaderSection } from '../../../pageObjectModel/sections/index.js'; // No DashboardPage import here
import { loginUser } from '../../../test-data/users.js';
import { getOtpfromAPP } from '../../../helpers/index.js';
import dotenv from 'dotenv';
dotenv.config();

test.describe('Login Tests', () => {
  let loginPage, verify2FAPage, headerSection;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    verify2FAPage = new Verify2FAPage(page);
    headerSection = new HeaderSection(page);

    await loginPage.goto();
  });

  // REGULAR USER
  test('Regular User Login, using password and 2FA-APP', async ({ page }) => {
    
    let otp;

    // Act
    await loginPage.enterUserCredentials(loginUser.regular.email, loginUser.regular.password);
    await loginPage.clickLoginButton();
    otp = getOtpfromAPP(loginUser.regular);
    await verify2FAPage.enterOTP(otp);

    // Assert

    await headerSection.userGreeting().waitFor({ state: 'visible' });
    await expect(headerSection.userGreeting()).toHaveText(`Hey, ${loginUser.regular.name}`);
    await expect(page).toHaveURL(/.*dashboard.*/);
  });

  // CORPORATE USER           
  test('Corporate User Login, using password and 2FA-APP', async ({ page }) => {
    
    let otp;

    // Act
    await loginPage.enterUserCredentials(loginUser.corporate.email, loginUser.corporate.password);
    await loginPage.clickLoginButton();
    otp = getOtpfromAPP(loginUser.corporate);
    await verify2FAPage.enterOTP(otp);

    // Assert
    await expect(headerSection.userGreeting()).toBeVisible();
    await expect(headerSection.userGreeting()).toHaveText(`Hey, ${loginUser.corporate.name}`);

    
    await expect(page).toHaveURL(/.*dashboard.*/);
  });
});
