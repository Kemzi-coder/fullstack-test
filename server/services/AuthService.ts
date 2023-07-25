import bcryptjs from "bcryptjs";
import {UserDto} from "../lib/dtos";
import {TokenGenerator, TokenVerificator} from "../lib/token";
import {ApiError} from "../lib/error";
import RefreshTokenService from "./RefreshTokenService";
import UserService from "./UserService";

interface SignUpData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

interface SignUpReturn {
	user: UserDto;
	tokens: {access: string; refresh: string};
}

interface SignInData {
	email: string;
	password: string;
}

interface SignInReturn {
	user: UserDto;
	tokens: {access: string; refresh: string};
}

class AuthService {
	static async signUp({
		email,
		password,
		firstName,
		lastName
	}: SignUpData): Promise<SignUpReturn> {
		const candidate = await UserService.getByEmail(email);

		const candidateExists = candidate != null;
		if (candidateExists) {
			throw new ApiError(400, `User with email of ${email} already exists.`);
		}

		const hashedPassword = await bcryptjs.hash(password, 16);
		const user = await UserService.create({
			email,
			firstName,
			lastName,
			password: hashedPassword
		});

		const userDto = new UserDto(user);
		const tokens = await TokenGenerator.generateAccessAndRefreshPair({
			...userDto
		});
		await RefreshTokenService.saveForUser(userDto.id, tokens.refresh);

		return {user: userDto, tokens};
	}

	static async signIn({email, password}: SignInData): Promise<SignInReturn> {
		const candidate = await UserService.getByEmail(email);

		const candidateDoesNotExist = candidate == null;
		if (candidateDoesNotExist) {
			throw new ApiError(400, `User with email of ${email} doesn't exist.`);
		}

		const passwordIsWrong = !(await bcryptjs.compare(
			password,
			candidate.password
		));
		if (passwordIsWrong) {
			throw new ApiError(400, "Wrong password.");
		}

		const userDto = new UserDto(candidate);
		const tokens = TokenGenerator.generateAccessAndRefreshPair({...userDto});
		await RefreshTokenService.saveForUser(userDto.id, tokens.refresh);

		return {user: userDto, tokens};
	}

	static async refresh(refreshToken: string) {
		if (!refreshToken) {
			throw new ApiError(401, "Unauthorized.");
		}

		const userPayload = TokenVerificator.verifyRefresh<UserDto>(refreshToken);
		const tokenFromDb = await RefreshTokenService.getByToken(refreshToken);
		if (!userPayload || !tokenFromDb) {
			throw new ApiError(401, "Unauthorized.");
		}

		const user = await UserService.getById(userPayload.id);
		if (user == null) {
			throw new ApiError(401, "Unauthorized.");
		}

		const userDto = new UserDto(user);
		const tokens = TokenGenerator.generateAccessAndRefreshPair({...userDto});
		await RefreshTokenService.saveForUser(userDto.id, tokens.refresh);

		return {user: userDto, tokens};
	}

	static async signOut(refreshToken: string) {
		await RefreshTokenService.deleteByToken(refreshToken);
	}
}

export type {SignUpData};
export default AuthService;
