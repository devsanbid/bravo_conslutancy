import { ID, Models, Query } from "appwrite";
import { createAdminClient } from "@/lib/server/appwrite";
import { client_databases, client } from "@/lib/appwrite/client-config";

const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASEID || "";
const USERS_COLLECTION_ID = process.env.NEXT_PUBLIC_COLLECTID || "";
const MESSAGE_COLLECTION_ID = process.env.MESSAGE_ID || "";

interface MessageData {
  messageId: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
}

export async function createGuestUser(DATABASE_ID: string, USERS_COLLECTION_ID: string) {
  try {
    const { account, databases } = await createAdminClient();
    const userId = ID.unique();
    const username = `Guest${Math.floor(Math.random() * 1000)}`;
    const password = Math.random().toString(36).slice(-8); // Generate a random password

    // Create user in Appwrite
    const user = await account.create(
      userId,
      `${username}@example.com`, // Dummy email
      password,
      username
    );

    // Create user document in Users collection
    await databases.createDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      ID.unique(),
      {
        userId: user.$id,
        firstName: username,
        lastName: "",
        email: `${username}@example.com`,
        gender: "other",
        dateOfBirth: new Date().toISOString(),
        phone: "",
        service: "",
        role: "student",
        type: "guest",
      }
    );

    return user;
  } catch (error) {
    console.error("Error creating guest user:", error);
    throw error;
  }
}

export async function sendMessage(senderId: string, receiverId: string, text: string) {
  try {
    const { databases } = await createAdminClient();
    
    const messageData: MessageData = {
      messageId: ID.unique(),
      senderId,
      receiverId,
      text,
      timestamp: new Date().toISOString(),
    };

    const result = await databases.createDocument(
      DATABASE_ID,
      MESSAGE_COLLECTION_ID,
      ID.unique(),
      messageData
    );

    return result;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
}

export async function getMessagesBetweenUsers(userId1: string, userId2: string) {
  try {
    const { databases } = await createAdminClient();
    
    // Query messages where either:
    // 1. userId1 is sender and userId2 is receiver, OR
    // 2. userId2 is sender and userId1 is receiver
    // Get messages where user1 is sender and user2 is receiver
    const sentMessages = await databases.listDocuments(
      DATABASE_ID,
      MESSAGE_COLLECTION_ID,
      [
        Query.equal("senderId", userId1),
        Query.equal("receiverId", userId2),
        Query.orderDesc("timestamp")
      ]
    );

    // Get messages where user2 is sender and user1 is receiver
    const receivedMessages = await databases.listDocuments(
      DATABASE_ID,
      MESSAGE_COLLECTION_ID,
      [
        Query.equal("senderId", userId2),
        Query.equal("receiverId", userId1),
        Query.orderDesc("timestamp")
      ]
    );

    // Combine and sort messages
    const allMessages = [...sentMessages.documents, ...receivedMessages.documents];
    allMessages.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return allMessages;
  } catch (error) {
    console.error("Error getting messages:", error);
    throw error;
  }
}

export async function getAllUsers() {
  try {
    const { databases } = await createAdminClient();
    
    const users = await databases.listDocuments(
      DATABASE_ID,
      USERS_COLLECTION_ID
    );

    return users.documents;
  } catch (error) {
    console.error("Error getting users:", error);
    throw error;
  }
}

export async function getUsersWithRecentMessages(moderatorId: string) {
  try {
    const { databases } = await createAdminClient();
    
    // Get all users first
    const users = await databases.listDocuments(
      DATABASE_ID,
      USERS_COLLECTION_ID
    );

    // For each user, get the most recent message (if any)
    const usersWithMessages = await Promise.all(
      users.documents.map(async (user) => {
        try {
          // Get the most recent message between this user and the moderator
          // Get latest sent message
          const sentMessages = await databases.listDocuments(
            DATABASE_ID,
            MESSAGE_COLLECTION_ID,
            [
              Query.equal("senderId", user.userId),
              Query.equal("receiverId", moderatorId),
              Query.orderDesc("timestamp"),
              Query.limit(1)
            ]
          );

          // Get latest received message
          const receivedMessages = await databases.listDocuments(
            DATABASE_ID,
            MESSAGE_COLLECTION_ID,
            [
              Query.equal("senderId", moderatorId),
              Query.equal("receiverId", user.userId),
              Query.orderDesc("timestamp"),
              Query.limit(1)
            ]
          );

          // Determine which is more recent
          const sentMessage = sentMessages.documents.length > 0 ? sentMessages.documents[0] : null;
          const receivedMessage = receivedMessages.documents.length > 0 ? receivedMessages.documents[0] : null;
          
          let latestMessage = null;
          
          if (sentMessage && receivedMessage) {
            latestMessage = new Date(sentMessage.timestamp) > new Date(receivedMessage.timestamp)
              ? sentMessage : receivedMessage;
          } else {
            latestMessage = sentMessage || receivedMessage;
          }
          
          return {
            id: user.userId,
            name: `${user.firstName} ${user.lastName}`.trim(),
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.firstName}`,
            lastMessage: latestMessage ? latestMessage.text : "",
            lastMessageTime: latestMessage ? latestMessage.timestamp : null,
            unread: 0, // We'll implement this later
            online: false, // We'll implement this later
            type: user.type || "student"
          };
        } catch (error) {
          console.error(`Error getting messages for user ${user.userId}:`, error);
          return {
            id: user.userId,
            name: `${user.firstName} ${user.lastName}`.trim(),
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.firstName}`,
            lastMessage: "",
            lastMessageTime: null,
            unread: 0,
            online: false,
            type: user.type || "student"
          };
        }
      })
    );

    // Sort by most recent message
    return usersWithMessages.sort((a, b) => {
      if (!a.lastMessageTime && !b.lastMessageTime) return 0;
      if (!a.lastMessageTime) return 1;
      if (!b.lastMessageTime) return -1;
      return new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime();
    });
  } catch (error) {
    console.error("Error getting users with messages:", error);
    throw error;
  }
}

// Setup a real-time listener for new messages
export function subscribeToMessages(callback: (message: any) => void) {
  try {
    return client.subscribe([`databases.${DATABASE_ID}.collections.${MESSAGE_COLLECTION_ID}.documents`], (response) => {
      if (response.events.includes(`databases.${DATABASE_ID}.collections.${MESSAGE_COLLECTION_ID}.documents.create`)) {
        callback(response.payload);
      }
    });
  } catch (error) {
    console.error("Error subscribing to messages:", error);
    throw error;
  }
}
