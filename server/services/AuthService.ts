import bcryptjs from "bcryptjs";
import {UserDto} from "../lib/dtos";
import {ApiErrorFactory} from "../lib/error";
import {TokenGenerator, TokenVerificator} from "../lib/token";
import stripe from "../stripe";
import CustomerService from "./CustomerService";
import RefreshTokenService from "./RefreshTokenService";
import UserService from "./UserService";

interface SignUpData {
	fullName: string;
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
		fullName
	}: SignUpData): Promise<SignUpReturn> {
		const candidate = await UserService.getByEmail(email);

		const candidateExists = candidate != null;
		if (candidateExists) {
			throw ApiErrorFactory.getBadRequest(
				`User with email of ${email} already exists.`
			);
		}

		const hashedPassword = await bcryptjs.hash(password, 16);
		const user = await UserService.create({
			email,
			fullName,
			password: hashedPassword
		});

		const customer = await stripe.customers.create({
			email,
			name: fullName
		});
		await CustomerService.create({_id: customer.id, user: user._id.toString()});

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
			throw ApiErrorFactory.getBadRequest(
				`User with email of ${email} doesn't exist.`
			);
		}

		const passwordIsWrong = !(await bcryptjs.compare(
			password,
			candidate.password
		));
		if (passwordIsWrong) {
			throw ApiErrorFactory.getBadRequest("Wrong password.");
		}

		const userDto = new UserDto(candidate);

		const tokens = TokenGenerator.generateAccessAndRefreshPair({...userDto});
		await RefreshTokenService.saveForUser(userDto.id, tokens.refresh);

		return {user: userDto, tokens};
	}

	static async refresh(refreshToken: string) {
		if (!refreshToken) {
			throw ApiErrorFactory.getUnauthorized();
		}

		const userPayload = TokenVerificator.verifyRefresh<UserDto>(refreshToken);
		const tokenFromDb = await RefreshTokenService.getByToken(refreshToken);
		if (!userPayload || !tokenFromDb) {
			throw ApiErrorFactory.getUnauthorized();
		}

		const user = await UserService.getById(userPayload.id);
		if (user == null) {
			throw ApiErrorFactory.getUnauthorized();
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
