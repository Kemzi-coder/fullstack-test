interface ProductFromStripe {
	id: string;
	name: string;
	default_price: string;
	description: string;
}

interface SubscriptionFromStripe {
	id: string;
	customer: string;
	status: string;
	current_period_end: number;
}

interface ChargeFromStripe {
	payment_intent: string;
}

interface PaymentFromStripe {
	id: string;
	amount: number;
	currency: string;
	created: number;
	status: string;
	description: string;
	customer: string;
}

export type {
	ChargeFromStripe,
	PaymentFromStripe,
	ProductFromStripe,
	SubscriptionFromStripe
};
