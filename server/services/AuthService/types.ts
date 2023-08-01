import {UserDto} from "../../lib/dtos";

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

export type {SignInData, SignInReturn, SignUpData, SignUpReturn};
