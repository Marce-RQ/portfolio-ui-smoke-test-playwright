import { test, expect } from '../../fixtures/auth.fixture.js';
import { verificationUser } from '../../test-data/users.js';
import { VerificationPage } from '../../pageObjectModel/pages/index.js';
import { SumSubModal, LetsGetYouVerifiedSection } from '../../pageObjectModel/sections/index.js';
import { resetKycUser } from '../../helpers/index.js';
import dotenv from 'dotenv';
dotenv.config();

test('KYC user flow - SumSub hand-shake', async ({ performLogin, page }) => {
  const letsGetYouVerifiedSection = new LetsGetYouVerifiedSection(page);
  const verificationPage = new VerificationPage(page);
  const sumSubModal = new SumSubModal(page);

  // Preparing user to NOT_VERIFIED state
  await resetKycUser(verificationUser.kyc.userId);

  await performLogin(verificationUser.kyc);

  // CRM Modal Flow
  await letsGetYouVerifiedSection.waitForVisible();
  await expect(letsGetYouVerifiedSection.bodyTitle()).toHaveText("Let's Get You Verified");

  await letsGetYouVerifiedSection.clickVerifyMyIdentity();
  await expect(verificationPage.identityVerificationTitle()).toHaveText('Identity Verification');

  await verificationPage.clickStartVerificationButton();
  await expect(verificationPage.countrySelectionTitle()).toHaveText('Country Selection');

  await verificationPage.selectCountry(verificationUser.kyc.country);
  await verificationPage.clickSaveCountryButton();
  await expect(verificationPage.updateDetailsTitle()).toHaveText('Update Details to Match Document');
  await verificationPage.clickConfirmButton();

  // SumSub Integration Hand-shake
  await sumSubModal.headerTitleOne().waitFor({ state: 'visible' });
  await expect(sumSubModal.headerTitleOne()).toHaveText('Consent to start verification');
});
