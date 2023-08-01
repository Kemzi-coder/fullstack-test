interface Product {
	id: string;
	productId: string;
	name: string;
	priceId: string;
	description: string;
}
interface ProductFromApi {
	_id: string;
	productId: string;
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
	paymentId: string;
	amount: number;
	status: string;
	description: string;
	createdAt: string;
	currency: string;
	refunded: boolean;
	customerId: string;
}
interface PaymentFromApi {
	_id: string;
	paymentId: string;
	amount: number;
	status: string;
	description: string;
	createdAt: string;
	currency: string;
	refunded: boolean;
	customerId: string;
}

interface Subscription {
	id: string;
	subscriptionId: string;
	customerId: string;
	status: string;
	currentPeriodEnd: string;
}
interface SubscriptionFromApi {
	_id: string;
	subscriptionId: string;
	customerId: string;
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
