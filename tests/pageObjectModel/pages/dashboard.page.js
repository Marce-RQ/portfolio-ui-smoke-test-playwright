import { env } from '../../../test-data/env.js';

export class DashboardPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(`${env.baseUrl}/dashboard`);
  }

  //LOCATORS
  // Dashboard Actions Cards
  depositActionCard = () => this.page.getByRole('heading', { name: 'Deposit' });
  withdrawActionCard = () => this.page.getByRole('heading', { name: 'Withdraw' });
  myAccountsActionCard = () => this.page.getByRole('heading', { name: 'My Accounts' });
  transferActionCard = () => this.page.getByRole('heading', { name: 'Internal Transfer' });

  // Wallet Table
  walletContainerTitle = () => this.page.getByRole('heading', { name: 'Wallet' });
  walletTable = () => this.page.locator('div').filter({ has: this.page.getByRole('table', { name: 'Wallet' }) });

  columnHeaderWallet = () => this.walletTable().getByRole('columnheader', { name: 'Wallet' });
  columnHeaderFunds = () => this.walletTable().getByRole('columnheader', { name: 'Funds' });

  walletTableRow = () => this.walletTable().getByRole('row');

  // Specific Wallets LOCATORS - USD/EUR/GBP/BTC
  usdRow = () => this.walletTableRow().filter({ hasText: 'USD' });
  usdLabel = () => this.usdRow().getByRole('cell').nth(0);
  usdFunds = () => this.usdRow().getByRole('cell').nth(1);

  eurRow = () => this.walletTableRow().filter({ hasText: 'EUR' });
  eurLabel = () => this.eurRow().getByRole('cell').nth(0);
  eurFunds = () => this.eurRow().getByRole('cell').nth(1);

  gbpRow = () => this.walletTableRow().filter({ hasText: 'GBP' });
  gbpLabel = () => this.gbpRow().getByRole('cell').nth(0);
  gbpFunds = () => this.gbpRow().getByRole('cell').nth(1);

  btcRow = () => this.walletTableRow().filter({ hasText: 'BTC' });
  btcLabel = () => this.btcRow().getByRole('cell').nth(0);
  btcFunds = () => this.btcRow().getByRole('cell').nth(1);

  // Verification Container
  verificationContainer = () => this.page.locator('div').filter({ has: this.page.getByRole('heading', { name: 'Verification' }) });

  verificationHeader = () => this.verificationContainer().getByRole('heading', { name: 'Verification' });
  verificationDepositLabel = () => this.verificationContainer().getByText('Deposit', { exact: true });
  verificationTrackingAmount = () => this.verificationContainer().getByText(/\$\d+ of \$\d+\.\d?K/);
  daysLeftToVerifyLabel = () => this.verificationContainer().getByText('Days left to verify');
  daysLeftToVerifyValue = () => this.verificationContainer().getByText(/^\d+$/);
  verifyButton = () => this.verificationContainer().getByRole('button', { name: 'Verify' });

  // ACTIONS
  async clickDepositActionCard() {
    await this.depositActionCard().click();
  }
  async clickWithdrawActionCard() {
    await this.withdrawActionCard().click();
  }
  async clickMyAccountsActionCard() {
    await this.myAccountsActionCard().click();
  }
  async clickTransferActionCard() {
    await this.transferActionCard().click();
  }
  async clickVerifyButton() {
    await this.verifyButton().click();
  }
}
