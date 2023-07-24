class ApiError extends Error {
	status: number;

	constructor(status, message) {
		super(message);
		this.status = status;
	}
}

export default ApiError;
