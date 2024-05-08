import { Client, Account, Databases } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("662f8003002bcde38add");

const account = new Account(client);

const databases = new Databases(client, "662fa5010027e134272e");

export { client, account, databases };
