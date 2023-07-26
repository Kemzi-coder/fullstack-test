class ApiError extends Error {
	status: number;

	constructor(status: number, message: string) {
		super(message);
		this.status = status;

		// Restore prototype chain
		Object.setPrototypeOf(this, ApiError.prototype);
	}
}

export default ApiError;
