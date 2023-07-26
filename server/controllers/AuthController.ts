import {NextFunction, Response} from "express";
import {AuthService} from "../services";
import {CustomRequest} from "../types";

class AuthController {
	static async signUp(req: CustomRequest, res: Response, next: NextFunction) {
		try {
			const {email, password, fullName} = req.body;

			const {user, tokens} = await AuthService.signUp({
				email,
				password,
				fullName
			});

			res.cookie("refreshToken", tokens.refresh, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true
			});
			res.json({user, tokens});
		} catch (e) {
			next(e);
		}
	}

	static async signIn(req: CustomRequest, res: Response, next: NextFunction) {
		try {
			const {email, password} = req.body;

			const {user, tokens} = await AuthService.signIn({
				email,
				password
			});

			res.cookie("refreshToken", tokens.refresh, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true
			});
			res.json({user, tokens});
		} catch (e) {
			next(e);
		}
	}

	static async refresh(req: CustomRequest, res: Response, next: NextFunction) {
		try {
			const {refreshToken} = req.cookies;

			const {user, tokens} = await AuthService.refresh(refreshToken);

			res.cookie("refreshToken", tokens.refresh, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true
			});
			res.json({user, tokens});
		} catch (e) {
			next(e);
		}
	}

	static async signOut(req: CustomRequest, res: Response, next: NextFunction) {
		try {
			const {refreshToken} = req.cookies;

			await AuthService.signOut(refreshToken);

			res.clearCookie("refreshToken");
			res.json({success: true});
		} catch (e) {
			next(e);
		}
	}
}

export default AuthController;
