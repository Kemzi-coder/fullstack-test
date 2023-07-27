import {ObjectId} from "mongodb";
import {connectToDb} from "../db";
import {RefreshToken, RefreshTokenFromDb, RefreshTokenToDb} from "../db/models";

class RefreshTokenService {
	static COLLECTION_NAME = "refreshTokens";

	static async saveForUser(userId: string, token: string) {
		const collection = await RefreshTokenService._connectToCollection();
		await collection.updateOne(
			{user: new ObjectId(userId)},
			{$set: {user: new ObjectId(userId), token}},
			{upsert: true}
		);
	}

	static async getByToken(
		token: RefreshToken["token"]
	): Promise<RefreshTokenFromDb | null> {
		const collection = await RefreshTokenService._connectToCollection();
		return collection.findOne({token});
	}

	static async deleteByToken(token: RefreshToken["token"]) {
		const collection = await RefreshTokenService._connectToCollection();
		await collection.deleteOne({token});
	}

	static async _connectToCollection() {
		const db = await connectToDb();
		const collection = db.collection<RefreshTokenToDb>(
			RefreshTokenService.COLLECTION_NAME
		);
		return collection;
	}
}

export default RefreshTokenService;
