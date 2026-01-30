import { env } from '../../../test-data/env.js';
import { getSignUpLinkFromMongo } from '../../../helpers/index.js';

export class SignUpPageForm1 {
  constructor(page) {
    this.page = page;
  }

  //LOCATORS
  // Sign Up Form 1
  headerTitle = () => this.page.getByRole('heading', { name: 'Sign Up Now' });
  signUpWithGoogleButton = () => this.page.frameLocator('iframe[id="gsi_471314_773376"]');

  firstNameTextBox = () => this.page.getByPlaceholder('First Name');
  middleNameTextBox = () => this.page.getByPlaceholder('Middle Name (Optional)');
  lastNameTextBox = () => this.page.getByPlaceholder('Last Name');
  emailAddressTextBox = () => this.page.getByPlaceholder('Email Address');
  passwordTextBox = () => this.page.getByPlaceholder('Password');
  seePasswordButton = () => this.page.locator(`.css-xd5lea.css-1eamic5.ex0cdmw0[viewBox='0 0 16 16'][height='16']`);
  termsCheckbox = () => this.page.locator('[data-testid="CheckBoxLabel"]');

  signUpButton = () => this.page.getByRole('button', { name: 'Sign Up' });

  // Other Links
  sigUpBusinessAccountLink = () => this.page.getByRole('link', { name: 'Sign Up' });

  // Confirmation & Error Messages
  emailSentConfirmationMessage = () => this.page.locator('form').filter({ hasText: 'An email has been sent to' });
  resendEmailButton = () => this.page.getByRole('button', { name: 'Resend Email' });
  emailExistsErrorMessage = () => this.page.getByText('This email address already');

  // ACTIONS
   async goto() {
    await this.page.goto(`${env.baseUrl}/signup`);
  }

  async enterNewUserDetails(firstName, middleName = '', lastName, emailAddress, password) {
    await this.firstNameTextBox().click();
    await this.firstNameTextBox().fill(firstName);

    await this.middleNameTextBox().click();
    await this.middleNameTextBox().fill(middleName); // Middle Name is an Optional field

    await this.lastNameTextBox().click();
    await this.lastNameTextBox().fill(lastName);

    await this.emailAddressTextBox().click();
    await this.emailAddressTextBox().fill(emailAddress);

    await this.passwordTextBox().click();
    await this.passwordTextBox().fill(password);
  }

  async checkTermsCheckbox() {
    await this.termsCheckbox().click();
  }

  async clickSignUpButton() {
    await this.signUpButton().click();
  }

  async waitForConfirmationAndGetVerificationLink(userEmail) {
    // Wait for either success or error message
    await Promise.race([
      this.emailSentConfirmationMessage()
        .waitFor({ state: 'visible' })
        .catch(() => {}),
      this.emailExistsErrorMessage()
        .waitFor({ state: 'visible' })
        .catch(() => {}),
    ]);

    // Fetch the verification code from MongoDB regardless of which message appears
    const signUpLink = await getSignUpLinkFromMongo(userEmail);
    return signUpLink;
  }
}
