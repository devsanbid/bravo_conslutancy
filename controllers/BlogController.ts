import { databases } from '@/lib/appwrite/config';
import { ID } from 'appwrite';

export class BlogController {
  private static readonly DATABASE_ID = 'your_database_id';
  private static readonly COLLECTION_ID = 'blogs';

  static async createBlog(title: string, content: string, category: string, authorId: string) {
    try {
      return await databases.createDocument(
        this.DATABASE_ID,
        this.COLLECTION_ID,
        ID.unique(),
        {
          title,
          content,
          category,
          author_id: authorId,
          created_at: new Date().toISOString()
        }
      );
    } catch (error) {
      throw error;
    }
  }

  static async getBlogs() {
    try {
      return await databases.listDocuments(
        this.DATABASE_ID,
        this.COLLECTION_ID
      );
    } catch (error) {
      throw error;
    }
  }

  static async getBlog(id: string) {
    try {
      return await databases.getDocument(
        this.DATABASE_ID,
        this.COLLECTION_ID,
        id
      );
    } catch (error) {
      throw error;
    }
  }

  static async updateBlog(id: string, data: any) {
    try {
      return await databases.updateDocument(
        this.DATABASE_ID,
        this.COLLECTION_ID,
        id,
        data
      );
    } catch (error) {
      throw error;
    }
  }

  static async deleteBlog(id: string) {
    try {
      await databases.deleteDocument(
        this.DATABASE_ID,
        this.COLLECTION_ID,
        id
      );
    } catch (error) {
      throw error;
    }
  }
}