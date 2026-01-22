import { env } from '../../../test-data/env.js';

export class DepositsPage {
  constructor(page) {
    this.page = page;
    }

  async goto() {
    await this.page.goto(`${env.baseUrl}/deposits`);
  }

  // LOCATORS
  // Deposit Form
  headerTitle = () => this.page.getByRole('heading', { name: 'Deposits', exact: true });
  depositTypeDropdown = () => this.page.getByText('Select...', { exact: true });
  bitcoinCurrencyOption = () => this.page.getByText('Bitcoin (BTC)', { exact: true }).first();
  selectWalletDropdown = () => this.page.locator('#wallet').getByText('Select a Wallet', { exact: true });
  usdWallet = () => this.page.locator('.react_select__menu').getByText(/USD -/i);
  usdAmountTextBox = () => this.page.getByRole('textbox', { name: 'Amount in USD $', exact: true });
  goToPaymentButton = () => this.page.getByRole('button', { name: 'Go to Payment', exact: true });
  // Gateway Payment Page
  gatewayLinkGoBackToDepositsPage = () => this.page.getByRole('link', { name: /Go Back to Deposits Page/i });
  gatewayBitcoinPaymentTitle = () => this.page.getByRole('heading', { name: /Crypto Deposit - Bitcoin/i });

  // ACTIONS
  async clickDepositTypeDropdown() {
    await this.depositTypeDropdown().click();
  }

  async selectBitcoinCurrency() {
    await this.bitcoinCurrencyOption().waitFor({ state: 'visible' });
    await this.bitcoinCurrencyOption().click();
  }
  async clickSelectWalletDropdown() {
    await this.selectWalletDropdown().click();
  }
  async selectUsdWallet() {
    await this.usdWallet().waitFor({ state: 'visible' }); 
    await this.usdWallet().click();
  }

  async selectAmount() {
    await this.usdAmountTextBox().click();
  }

  async enterAmount(amount) {
    await this.usdAmountTextBox().click();
    await this.usdAmountTextBox().fill(amount);
  }

  async clickGoToPayment() {
    await this.goToPaymentButton().click();
  }

  async goBackToDepositsPage() {
    await this.gatewayLinkGoBackToDepositsPage().click();
  }
}
