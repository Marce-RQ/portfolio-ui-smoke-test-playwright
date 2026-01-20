export class Verify2FAPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(`${env.baseUrl}/verify-2fa`);
  }

  //LOCATORS
  // OTP form
  headerTitle = () => this.page.getByRole('heading', { name: /Enter the OTP/i });
  otpTextbox = () => this.page.getByTestId('OTPInput');
  submitButton = () => this.page.getByRole('button', { name: 'Submit' });

  // ACTIONS
  async enterOTP(otp) {
    await this.otpTextbox().waitFor({ state: 'visible' });
    await this.otpTextbox().fill(otp);
  }

  async clickSubmitButton() {
    await this.submitButton().click();
  }
}
