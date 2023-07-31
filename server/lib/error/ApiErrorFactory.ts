import ApiError from "./ApiError";

class ApiErrorFactory {
	static getUnauthorized(message = "User is not authorized.") {
		return new ApiError(401, message);
	}

	static getBadRequest(message = "Bad request.") {
		return new ApiError(400, message);
	}

	static getInternalServer(message = "Something went wrong.") {
		return new ApiError(500, message);
	}

	static getForbidden(message = "Access denied.") {
		return new ApiError(403, message);
	}
}

export default ApiErrorFactory;
