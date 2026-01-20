import { request } from '@playwright/test';
import { getOtpfromAPP } from './authenticator.js';
import { env } from '../test-data/env.js';
import { adminUser } from '../test-data/users.js';
import dotenv from 'dotenv';
dotenv.config();

// Admin API Helper Class
export class AdminApi {
  constructor() {
    this.baseURL = env.apiUrl;
    this.apiContext = null;
    this.token = null;
  }
  // Initialize API context and authenticate admin user
    async init() {
      this.apiContext = await request.newContext({
        baseURL: this.baseURL,
      });
      this.token = await this.getAdminUserToken();
    }

  // Generate Admin Access Token
  async getAdminUserToken() {
    const adminConfig = {
      totpSecret: process.env.TOTP_SECRET_ADMIN_USER,
    };
    const otp = getOtpfromAPP(adminConfig);

    const response = await this.apiContext.post('/authentication', {
      data: {
        email: adminUser.email,
        password: process.env.ADMIN_PASSWORD,
        recaptcha: process.env.ADMIN_RECAPTCHA,
        totp: otp,
      },
    });
    if (!response.ok()) {
      throw new Error(`Admin authentication failed: ${response.status()}`);
    }
    const json = await response.json();
    return json.token || json.accessToken;
  }

  // Set KYC User to NOT_VERIFIED state
  async resetKycUser(userId) {
    if (!this.token) {
      throw new Error('AdminApi not initialized. Call init() first.');
    }

    const res = await this.apiContext.post(`/admin/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      data: {
        kyc: 'NOT_VERIFIED',
        status: 'APPROVED',
        roles: ['_u_._normal_'],
      },
    });

    if (!res.ok()) {
      throw new Error(`Failed to reset user: ${res.status()}`);
    }

    return await res.json();
  }

  async dispose() {
    if (this.apiContext) {
      await this.apiContext.dispose();
    }
  }
}

/** STAND ALONE FUNCTION
 * resetKycUser - Helper function to reset a user's KYC status to NOT_VERIFIED
 * Handles complete lifecycle: initialization, reset, and cleanup
 */
export async function resetKycUser(userId) {
  const adminApi = new AdminApi();
  try {
    await adminApi.init();
    await adminApi.resetKycUser(userId);
  } finally {
    await adminApi.dispose();
  }
}
