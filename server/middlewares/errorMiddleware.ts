import {NextFunction, Response} from "express";
import {ApiError, ApiErrorFactory} from "../lib/error";
import {CustomRequest} from "../types";

const errorMiddleware = (
	err: Error | ApiError,
	req: CustomRequest,
	res: Response,
	next: NextFunction
) => {
	console.log(err);

	const apiError =
		err instanceof ApiError ? err : ApiErrorFactory.getInternalServer();

	res.status(apiError.status).json({message: apiError.message});
};

export default errorMiddleware;
