import {NextFunction, Response} from "express";
import {ApiErrorFactory} from "../lib/error";
import {CustomRequest} from "../types";
import {Customer} from "../db/models";

const customerMiddleware = async (
	req: CustomRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId = req.user?.id;
		if (!userId) {
			throw ApiErrorFactory.getUnauthorized();
		}

		const customer = await Customer.getByUserId(userId);
		if (customer == null) {
			throw ApiErrorFactory.getForbidden();
		}

		req.customerId = customer.customerId;
		next();
	} catch (e) {
		next(e);
	}
};

export default customerMiddleware;
