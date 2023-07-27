import {ObjectId, WithId} from "mongodb";

interface User {
	fullName: string;
	email: string;
	password: string;
}
type UserFromDb = WithId<User>;

interface Product {
	_id: string;
	name: string;
	priceId: string;
	description: string;
}

interface Customer {
	_id: string;
	user: string;
}
interface CustomerToDb extends Omit<Customer, "user"> {
	user: ObjectId;
}
type CustomerFromDb = WithId<CustomerToDb>;

interface Payment {
	_id: string;
	amount: number;
	currency: string;
	createdAt: string;
	status: string;
	description: string;
	customer: string;
	refunded: boolean;
}
type PaymentFromDb = WithId<Payment>;

interface Subscription {
	_id: string;
	customer: string;
	status: string;
	currentPeriodEnd: string;
}
type SubscriptionFromDb = WithId<Subscription>;

interface Refund {
	_id: string;
	payment: string;
	amount: number;
	createdAt: string;
	currency: string;
	status: string;
}

interface RefreshToken {
	user: string;
	token: string;
}
interface RefreshTokenToDb extends Omit<RefreshToken, "user"> {
	user: ObjectId;
}
type RefreshTokenFromDb = WithId<RefreshTokenToDb>;

export type {
	RefreshToken,
	Product,
	RefreshTokenFromDb,
	RefreshTokenToDb,
	User,
	UserFromDb,
	Subscription,
	SubscriptionFromDb,
	Customer,
	CustomerToDb,
	CustomerFromDb,
	Payment,
	PaymentFromDb,
	Refund
};
