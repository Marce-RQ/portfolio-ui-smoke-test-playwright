import { authenticator } from 'otplib';
import dotenv from 'dotenv';
dotenv.config();

function getOtpfromAPP(user) {
  if (!user || !user.totpSecret) {
    throw new Error(`User or user's totpSecret does not exist. Check user configuration and secret.`);
  }
  return authenticator.generate(user.totpSecret);
}

export { getOtpfromAPP };
