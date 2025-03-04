"use server";
import { createAdminClient, createSessionClient } from "@/lib/server/appwrite";
import { ID } from "@/lib/appwrite/config";
import { Query } from "node-appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASEID || "";
const COLLECTION_ID = process.env.GALLERY_ID || "";
const BUCKET_ID = process.env.NEXT_PUBLIC_BUCKETID || "";

export async function uploadImage(
	file: File,
	title: string,
	description: string,
	userId: string,
) {
	console.log("File received:", file, file instanceof File);

	if (!file || !title || !description || !userId) {
		throw new Error("Missing required fields");
	}

	try {
		const { storage, databases } = await createAdminClient();
		const imageUpload = await storage.createFile(BUCKET_ID, ID.unique(), file);

		// Create document with image reference
		return await databases.createDocument(
			DATABASE_ID,
			COLLECTION_ID,
			ID.unique(),
			{
				title,
				description,
				imageId: imageUpload.$id,
				createdAt: new Date().toISOString(),
				userId,
			},
		);
	} catch (error) {
		throw error;
	}
}

export async function getImages(limit = 25, offset = 0) {
	try {
		const { databases } = await createSessionClient();
		const results = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
			Query.limit(25),
		]);
		return results.documents;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

//get image by id
export async function getImageById(id: string) {
	try {
		const { databases } = await createSessionClient();
		const image = await databases.getDocument(DATABASE_ID, COLLECTION_ID, id);
		return image;
	} catch (error) {
		console.error("Error getting image by ID:", error);
		throw error; // Might want to handle 404 specifically
	}
}

export async function updateImage(id: string, formData: FormData) {
	const file = formData.get("file") as File;
	const title = formData.get("title") as string;
	const description = formData.get("description") as string;
	try {
		if (file) {
			//get the image first
			const currentImage = await getImageById(id);
			const { storage, databases } = await createAdminClient();
			// Delete image from storage
			await storage.deleteFile(BUCKET_ID, currentImage.imageId);
			// Upload image to storage
			const imageUpload = await storage.createFile(
				BUCKET_ID,
				ID.unique(),
				file,
			);
			// Update document with image reference
			return await databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, {
				title,
				description,
				imageId: imageUpload.$id,
			});
		}
		// Update document with image reference
		const { databases } = await createAdminClient();
		return await databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, {
			title,
			description,
		});
	} catch (error) {
		throw error;
	}
}

export async function updateImageDetails(id: string, formData: FormData) {
	const title = formData.get("title") as string;
	const description = formData.get("description") as string;
	try {
		const { databases } = await createAdminClient();
		return await databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, {
			title,
			description,
			updatedAt: new Date().toISOString(),
		});
	} catch (error) {
		throw error;
	}
}
export async function deleteImage(id: string) {
	try {
		const currentImage = await getImageById(id);
		const { storage, databases } = await createAdminClient();
		// Delete image from storage
		await storage.deleteFile(BUCKET_ID, currentImage.imageId);

		// Delete document
		await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
	} catch (error) {
		throw error;
	}
}
