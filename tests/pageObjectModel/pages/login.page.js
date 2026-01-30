import { env } from '../../../test-data/env.js';

export class LoginPage {
  constructor(page) {
    this.page = page;
  }

  //LOCATORS
  // Login Form
  headerTitle = () => this.page.getByRole('heading', { name: 'Log In to Your Account' });
  emailAddressTextBox = () => this.page.getByPlaceholder('Email Address');
  passwordTextBox = () => this.page.getByPlaceholder('password');
  loginButton = () => this.page.getByRole('button', { name: 'Login' });

  // Additional Links
  signUpLink = () => this.page.getByRole('link', { name: 'Sign Up' });
  signInWithGoogleButton = () => this.page.frameLocator('iframe[id="gsi_471314_773376"]');
  forgotPasswordLink = () => this.page.getByRole('link', { name: 'Reset Password' });
  verifyEmailLink = () => this.page.getByRole('link', { name: 'Verify Email' });

  // ACTIONS
  async goto() {
    await this.page.goto(`${env.baseUrl}/login`);
  }

  async enterUserCredentials(userEmail, userPassword) {
    await this.emailAddressTextBox().click();
    await this.emailAddressTextBox().fill(userEmail);

    await this.passwordTextBox().click();
    await this.passwordTextBox().fill(userPassword);
  }

  async clickLoginButton() {
    await this.loginButton().click();
  }

  async clickSignUpLink() {
    await this.signUpLink().click();
  }

  async clickVerifyEmail() {
    await this.verifyEmailLink().click();
  }
}
