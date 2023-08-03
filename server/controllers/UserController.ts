import {NextFunction, Response} from "express";
import {UserService} from "../services";
import {CustomRequest} from "../types";

class UserController {
	static async getPayments(
		req: CustomRequest,
		res: Response,
		next: NextFunction
	) {
		try {
			const customerId = req.customerId!;

			const payments = await UserService.getPaymentsByCustomerId(customerId);

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

			const subscriptions = await UserService.getSubscriptionsByCustomerId(
				customerId
			);
			res.json(subscriptions);
		} catch (e) {
			next(e);
		}
	}
}

export default UserController;
