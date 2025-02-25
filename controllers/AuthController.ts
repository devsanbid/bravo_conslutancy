import { account } from '@/lib/appwrite/config';
import { ID } from 'appwrite';

export class AuthController {
  static async register(email: string, password: string, name: string) {
    try {
      // Create user account
      const user = await account.create(
        ID.unique(),
        email,
        password,
        name
      );

      // Create session (login)
      await account.createEmailSession(email, password);

      return user;
    } catch (error) {
      throw error;
    }
  }

  static async login(email: string, password: string) {
    try {
      const session = await account.createEmailSession(email, password);
      return session;
    } catch (error) {
      throw error;
    }
  }

  static async logout() {
    try {
      await account.deleteSession('current');
    } catch (error) {
      throw error;
    }
  }

  static async forgotPassword(email: string) {
    try {
      await account.createRecovery(email, 'http://localhost:3000/reset-password');
    } catch (error) {
      throw error;
    }
  }

  static async resetPassword(userId: string, secret: string, password: string, passwordAgain: string) {
    try {
      await account.updateRecovery(userId, secret, password, passwordAgain);
    } catch (error) {
      throw error;
    }
  }

  static async getCurrentUser() {
    try {
      return await account.get();
    } catch (error) {
      return null;
    }
  }
}