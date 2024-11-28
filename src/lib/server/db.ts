import { dev } from "$app/environment";
import { DB_NAME } from "$lib/db_schemas";
import { MongoClient } from "mongodb";

const client = new MongoClient(
  dev ? "mongodb://localhost:27017" : "mongodb://mongo:27017"
);

try {
  await client.connect();
} catch (error) {
  console.error("Failed to connect to the database:", error);
}

const db = client.db(DB_NAME);

export default db;
