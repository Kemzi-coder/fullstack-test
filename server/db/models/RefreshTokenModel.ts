import {ObjectId, WithId} from "mongodb";
import Model from "../lib/Model";

interface RefreshTokenToDb {
	userId: ObjectId;
	token: string;
}

class RefreshTokenModel extends Model<RefreshTokenToDb> {
	constructor() {
		super({collectionName: "refreshTokens"});
	}

	async upsertForUser(userId: ObjectId | string, token: string) {
		return super.upsertOne(
			{userId: new ObjectId(userId)},
			{userId: new ObjectId(userId), token}
		);
	}

	async getByToken(
		token: RefreshTokenToDb["token"]
	): Promise<WithId<RefreshTokenToDb> | null> {
		return super.getOne({token});
	}

	async deleteByToken(token: RefreshTokenToDb["token"]) {
		return super.deleteOne({token});
	}
}

export type {RefreshTokenToDb};
export default RefreshTokenModel;
