import { databases, storage } from '@/lib/appwrite/config';
import { ID } from 'appwrite';

export class GalleryController {
  private static readonly DATABASE_ID = 'your_database_id';
  private static readonly COLLECTION_ID = 'gallery';
  private static readonly BUCKET_ID = 'gallery';

  static async uploadImage(file: File, title: string, description: string) {
    try {
      // Upload image to storage
      const imageUpload = await storage.createFile(
        this.BUCKET_ID,
        ID.unique(),
        file
      );

      // Create document with image reference
      return await databases.createDocument(
        this.DATABASE_ID,
        this.COLLECTION_ID,
        ID.unique(),
        {
          title,
          description,
          image_id: imageUpload.$id,
          created_at: new Date().toISOString()
        }
      );
    } catch (error) {
      throw error;
    }
  }

  static async getImages() {
    try {
      return await databases.listDocuments(
        this.DATABASE_ID,
        this.COLLECTION_ID
      );
    } catch (error) {
      throw error;
    }
  }

  static async deleteImage(id: string, imageId: string) {
    try {
      // Delete image from storage
      await storage.deleteFile(this.BUCKET_ID, imageId);
      
      // Delete document
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