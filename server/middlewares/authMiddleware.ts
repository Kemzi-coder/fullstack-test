import {NextFunction, Response} from "express";
import {UserDto} from "../lib/dtos";
import {ApiErrorFactory} from "../lib/error";
import {TokenVerificator} from "../lib/token";
import {CustomRequest} from "../types";

const authMiddleware = (
	req: CustomRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const authorizationHeader = req.headers.authorization;
		if (!authorizationHeader) {
			throw ApiErrorFactory.getUnauthorized();
		}

		const accessToken = authorizationHeader.split(" ")[1];
		if (!accessToken) {
			throw ApiErrorFactory.getUnauthorized();
		}

		const userDto = TokenVerificator.verifyAccess<UserDto>(accessToken);
		if (!userDto) {
			throw ApiErrorFactory.getUnauthorized();
		}

		req.user = userDto;
		next();
	} catch (e) {
		next(e);
	}
};

export default authMiddleware;
