import { test, expect } from '../../fixtures/auth.fixture.js';
import { paymentUser } from '../../test-data/users.js';
import { TransfersPage } from '../../pageObjectModel/pages/index.js';
import dotenv from 'dotenv';
dotenv.config();

test('wallet to wallet transfer (USD to EUR)', async ({ pageObjects, performLogin, page }) => {
  const transferPage = new TransfersPage(page);
  const amount = '1';

  await performLogin(paymentUser.transfers);

  // USD Wallet to EUR Wallet Transfer flow
  await pageObjects.dashboardPage.transferActionCard().waitFor({ state: 'visible' });
  await pageObjects.dashboardPage.clickTransferActionCard();
  await transferPage.clickTransferTypeDropdown();
  await transferPage.selectWalletToWalletOption();
  await transferPage.clickTransferFromDropdown();
  await transferPage.selectUsdWalletOption();
  await transferPage.clickTransferToDropdown();
  await transferPage.selectEurWalletOption();
  await transferPage.amountToTransferInput().click();
  await transferPage.amountToTransferInput().fill(amount);
  await transferPage.requestTransferButton().click();

  // Transfer and Exchange Rate confirmation (rate given by TradrAPI)
  await transferPage.transferConfirmationHeader().waitFor({ state: 'visible' });
  await expect(transferPage.transferConfirmationHeader()).toHaveText('Transfer Confirmation');
  await transferPage.transferConfirmationParagraph().waitFor({ state: 'visible' });
  await expect(transferPage.transferConfirmationParagraph()).toContainText(
    /Send \$\d+(?:\.\d+)? from your USD wallet and get €(?!0(?:\.0+)?$)[\d.]+(?!\d) in your EUR wallet/,
  ); //Regex to match any amount of euro received, greater than 0
  await transferPage.clickTransferButton();

  await transferPage.confirmationMessage().waitFor({ state: 'visible' });
  await expect(transferPage.confirmationMessage()).toContainText('Transfer completed!');
});
