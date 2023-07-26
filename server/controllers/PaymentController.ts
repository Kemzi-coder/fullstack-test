import {NextFunction, Response} from "express";
import {PaymentService} from "../services";
import {CustomRequest} from "../types";
import {ApiError} from "../lib/error";

class PaymentController {
	static async createCheckoutSession(
		req: CustomRequest,
		res: Response,
		next: NextFunction
	) {
		try {
			const {priceIds} = req.body;
			const customerId = req.user?.customerId;
			if (!customerId) {
				throw new ApiError(401, "Not authorized.");
			}

			const session = await PaymentService.createCheckoutSession(
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
			const customerId = req.user?.customerId;
			if (!customerId) {
				throw new ApiError(401, "Not authorized.");
			}

			const intent = await PaymentService.setUpForCustomer(customerId);
			res.json({clientSecret: intent.client_secret});
		} catch (e) {
			next(e);
		}
	}
}

export default PaymentController;
