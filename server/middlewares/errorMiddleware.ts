import {NextFunction, Response} from "express";
import {ApiError} from "../lib/error";
import {CustomRequest} from "../types";

const errorMiddleware = (
	err: Error | ApiError,
	req: CustomRequest,
	res: Response,
	next: NextFunction
) => {
	console.log(err);

	if (err instanceof ApiError) {
		res.status(err.status).json({message: err.message});
	} else {
		res.status(500).json({message: "Something went wrong."});
	}
};

export default errorMiddleware;
