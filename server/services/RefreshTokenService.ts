import {ObjectId} from "mongodb";
import {connectToDb} from "../db";
import {RefreshToken, RefreshTokenFromDb} from "../db/models";

class RefreshTokenService {
	static COLLECTION_NAME = "refreshTokens";

	static async saveForUser(userId: string, token: string) {
		const db = await connectToDb();
		const collection = db.collection<RefreshToken>(
			RefreshTokenService.COLLECTION_NAME
		);

		await collection.updateOne(
			{user: new ObjectId(userId)},
			{$set: {user: new ObjectId(userId), token}},
			{upsert: true}
		);
	}

	static async getByToken(
		token: RefreshToken["token"]
	): Promise<RefreshTokenFromDb | null> {
		const db = await connectToDb();
		const collection = db.collection<RefreshToken>(
			RefreshTokenService.COLLECTION_NAME
		);

		const refreshToken = await collection.findOne({token});
		return refreshToken;
	}

	static async deleteByToken(token: RefreshToken["token"]) {
		const db = await connectToDb();
		const collection = db.collection<RefreshToken>(
			RefreshTokenService.COLLECTION_NAME
		);

		await collection.deleteOne({token});
	}
}

export default RefreshTokenService;
