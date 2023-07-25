import jwt from "jsonwebtoken";

class TokenGenerator {
	static generateAccessAndRefreshPair(payload: string | object) {
		const access = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {
			expiresIn: "30m"
		});
		const refresh = jwt.sign(
			payload,
			process.env.JWT_REFRESH_SECRET as string,
			{
				expiresIn: "30d"
			}
		);

		return {access, refresh};
	}
}

export default TokenGenerator;
