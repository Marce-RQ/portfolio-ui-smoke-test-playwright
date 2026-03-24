import { test, expect } from '../../fixtures/auth.fixture.js';
import { logoutUser } from '../../test-data/users.js';
import dotenv from 'dotenv';
dotenv.config();

test('Logout successful', async ({ pageObjects, performLogin, page }) => {

  await performLogin(logoutUser);  
  expect(page).toHaveURL(/.*dashboard.*/);

  await pageObjects.headerSection.clickLogoutButton();
  await expect(page).toHaveURL(/.*login.*/);
  await expect(page.getByRole('heading', { name: 'Log In to Your Account' })).toBeVisible();

})