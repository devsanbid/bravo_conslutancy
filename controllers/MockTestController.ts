import { databases } from '@/lib/appwrite/config';
import { ID } from 'appwrite';

export class MockTestController {
  private static readonly DATABASE_ID = 'your_database_id';
  private static readonly TESTS_COLLECTION = 'mock_tests';
  private static readonly ATTEMPTS_COLLECTION = 'test_attempts';
  private static readonly QUESTIONS_COLLECTION = 'test_questions';

  static async createTest(data: {
    title: string;
    description: string;
    duration: number;
    totalMarks: number;
    sections: any[];
  }) {
    try {
      return await databases.createDocument(
        this.DATABASE_ID,
        this.TESTS_COLLECTION,
        ID.unique(),
        {
          ...data,
          created_at: new Date().toISOString(),
          status: 'active'
        }
      );
    } catch (error) {
      throw error;
    }
  }

  static async getTests() {
    try {
      return await databases.listDocuments(
        this.DATABASE_ID,
        this.TESTS_COLLECTION
      );
    } catch (error) {
      throw error;
    }
  }

  static async getTest(id: string) {
    try {
      return await databases.getDocument(
        this.DATABASE_ID,
        this.TESTS_COLLECTION,
        id
      );
    } catch (error) {
      throw error;
    }
  }

  static async startTestAttempt(testId: string, userId: string) {
    try {
      return await databases.createDocument(
        this.DATABASE_ID,
        this.ATTEMPTS_COLLECTION,
        ID.unique(),
        {
          test_id: testId,
          user_id: userId,
          started_at: new Date().toISOString(),
          status: 'in_progress'
        }
      );
    } catch (error) {
      throw error;
    }
  }

  static async submitTestAttempt(attemptId: string, answers: any[]) {
    try {
      return await databases.updateDocument(
        this.DATABASE_ID,
        this.ATTEMPTS_COLLECTION,
        attemptId,
        {
          answers,
          completed_at: new Date().toISOString(),
          status: 'completed'
        }
      );
    } catch (error) {
      throw error;
    }
  }

  static async getUserAttempts(userId: string) {
    try {
      return await databases.listDocuments(
        this.DATABASE_ID,
        this.ATTEMPTS_COLLECTION,
        [
          databases.equal('user_id', userId)
        ]
      );
    } catch (error) {
      throw error;
    }
  }
}