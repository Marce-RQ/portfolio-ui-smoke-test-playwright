import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { env } from '../test-data/env.js';
dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// Sign Up Link Creation from user's id stored in MongoDB
async function getSignUpLinkFromMongo(email, maxRetries = 5, delayMs = 2000) {
  try {
    await client.connect();
    const database = client.db(process.env.MONGODB_DATABASE);
    const collection = database.collection(process.env.MONGODB_COLLECTION);

    // Retry logic to wait for the document to be created
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const userRequest = await collection.findOne({ email: email });

      // If found, construct the sign-up link
      if (userRequest && userRequest._id) {
        const verificationCode = userRequest._id.toString();
        const signUpUrl = `${env.baseUrl}/signup/verify?code=${verificationCode}`;

        return signUpUrl;
      }

      // If not found and we have retries left, wait and try again
      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }

    throw new Error(`Verification code not found in MongoDB for email: ${email} after ${maxRetries} attempts`);
  } catch (error) {
    console.error('Error fetching verification code from MongoDB:', error);
    throw error;
  } finally {
    await client.close();
  }
}

export { getSignUpLinkFromMongo };
