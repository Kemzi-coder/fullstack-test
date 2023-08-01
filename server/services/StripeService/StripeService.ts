import {Customer, Payment, Product, Subscription} from "../../db/models";
import StripeMapper from "./StripeMapper";
import {
	ChargeFromStripe,
	PaymentFromStripe,
	ProductFromStripe,
	SubscriptionFromStripe
} from "./types";

class StripeService {
	static async handleProductCreation(product: ProductFromStripe) {
		const productToDb = StripeMapper.mapProduct(product);
		await Product.create(productToDb);
	}

	static async handleProductUpdate(product: ProductFromStripe) {
		const productToDb = StripeMapper.mapProduct(product);
		await Product.updateByProductId(productToDb.productId, productToDb);
	}

	static async handleProductDelete(product: ProductFromStripe) {
		const {productId} = StripeMapper.mapProduct(product);
		await Product.deleteByProductId(productId);
	}

	static async handleSubscriptionCreation(
		subscription: SubscriptionFromStripe
	) {
		const subscriptionToDb = StripeMapper.mapSubscription(subscription);

		const customerFromDb = await Customer.getByCustomerId(
			subscriptionToDb.customerId
		);
		if (customerFromDb == null) {
			return;
		}

		await Subscription.create(subscriptionToDb);
	}

	static async handleSubscriptionUpdate(subscription: SubscriptionFromStripe) {
		const subscriptionToDb = StripeMapper.mapSubscription(subscription);

		const customerFromDb = await Customer.getByCustomerId(
			subscriptionToDb.customerId
		);
		if (customerFromDb == null) {
			return;
		}

		await Subscription.updateBySubscriptionId(
			subscriptionToDb.subscriptionId,
			subscriptionToDb
		);
	}

	static async handlePaymentRefund(charge: ChargeFromStripe) {
		const {payment_intent} = charge;

		const paymentFromDb = await Payment.getByPaymentId(payment_intent);
		if (paymentFromDb == null) {
			return;
		}

		await Payment.updateByPaymentId(payment_intent, {refunded: true});
	}

	static async handlePaymentSucceeded(payment: PaymentFromStripe) {
		const paymentToDb = StripeMapper.mapPayment(payment);

		const customerFromDb = await Customer.getByCustomerId(
			paymentToDb.customerId
		);
		if (customerFromDb == null) {
			return;
		}

		await Payment.create(paymentToDb);
	}
}

export default StripeService;
