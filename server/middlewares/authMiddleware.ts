import {NextFunction, Response} from "express";
import {UserDto} from "../lib/dtos";
import {TokenVerificator} from "../lib/token";
import {ApiError} from "../lib/error";
import {CustomRequest} from "../types";

const authMiddleware = (
	req: CustomRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const authorizationHeader = req.headers.authorization;
		if (!authorizationHeader) {
			throw new ApiError(401, "Unauthorized.");
		}

		const accessToken = authorizationHeader.split(" ")[1];
		if (!accessToken) {
			throw new ApiError(401, "Unauthorized.");
		}

		const userDto = TokenVerificator.verifyAccess<UserDto>(accessToken);
		if (!userDto) {
			throw new ApiError(401, "Unauthorized.");
		}

		req.user = userDto;
		next();
	} catch (e) {
		next(e);
	}
};

export default authMiddleware;
