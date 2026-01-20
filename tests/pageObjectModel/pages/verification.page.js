export class VerificationPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/dashboard/kyc');
  }

  // LOCATORS
  identityVerificationTitle = () => this.page.getByRole('heading', { name: 'Identity Verification' });
  startVerificationButton = () => this.page.getByRole('button', { name: 'Start' });
  countrySelectionTitle = () => this.page.getByRole('heading', { name: 'Country Selection' });
  countryContainer = () => this.page.locator('#countryCode .react_select__control');
  saveCountryButton = () => this.page.getByRole('button', { name: 'Save' });
  updateDetailsTitle = () => this.page.getByRole('heading', { name: 'Update Details to Match Document' });
  firstNameTextBox = () => this.page.getByRole('textbox', { name: 'firstName' });
  middleNameTextBox = () => this.page.getByRole('textbox', { name: 'middleName' });
  lastNameTextBox = () => this.page.getByRole('textbox', { name: 'surname' });
  confirmButton = () => this.page.getByRole('button', { name: 'Confirm' });

  // ACTIONS
  async clickStartVerificationButton() {
    await this.startVerificationButton().click();
  }

  async selectCountry(country) {
    await this.countryContainer().click();
    await this.page.getByText(country, { exact: true }).click();
  }

  async clickSaveCountryButton() {
    await this.saveCountryButton().click();
  }

  async clickConfirmButton() {
    await this.confirmButton().click();
  }
}
