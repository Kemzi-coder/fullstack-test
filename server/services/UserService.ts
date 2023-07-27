import {ObjectId} from "mongodb";
import {connectToDb} from "../db";
import {User, UserFromDb} from "../db/models";

class UserService {
	static COLLECTION_NAME = "users";

	static async create(user: User): Promise<UserFromDb> {
		const collection = await UserService._connectToCollection();
		const {insertedId} = await collection.insertOne(user);

		const createdUser = await UserService.getById(insertedId.toString());
		return createdUser!;
	}

	static async getByEmail(email: User["email"]): Promise<UserFromDb | null> {
		const collection = await UserService._connectToCollection();
		return collection.findOne({email});
	}

	static async getById(id: string): Promise<UserFromDb | null> {
		const collection = await UserService._connectToCollection();
		return collection.findOne({_id: new ObjectId(id)});
	}

	static async _connectToCollection() {
		const db = await connectToDb();
		const collection = db.collection<User>(UserService.COLLECTION_NAME);
		return collection;
	}
}

export default UserService;
