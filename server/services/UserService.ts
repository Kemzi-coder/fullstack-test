import {connectToDb} from "../db";
import {User} from "../db/models";

class UserService {
	static COLLECTION_NAME = "users";

	static async create(user: User) {
		const db = await connectToDb();
		const collection = db.collection(UserService.COLLECTION_NAME);
		
		const createdUser = await collection.insertOne(user);

		return createdUser;
	}
}

export default UserService;
