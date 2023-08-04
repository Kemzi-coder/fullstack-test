import {PaymentToDb, ProductToDb, SubscriptionToDb} from "../../db/models";
import {
	PaymentFromStripe,
	ProductFromStripe,
	SubscriptionFromStripe
} from "./types";

class StripeMapper {
	static mapProduct(product: ProductFromStripe): ProductToDb {
		return {
			productId: product.id,
			description: product.description,
			name: product.name,
			priceId: product.default_price
		};
	}

	static mapSubscription(
		subscription: SubscriptionFromStripe
	): SubscriptionToDb {
		return {
			subscriptionId: subscription.id,
			currentPeriodEnd: new Date(subscription.current_period_end).toISOString(),
			customerId: subscription.customer,
			status: subscription.status
		};
	}

	static mapPayment(payment: PaymentFromStripe): PaymentToDb {
		return {
			paymentId: payment.id,
			customerId: payment.customer,
			createdAt: new Date(payment.created).toISOString(),
			currency: payment.currency,
			description: payment.description,
			status: payment.status,
			amount: payment.amount
		};
	}
}

export default StripeMapper;
