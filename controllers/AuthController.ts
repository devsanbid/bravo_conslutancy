"use server";
import { ID } from "@/lib/appwrite/config"; // Adjust path if needed
import { createAdminClient, createSessionClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { Account, Client } from "node-appwrite";

const sessionName = `a_session_${process.env.NEXT_PUBLIC_PROJECTID}`;
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

		cookies().set(sessionName, session.secret, {
			path: "/",
			httpOnly: true,
			sameSite: "strict",
			secure: true,
		});

		return session;
	} catch (error) {
		console.error("Login error:", error);
		throw error;
	}
}

export async function logout() {
	try {
		const { account } = await createSessionClient();
		cookies().delete(sessionName);
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
	passwordAgain: string,
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

		const userProfile = await databases.listDocuments(
			process.env.NEXT_PUBLIC_DATABASEID || "",
			process.env.NEXT_PUBLIC_COLLECTID || "",
			[`equal("userId", "${user.$id}")`],
		);
		return { ...user, profile: userProfile.documents[0] || null };
	} catch (error) {
		console.error("Get current user error:", error);
		return null;
	}
}
