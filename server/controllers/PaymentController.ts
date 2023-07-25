import {NextFunction, Response} from "express";
import {PaymentService} from "../services";
import {CustomRequest} from "../types";

class PaymentController {
	static async createPayment(
		req: CustomRequest,
		res: Response,
		next: NextFunction
	) {
		try {
			const intent = await PaymentService.createIntent();
			res.json({clientSecret: intent.client_secret});
		} catch (e) {
			next(e);
		}
	}
}

export default PaymentController;
