export class LetsGetYouVerifiedSection {
  constructor(page) {
    this.page = page;
  }

  // Modal Container appearing right after login (non-verified users)
  modal = () => this.page.locator('.ReactModal__Overlay--after-open');

  // LOCATORS
  headerTitle = () => this.modal().getByRole('heading', { name: 'Important Customer Notification' });
  closeButton = () => this.modal().getByRole('button', { name: 'Close' });
  bodyTitle = () => this.modal().getByRole('heading', { name: "Let's Get You Verified" });
  readMoreLink = () => this.modal().getByRole('link', { name: 'Read More' });
  verifyMyIdentityButton = () => this.modal().getByRole('button', { name: 'Verify My Identity' });

  // ACTIONS
  async waitForVisible() {
    await this.modal().waitFor({ state: 'visible', timeout: 10000 });
  }

  async closeModal() {
    await this.waitForVisible();
    await this.closeButton().click();
    await this.modal().waitFor({ state: 'hidden' });
  }

  async clickReadMore() {
    await this.waitForVisible();
    await this.readMoreLink().click();
  }

  async clickVerifyMyIdentity() {
    await this.waitForVisible();
    await this.verifyMyIdentityButton().click();
    await this.modal().waitFor({ state: 'hidden' });
  }
}
