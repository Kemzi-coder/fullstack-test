import {NextFunction, Request, Response} from "express";
import {PaymentService} from "../services";

class PaymentController {
	static async checkout(req: Request, res: Response, next: NextFunction) {
		try {
			const session = await PaymentService.checkout();
			res.json(session.url);
		} catch (e) {
			next(e);
		}
	}
}

export default PaymentController;
