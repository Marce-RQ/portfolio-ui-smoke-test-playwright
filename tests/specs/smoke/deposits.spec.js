import { test, expect } from '@playwright/test';
import { paymentUser } from '../../../test-data/users.js';
import { LoginPage, Verify2FAPage, DashboardPage, DepositsPage } from '../../../pageObjectModel/pages/index.js';
import { getOtpfromAPP } from '../../../helpers/index.js';
import dotenv from 'dotenv';
dotenv.config();

test('Deposit flow and Payment Gateway handshake', async ({ page }) => {
  
  const loginPage = new LoginPage(page);
  const verify2FAPage = new Verify2FAPage(page);
  const dashboardPage = new DashboardPage(page);
  const depositPage = new DepositsPage(page);
  let otp;

  
  await loginPage.goto();
  await loginPage.enterUserCredentials(paymentUser.deposit.email, paymentUser.deposit.password);
  await loginPage.clickLoginButton();
  otp = getOtpfromAPP(paymentUser.deposit);
  await verify2FAPage.enterOTP(otp);

  await dashboardPage.clickDepositActionCard();
  await depositPage.clickDepositTypeDropdown();
  await depositPage.selectBitcoinCurrency();
  await depositPage.clickSelectWalletDropdown();
  await depositPage.selectUsdWallet();
  await depositPage.selectAmount();
  await depositPage.enterAmount();
  await depositPage.goToPaymentButton().click();

  // Assert: Payment Gateway connection
  await depositPage.gatewayBitcoinPaymentTitle().waitFor({ state: 'visible' });
  await expect(depositPage.gatewayBitcoinPaymentTitle()).toContainText('Crypto Deposit - Bitcoin');
  await expect(page).toHaveURL(/.*payments-gateway.*/);
});
