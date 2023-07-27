import {Request, Response} from "express";
import {
	CustomerService,
	PaymentService,
	ProductService,
	SubscriptionService
} from "../services";

interface SubscriptionFromStripe {
	id: string;
	customer: string;
	status: string;
	current_period_end: number;
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

interface ChargeFromStripe {
	payment_intent: string;
}

interface ProductFromStripe {
	id: string;
	name: string;
	default_price: string;
	description: string;
}

class StripeController {
	static async webhook(req: Request, res: Response) {
		const event = req.body;

		switch (event.type) {
			case "product.created": {
				const {default_price, description, id, name} = event.data
					.object as ProductFromStripe;

				await ProductService.create({
					_id: id,
					priceId: default_price,
					description,
					name
				});

				break;
			}
			case "product.updated": {
				const {default_price, description, id, name} = event.data
					.object as ProductFromStripe;

				await ProductService.updateById(id, {
					priceId: default_price,
					description,
					name
				});

				break;
			}
			case "product.deleted": {
				const {id} = event.data.object as ProductFromStripe;

				await ProductService.deleteById(id);

				break;
			}
			case "customer.subscription.created": {
				const {customer, id, status, current_period_end} = event.data
					.object as SubscriptionFromStripe;

				const customerFromDb = await CustomerService.getById(customer);
				if (customerFromDb == null) {
					break;
				}

				await SubscriptionService.create({
					currentPeriodEnd: new Date(current_period_end).toISOString(),
					_id: id,
					customer,
					status
				});

				break;
			}
			case "customer.subscription.updated": {
				const {customer, id, status, current_period_end} = event.data
					.object as SubscriptionFromStripe;

				const customerFromDb = await CustomerService.getById(customer);
				if (customerFromDb == null) {
					break;
				}

				await SubscriptionService.updateById(id, {
					currentPeriodEnd: new Date(current_period_end).toISOString(),
					customer,
					status
				});

				break;
			}
			case "charge.refunded": {
				const {payment_intent} = event.data.object as ChargeFromStripe;

				const paymentFromDb = await PaymentService.getById(payment_intent);
				if (paymentFromDb == null) {
					break;
				}

				await PaymentService.updateById(payment_intent, {refunded: true});

				break;
			}
			case "payment_intent.succeeded": {
				const {amount, created, currency, description, id, status, customer} =
					event.data.object as PaymentFromStripe;

				const customerFromDb = await CustomerService.getById(customer);
				if (customerFromDb == null) {
					break;
				}

				await PaymentService.create({
					createdAt: new Date(created).toISOString(),
					_id: id,
					refunded: false,
					customer,
					currency,
					description,
					status,
					amount
				});

				break;
			}
			default:
				console.log(`Unhandled event type ${event.type}`);
		}

		res.json({received: true});
	}
}

export default StripeController;
