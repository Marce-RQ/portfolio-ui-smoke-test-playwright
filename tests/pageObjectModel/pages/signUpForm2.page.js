export class SignUpPageForm2 {
  constructor(page) {
    this.page = page;
  }

  // LOCATORS
  // Sign Up Form 2
  headerTitle = () => this.page.getByRole('heading', { name: 'Sign Up Now' });
  phoneNumberTextBox = () => this.page.getByPlaceholder('Phone Number', { exact: true });
  birthDayContainer = () => this.page.locator('#day .react_select__control');
  birthMonthContainer = () => this.page.locator('#month .react_select__control');
  birthYearContainer = () => this.page.locator('#year .react_select__control');
  genderContainer = () => this.page.locator('#gender .react_select__control');
  currencyContainer = () => this.page.locator('#currency .react_select__control');
  preferredLanguageContainer = () => this.page.locator('#preferredLanguage .react_select__control');
  countryContainer = () => this.page.locator('#country .react_select__control');
  address1TextBox = () => this.page.getByPlaceholder('Address 1', { exact: true });
  address2TextBox = () => this.page.getByPlaceholder('Address 2', { exact: true });
  cityTextBox = () => this.page.getByPlaceholder('Town / City', { exact: true });
  zipCodeTextBox = () => this.page.getByPlaceholder('Zip / Post Code', { exact: true });
  createYourAccountButton = () => this.page.getByRole('button', { name: 'Create Your Account' });

  // ACTIONS
  async enterPhoneNumber(phone) {
    await this.phoneNumberTextBox().click();
    await this.phoneNumberTextBox().fill(phone);
  }

  async enterDateOfBirth(day, month, year) {
    await this.birthDayContainer().click();
    await this.page.keyboard.type(day.toString());
    await this.page.keyboard.press('Enter');
 
    await this.birthMonthContainer().click();
    await this.page.getByText(month, { exact: true }).click();

    await this.birthYearContainer().click();
    await this.page.getByText(year, { exact: true }).click();
  }

  async enterGender(gender) {
    await this.genderContainer().click();
    await this.page.getByText(gender, { exact: true }).click();
  }

  async enterCurrency(currency) {
    await this.currencyContainer().click();
    await this.page.getByText(currency, { exact: true }).click();
  }

  async enterPreferredLanguage(language) {
    //Options: English (preset default), Español, Français
    if (language !== 'English') {
      await this.preferredLanguageContainer().click();
      await this.page.locator('#preferredLanguage').getByText(language, { exact: true }).click();
    }
  }

  async enterCountry(country) {
    await this.countryContainer().click();
    await this.page.getByText(country, { exact: true }).click();
  }

  async enterAddress(address1, address2 = '', city, zipCode) {
    await this.address1TextBox().click();
    await this.address1TextBox().fill(address1);

    await this.address2TextBox().click();  // Address 2 is an Optional field
    await this.address2TextBox().fill(address2);

    await this.cityTextBox().click();
    await this.cityTextBox().fill(city);

    await this.zipCodeTextBox().click();
    await this.zipCodeTextBox().fill(zipCode);
  }

  async clickCreateYourAccountButton() {
    await this.createYourAccountButton().click();
  }
}
