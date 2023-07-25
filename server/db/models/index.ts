import {ObjectId, WithId} from "mongodb";

interface User {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}
type UserFromDb = WithId<User>;

interface RefreshToken {
	user: ObjectId;
	token: string;
}
type RefreshTokenFromDb = WithId<RefreshToken>;

export type {RefreshToken, RefreshTokenFromDb, User, UserFromDb};
