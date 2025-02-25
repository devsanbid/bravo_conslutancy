"use server"
import { Client, Account, Databases } from "node-appwrite";
import { cookies } from "next/headers";

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT || "")
    .setProject(process.env.NEXT_PUBLIC_PROJECTID || "");
  
  const sessionName = `a_session_${process.env.NEXT_PUBLIC_PROJECTID}`;
  const session = cookies().get(sessionName);
  
  if (!session || !session.value) {
    throw new Error("No session");
  }
  
  client.setSession(session.value);
  
  return {
    client,
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    }
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT || "")
    .setProject(process.env.NEXT_PUBLIC_PROJECTID || "")
    .setKey(process.env.APPWRITE_API_KEY || "");
  
  return {
    client,
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    }
  };
}

