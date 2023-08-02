"use client";

import {User} from "@/types";
import {deleteCookie, getCookie, setCookie} from "cookies-next";
import {
	ReactNode,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState
} from "react";
import {SigninData, SignupData} from "./types";

interface AuthContextValue {
	isAuth: boolean;
	user: User | null;
	signUp: (data: SignupData) => Promise<void>;
	signIn: (data: SigninData) => Promise<void>;
	signOut: () => void;
	fetchWithAuth: (
		input: URL | RequestInfo,
		init?: RequestInit
	) => Promise<Response>;
}

const AuthContext = createContext<AuthContextValue>({
	isAuth: false,
	user: null,
	signUp: () => Promise.resolve(),
	signIn: () => Promise.resolve(),
	signOut: () => {},
	fetchWithAuth: () => Promise.resolve(new Response())
});

const AuthProvider = ({children}: {children: ReactNode}) => {
	const [isAuth, setIsAuth] = useState(false);
	const [user, setUser] = useState(null);
	const [isFetching, setIsFetching] = useState(true);

	useEffect(() => {
		const tokenExists = !!getCookie("token");
		if (tokenExists) {
			const refresh = async () => {
				try {
					const response = await fetch("/api/auth/refresh", {
						method: "POST"
					});

					if (!response.ok) {
						throw new Error("Authorization error.");
					}

					const {user, tokens} = await response.json();

					setCookie("token", tokens.access, {
						maxAge: 30 * 24 * 60 * 60 * 1000
					});
					setUser(user);
					setIsAuth(true);
				} catch (e: unknown) {
					console.error(e);
				} finally {
					setIsFetching(false);
				}
			};
			refresh();
		} else {
			setIsFetching(false);
		}
	}, []);

	const signUp = useCallback(async (data: SignupData) => {
		const response = await fetch("/api/auth/signup", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {"Content-Type": "application/json"}
		});

		if (!response.ok) {
			throw new Error("Error signing up.");
		}

		const resData = await response.json();
		setCookie("token", resData.tokens.access, {
			maxAge: 30 * 24 * 60 * 60 * 1000
		});
		setUser(resData.user);
		setIsAuth(true);
	}, []);

	const signIn = useCallback(async (data: SigninData) => {
		const response = await fetch("/api/auth/signin", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {"Content-Type": "application/json"}
		});

		if (!response.ok) {
			throw new Error("Error signing in.");
		}

		const {user, tokens} = await response.json();
		setCookie("token", tokens.access, {
			maxAge: 30 * 24 * 60 * 60 * 1000
		});
		setUser(user);
		setIsAuth(true);
	}, []);

	const fetchWithAuth = useCallback(
		(input: URL | RequestInfo, init?: RequestInit): Promise<Response> => {
			return fetch(input, {
				...init,
				headers: {
					...init?.headers,
					Authorization: `Bearer ${getCookie("token")}`
				}
			});
		},
		[]
	);

	const signOut = useCallback(async () => {
		const response = await fetchWithAuth("/api/auth/signout", {
			method: "POST"
		});

		if (!response.ok) {
			throw new Error("Error signing out.");
		}

		deleteCookie("token");
		setUser(null);
		setIsAuth(false);
	}, [fetchWithAuth]);

	const value = useMemo(
		() => ({
			isAuth,
			user,
			signUp,
			signIn,
			signOut,
			fetchWithAuth
		}),
		[fetchWithAuth, isAuth, signIn, signOut, signUp, user]
	);

	return (
		<AuthContext.Provider value={value}>
			{isFetching ? <div>Loading...</div> : children}
		</AuthContext.Provider>
	);
};

const useAuthContext = () => useContext(AuthContext);

export {AuthProvider, useAuthContext};
