export class HeaderSection {
  constructor(page) {
    this.page = page;
  }

  // LOCATORS
  walletBalance = () => this.page.locator('header').getByText('$');
  depositButton = () => this.page.locator('header').getByRole('button', { name: 'Deposit' });
  bellIcon = () => this.page.locator('header a[href="/dashboard/notifications"]');
  userGreeting = () => this.page.getByText('Hey, ');
  logoutButton = () => this.page.locator('header a[href="/logout"]');

  // ACTIONS
  async clickLogoutButton() {
    await this.logoutButton().click();
  }

  async getWalletBalance() {
    return this.walletBalance().textContent();
  }

  async clickDepositButton() {
    await this.depositButton().click();
  }

  async clickBellIcon() {
    await this.bellIcon().click();
  }
}
