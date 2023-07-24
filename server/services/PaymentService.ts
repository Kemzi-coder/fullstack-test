import stripe from "../stripe";

class PaymentService {
	static async checkout() {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			mode: "payment",
			line_items: [
				{
					price_data: {
						currency: "usd",
						product_data: {name: "Product"},
						unit_amount: 1000
					},
					quantity: 1
				}
			],
			success_url: `${process.env.APP_URL}/`,
			cancel_url: `${process.env.APP_URL}/`
		});
		return session;
	}
}

export default PaymentService;
