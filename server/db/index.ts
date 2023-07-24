import {Db, MongoClient} from "mongodb";
import {loadEnvConfig} from "@next/env";
loadEnvConfig("./", process.env.NODE_ENV !== "production");

const connectionString = process.env.MONGODB_URI || "";
const client = new MongoClient(connectionString);

const connectToDb = async (): Promise<Db | null> => {
	let connection: MongoClient;

	try {
		connection = await client.connect();
	} catch (e) {
		console.error(e);
	}

	return connection?.db() || null;
};

export {connectToDb};
