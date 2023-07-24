import {NextFunction, Request, Response} from "express";
import {PaymentService} from "../services";

class PaymentController {
	static async test(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await PaymentService.test();
			res.json(user);
		} catch (e) {
			next(e);
		}
	}
}

export default PaymentController;
