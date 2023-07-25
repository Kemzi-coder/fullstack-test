import {ObjectId} from "mongodb";
import {connectToDb} from "../db";
import {User, UserFromDb} from "../db/models";

class UserService {
	static COLLECTION_NAME = "users";

	static async create(user: User): Promise<UserFromDb> {
		const db = await connectToDb();
		const collection = db.collection<User>(UserService.COLLECTION_NAME);

		const {insertedId} = await collection.insertOne(user);

		const createdUser = await UserService.getById(insertedId.toString());
		return createdUser!;
	}

	static async getByEmail(email: User["email"]): Promise<UserFromDb | null> {
		const db = await connectToDb();
		const collection = db.collection<User>(UserService.COLLECTION_NAME);

		const user = await collection.findOne({email});
		return user;
	}

	static async getById(id: string): Promise<UserFromDb | null> {
		const db = await connectToDb();
		const collection = db.collection<User>(UserService.COLLECTION_NAME);

		const user = await collection.findOne({_id: new ObjectId(id)});
		return user;
	}
}

export default UserService;
