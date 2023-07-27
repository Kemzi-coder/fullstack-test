import {NextFunction, Response} from "express";
import {StripeService} from "../services";
import {CustomRequest} from "../types";

class PaymentController {
	static async createCheckoutSession(
		req: CustomRequest,
		res: Response,
		next: NextFunction
	) {
		try {
			const {priceIds} = req.body;
			const customerId = req.customerId!;

			const session = await StripeService.createCheckoutSession(
				customerId,
				priceIds
			);
			res.json({sessionUrl: session.url});
		} catch (e) {
			next(e);
		}
	}

	static async setUp(req: CustomRequest, res: Response, next: NextFunction) {
		try {
			const customerId = req.customerId!;

			const intent = await StripeService.setUpForCustomer(customerId);
			res.json({clientSecret: intent.client_secret});
		} catch (e) {
			next(e);
		}
	}

	static async refund(req: CustomRequest, res: Response, next: NextFunction) {
		try {
			const {paymentId} = req.params;

			await StripeService.refund(paymentId);

			res.json({success: true});
		} catch (e) {
			next(e);
		}
	}
}

export default PaymentController;
