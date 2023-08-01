import {Request, Response} from "express";
import {StripeService} from "../services";

class StripeController {
	static async webhook(req: Request, res: Response) {
		const event = req.body;

		switch (event.type) {
			case "product.created": {
				await StripeService.handleProductCreation(event.data.object);
				break;
			}
			case "product.updated": {
				await StripeService.handleProductUpdate(event.data.object);
				break;
			}
			case "product.deleted": {
				await StripeService.handleProductDelete(event.data.object);
				break;
			}
			case "customer.subscription.created": {
				await StripeService.handleSubscriptionCreation(event.data.object);
				break;
			}
			case "customer.subscription.updated": {
				await StripeService.handleSubscriptionUpdate(event.data.object);
				break;
			}
			case "charge.refunded": {
				await StripeService.handlePaymentRefund(event.data.object);
				break;
			}
			case "payment_intent.succeeded": {
				await StripeService.handlePaymentSucceeded(event.data.object);
				break;
			}
			default:
				console.log(`Unhandled event type ${event.type}`);
		}

		res.json({received: true});
	}
}

export default StripeController;
