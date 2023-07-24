import {NextFunction, Request, Response} from "express";
import {ApiError} from "../error";

const errorMiddleware = (
	err: Error | ApiError,
	req: Request,
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
