import {NextFunction, Request, Response} from "express";
import {PaymentService} from "../services";

class PaymentController {
	static async getSecret(req: Request, res: Response, next: NextFunction) {
		try {
			const intent = await PaymentService.createIntent();
			res.json({clientSecret: intent.client_secret});
		} catch (e) {
			next(e);
		}
	}
}

export default PaymentController;
