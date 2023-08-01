import {WithId} from "mongodb";
import Model from "../lib/Model";

interface UserToDb {
	fullName: string;
	email: string;
	password: string;
}

class UserModel extends Model<UserToDb> {
	constructor() {
		super({collectionName: "users"});
	}

	async getByEmail(email: UserToDb["email"]): Promise<WithId<UserToDb> | null> {
		return super.getOne({email});
	}
}

export type {UserToDb};
export default UserModel;
