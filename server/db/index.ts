import {Db, MongoClient} from "mongodb";
import {loadEnvConfig} from "@next/env";
loadEnvConfig("./", process.env.NODE_ENV !== "production");

const connectionString = process.env.MONGODB_URI || "";
const client = new MongoClient(connectionString);

const connectToDb = async (): Promise<Db> => {
	const connection = await client.connect();
	return connection.db(process.env.DATABASE_NAME);
};

export {connectToDb};
