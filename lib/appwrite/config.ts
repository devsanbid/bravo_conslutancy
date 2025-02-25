import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client()
    .setEndpoint('YOUR_APPWRITE_ENDPOINT') 
    .setProject('https://cloud.appwrite.io/v1');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export { client };