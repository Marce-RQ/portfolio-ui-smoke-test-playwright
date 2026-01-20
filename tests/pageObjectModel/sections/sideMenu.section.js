export class SideMenuSection {
  constructor(page) {
    this.page = page;
  }

  // LOCATORS
  // Items on permanent side menu
  brokerLogo = () => this.page.getByRole('img', { name: 'crm-c1-b1 Logo' });
  dashboardButton = () => this.page.getByRole('complementary').getByRole('link', { name: 'Dashboard' });
  myAccountsButton = () => this.page.getByRole('complementary').getByRole('link', { name: 'My Accounts' });
  depositButton = () => this.page.getByRole('complementary').getByRole('link', { name: 'Deposits' });
  internalTransferButton = () => this.page.getByRole('complementary').getByRole('link', { name: 'Internal Transfer' });
  withdrawButton = () => this.page.getByRole('complementary').getByRole('link', { name: 'Withdraw' });
  affiliatesButton = () => this.page.getByRole('complementary').getByRole('link', { name: 'Affiliates' });
  verificationButton = () => this.page.getByRole('complementary').getByRole('link', { name: 'Verification' });
  notificationsButton = () => this.page.getByRole('complementary').getByRole('link', { name: 'Notifications' });
  legalDocumentsButton = () => this.page.getByRole('complementary').getByRole('link', { name: 'Legal Documents' });
  getFundedButton = () => this.page.getByRole('complementary').getByRole('link', { name: 'Get Funded' });
  settingsButton = () => this.page.getByRole('complementary').getByRole('link', { name: 'Settings' });
  logoutButton = () => this.page.getByRole('complementary').getByRole('link', { name: 'Logout' });

  // ACTIONS
  async clickDashboardButton() {
    await this.dashboardButton().click();
  }

  async clickMyAccountsButton() {
    await this.myAccountsButton().click();
  }

  async clickDepositButton() {
    await this.depositButton().click();
  }

  async clickInternalTransferButton() {
    await this.internalTransferButton().click();
  }

  async clickWithdrawButton() {
    await this.withdrawButton().click();
  }

  async clickAffiliatesButton() {
    await this.affiliatesButton().click();
  }

  async clickVerificationButton() {
    await this.verificationButton().click();
  }

  async clickNotificationsButton() {
    await this.notificationsButton().click();
  }

  async clickLegalDocumentsButton() {
    await this.legalDocumentsButton().click();
  }

  async clickGetFundedButton() {
    await this.getFundedButton().click();
  }

  async clickSettingsButton() {
    await this.settingsButton().click();
  }

  async clickLogoutButton() {
    await this.logoutButton().click();
  }
}
