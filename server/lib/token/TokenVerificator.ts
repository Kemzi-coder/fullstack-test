import jwt from "jsonwebtoken";

class TokenVerificator {
	static verifyAccess<Payload>(token: string): Payload {
		return this._verifyWithSecretKey(
			token,
			process.env.JWT_ACCESS_SECRET as string
		) as Payload;
	}

	static verifyRefresh<Payload>(token: string): Payload {
		return this._verifyWithSecretKey(
			token,
			process.env.JWT_REFRESH_SECRET as string
		) as Payload;
	}

	static _verifyWithSecretKey(token: string, key: string) {
		try {
			const payload = jwt.verify(token, key);
			return payload;
		} catch (e) {
			return null;
		}
	}
}

export default TokenVerificator;
