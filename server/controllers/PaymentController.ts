import {NextFunction, Response} from "express";
import {PaymentService} from "../services";
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

			const {url} = await PaymentService.createCheckoutSession(
				customerId,
				priceIds
			);

			res.json({sessionUrl: url});
		} catch (e) {
			next(e);
		}
	}

	static async setUp(req: CustomRequest, res: Response, next: NextFunction) {
		try {
			const customerId = req.customerId!;

			const intent = await PaymentService.setUpForCustomer(customerId);

			res.json({clientSecret: intent.client_secret});
		} catch (e) {
			next(e);
		}
	}

	static async refund(req: CustomRequest, res: Response, next: NextFunction) {
		try {
			const {paymentId} = req.params;

			await PaymentService.refundByPaymentId(paymentId);

			res.json({success: true});
		} catch (e) {
			next(e);
		}
	}
}

export default PaymentController;
