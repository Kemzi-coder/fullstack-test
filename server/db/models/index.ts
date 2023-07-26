import {ObjectId, WithId} from "mongodb";

interface User {
	fullName: string;
	email: string;
	password: string;
	customerId: string;
}
type UserFromDb = WithId<User>;

interface RefreshToken {
	user: ObjectId;
	token: string;
}
type RefreshTokenFromDb = WithId<RefreshToken>;

export type {RefreshToken, RefreshTokenFromDb, User, UserFromDb};
