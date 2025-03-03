"use server";
import { ID } from "@/lib/appwrite/config"; // Adjust path if needed
import { createAdminClient, createSessionClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";

const sessionName = `a_session_${process.env.NEXT_PUBLIC_PROJECTID}`;

// Function to check if the current user's email is verified
export async function isEmailVerified() {
	try {
		const { account } = await createSessionClient();
		const user = await account.get();
		
		// Appwrite stores email verification status in the emailVerification property
		return user?.emailVerification || false;
	} catch (error) {
		console.error("Email verification check error:", error);
		return false;
	}
}

// Function to send a verification email
export async function sendVerificationEmail() {
	try {
		const { account } = await createSessionClient();
		await account.createVerification(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000");
		return { success: true };
	} catch (error) {
		console.error("Send verification email error:", error);
		throw error;
	}
}
export async function register(
	email: string,
	password: string,
	firstName: string,
	middleName: string,
	lastName: string,
	gender: string,
	dateOfBirth: Date,
	phone: string,
	service: string,
) {
	try {
		const { account, databases } = await createAdminClient();
		const userId = ID.unique();
		console.log("Generated userId:", userId); // Debug log
		const user = await account.create(
			userId,
			email,
			password,
			`${firstName} ${lastName}`,
		);

		console.log(user);

		await databases.createDocument(
			process.env.NEXT_PUBLIC_DATABASEID || "",
			process.env.NEXT_PUBLIC_COLLECTID || "",
			ID.unique(),
			{
				userId: user.$id,
				firstName,
				middleName: middleName || "",
				lastName,
				email,
				gender,
				dateOfBirth: dateOfBirth.toISOString(),
				phone,
				service,
				role: "student",
			},
		);

		console.log(user);
		return user;
	} catch (error) {
		console.error("Register error:", error);
		throw error;
	}
}

export async function login(email: string, password: string) {
	try {
		const { account } = await createAdminClient();
		const session = await account.createEmailPasswordSession(email, password);

		(await cookies()).set(sessionName, session.secret, {
			path: "/",
			httpOnly: true,
			sameSite: "strict",
			secure: true,
		});

		// Immediately try to get the user to validate the session
		try {
			const currentUser = await getCurrentUser();
			console.log("Login successful, user retrieved:", currentUser?.$id);
		} catch (verifyError) {
			console.error("Error verifying user after login:", verifyError);
		}

		return session;
	} catch (error) {
		console.error("Login error:", error);
		throw error;
	}
}

export async function logout() {
	try {
		const { account } = await createSessionClient();
		(await cookies()).delete(sessionName);
		await account.deleteSession("current");
	} catch (error) {
		console.error("Logout error:", error);
		throw error;
	}
}

export async function forgotPassword(email: string) {
	try {
		const { account } = await createSessionClient();
		await account.createRecovery(email, "http://localhost:3000/reset-password");
	} catch (error) {
		console.error("Forgot password error:", error);
		throw error;
	}
}

export async function resetPassword(
	userId: string,
	secret: string,
	password: string,
) {
	try {
		const { account } = await createSessionClient();
		await account.updateRecovery(userId, secret, password);
	} catch (error) {
		console.error("Reset password error:", error);
		throw error;
	}
}

export async function getCurrentUser() {
	try {
		const { account, databases } = await createSessionClient();
		const user = await account.get();
		if (!user) return null;

		try {
			// Try to get the user profile using the admin client to avoid permission issues
			const { databases: adminDatabases } = await createAdminClient();
			
			// Get all documents and filter manually to avoid query syntax errors
			const userProfiles = await adminDatabases.listDocuments(
				process.env.NEXT_PUBLIC_DATABASEID || "",
				process.env.NEXT_PUBLIC_COLLECTID || ""
			);
			
			// Find the profile that matches the user ID
			const profile = userProfiles.documents.find(doc => doc.userId === user.$id);
			
			console.log("User profile found:", profile ? "Yes" : "No", profile?.role || "No role");
			
			return { ...user, profile: profile || null };
		} catch (profileError) {
			console.error("Error fetching user profile:", profileError);
			// Return the user without a profile if there's an error
			return { ...user, profile: null };
		}
	} catch (error) {
		console.error("Get current user error:", error);
		return null;
	}
}
