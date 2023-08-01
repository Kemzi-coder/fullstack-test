import bcryptjs from "bcryptjs";
import {Customer, RefreshToken, User} from "../../db/models";
import {UserDto} from "../../lib/dtos";
import {ApiErrorFactory} from "../../lib/error";
import {TokenGenerator, TokenVerificator} from "../../lib/token";
import stripe from "../../stripe";
import {SignInData, SignInReturn, SignUpData, SignUpReturn} from "./types";

class AuthService {
	static async signUp({
		email,
		password,
		fullName
	}: SignUpData): Promise<SignUpReturn> {
		const candidate = await User.getByEmail(email);

		const candidateExists = candidate != null;
		if (candidateExists) {
			throw ApiErrorFactory.getBadRequest(
				`User with email of ${email} already exists.`
			);
		}

		const hashedPassword = await bcryptjs.hash(password, 16);
		const user = await User.create({email, fullName, password: hashedPassword});

		const customer = await stripe.customers.create({
			email,
			name: fullName
		});
		await Customer.create({customerId: customer.id, userId: user._id});

		const userDto = new UserDto(user);

		const tokens = TokenGenerator.generateAccessAndRefreshPair({...userDto});
		await RefreshToken.upsertForUser(userDto.id, tokens.refresh);

		return {user: userDto, tokens};
	}

	static async signIn({email, password}: SignInData): Promise<SignInReturn> {
		const candidate = await User.getByEmail(email);

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
		await RefreshToken.upsertForUser(userDto.id, tokens.refresh);

		return {user: userDto, tokens};
	}

	static async refresh(refreshToken: string): Promise<SignInReturn> {
		if (!refreshToken) {
			throw ApiErrorFactory.getUnauthorized();
		}

		const userPayload = TokenVerificator.verifyRefresh<UserDto>(refreshToken);
		const tokenFromDb = await RefreshToken.getByToken(refreshToken);
		if (!userPayload || !tokenFromDb) {
			throw ApiErrorFactory.getUnauthorized();
		}

		const user = await User.getById(userPayload.id);
		if (user == null) {
			throw ApiErrorFactory.getUnauthorized();
		}

		const userDto = new UserDto(user);

		const tokens = TokenGenerator.generateAccessAndRefreshPair({...userDto});
		await RefreshToken.upsertForUser(userDto.id, tokens.refresh);

		return {user: userDto, tokens};
	}

	static async signOut(refreshToken: string): Promise<void> {
		await RefreshToken.deleteByToken(refreshToken);
	}
}

export type {SignUpData};
export default AuthService;
