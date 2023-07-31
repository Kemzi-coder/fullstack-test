import {NextFunction, Response} from "express";
import {ApiError, ApiErrorFactory} from "../lib/error";
import {CustomerService} from "../services";
import {CustomRequest} from "../types";

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

		const customer = await CustomerService.getByUserId(userId);
		if (customer == null) {
			throw ApiErrorFactory.getForbidden();
		}

		req.customerId = customer._id;
		next();
	} catch (e) {
		next(e);
	}
};

export default customerMiddleware;
