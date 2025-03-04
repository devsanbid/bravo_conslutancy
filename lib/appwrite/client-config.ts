import { Client, Account, Databases, Storage, ID } from "appwrite";

const endpoint: string = process.env.NEXT_PUBLIC_ENDPOINT || "";
const projectId: string = process.env.NEXT_PUBLIC_PROJECTID || "";

const client = new Client().setEndpoint(endpoint).setProject(projectId);

export const client_account = new Account(client);
export const client_databases = new Databases(client);
export const client_storage = new Storage(client);

export { client, ID };
