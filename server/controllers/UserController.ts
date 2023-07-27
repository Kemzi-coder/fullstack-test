import {NextFunction, Response} from "express";
import {CustomRequest} from "../types";
import {PaymentService, SubscriptionService} from "../services";

class UserController {
	static async getPayments(
		req: CustomRequest,
		res: Response,
		next: NextFunction
	) {
		try {
			const customerId = req.customerId!;

			const payments = await PaymentService.getByCustomerId(
				customerId
			);
			res.json(payments);
		} catch (e) {
			next(e);
		}
	}

	static async getSubscriptions(
		req: CustomRequest,
		res: Response,
		next: NextFunction
	) {
		try {
			const customerId = req.customerId!;

			const subscriptions = await SubscriptionService.getByCustomerId(
				customerId
			);
			res.json(subscriptions);
		} catch (e) {
			next(e);
		}
	}
}

export default UserController;
