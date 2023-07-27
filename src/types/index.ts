interface Product {
	id: string;
	name: string;
	priceId: string;
	description: string;
}
interface ProductFromApi {
	_id: string;
	name: string;
	priceId: string;
	description: string;
}

interface User {
	fullName: string;
	email: string;
}

interface Payment {
	id: string;
	amount: number;
	status: string;
	description: string;
	createdAt: string;
	currency: string;
	refunded: boolean;
}
interface PaymentFromApi {
	_id: string;
	amount: number;
	currency: string;
	createdAt: string;
	status: string;
	description: string;
	customer: string;
	refunded: boolean;
}

interface Subscription {
	id: string;
	customer: string;
	status: string;
	currentPeriodEnd: string;
}
interface SubscriptionFromApi {
	_id: string;
	customer: string;
	status: string;
	currentPeriodEnd: string;
}

export type {
	Product,
	ProductFromApi,
	Payment,
	PaymentFromApi,
	SubscriptionFromApi,
	Subscription,
	User
};
