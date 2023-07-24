import stripe from "../stripe";

class PaymentService {
	static async createIntent() {
		const intent = await stripe.paymentIntents.create({
			amount: 10000,
			currency: "usd",
			payment_method_types: ["card"]
		});
		return intent;
	}
}

export default PaymentService;
