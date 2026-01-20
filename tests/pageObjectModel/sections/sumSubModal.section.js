export class SumSubModal {
  constructor(page) {
    this.page = page;
  }
  // KYC Verification iframe
  iframeInner = () =>
    this.page
      .frameLocator('iframe[title="SumSubSDK"]') // SumSub outer iframe
      .frameLocator('iframe[src*="websdk.html"]'); // SumSub inner iframe

  // LOCATORS
  // Modal 1 - Consent to start verification
  headerTitleOne = () => this.iframeInner().getByText('Consent to start verification');
  agreeAndContinueButton = () => this.iframeInner().getByRole('button', { name: 'Agree and continue' });

  // ACTIONS
  async clickAgreeAndContinueButton() {
    await this.agreeAndContinueButton().click();
  }
}
