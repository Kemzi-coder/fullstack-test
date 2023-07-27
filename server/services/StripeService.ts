import stripe from "../stripe";

class StripeService {
	static async createCheckoutSession(customerId: string, priceIds: string[]) {
		const session = await stripe.checkout.sessions.create({
			customer: customerId,
			line_items: priceIds.map(id => ({price: id, quantity: 1})),
			mode: "subscription",
			success_url: process.env.APP_URL as string
		});
		return session;
	}

	static async setUpForCustomer(customerId: string) {
		const intent = await stripe.setupIntents.create({
			customer: customerId
		});
		return intent;
	}

	static async refund(paymentId: string) {
		const refund = await stripe.refunds.create({
			payment_intent: paymentId
		});
		return refund;
	}
}

export default StripeService;
