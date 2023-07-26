"use client";

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
import {User} from "@/types";
import {toast} from "react-toastify";

interface AuthContextValue {
	isAuth: boolean;
	user: User | null;
	signUp: (data: SignupData) => void;
	signIn: (data: SigninData) => void;
	signOut: () => void;
	fetchWithAuth: (
		input: URL | RequestInfo,
		init?: RequestInit
	) => Promise<Response>;
}

const AuthContext = createContext<AuthContextValue>({
	isAuth: false,
	user: null,
	signUp: () => {},
	signIn: () => {},
	signOut: () => {},
	fetchWithAuth: () => Promise.resolve(new Response())
});

const AuthProvider = ({children}: {children: ReactNode}) => {
	const [isAuth, setIsAuth] = useState(false);
	const [user, setUser] = useState(null);
	const [isFetching, setIsFetching] = useState(true);

	useEffect(() => {
		const tokenExists = !!localStorage.getItem("token");
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
					localStorage.setItem("token", tokens.access);
					setUser(user);
					setIsAuth(true);
				} catch (e: unknown) {
					console.error(e);
					toast.error(e instanceof Error ? e.message : "Something went wrong.");
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
		localStorage.setItem("token", resData.tokens.access);
		setUser(resData.user);
		setIsAuth(true);

		return resData;
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
		localStorage.setItem("token", tokens.access);
		setUser(user);
		setIsAuth(true);
	}, []);

	const fetchWithAuth = useCallback(
		(input: URL | RequestInfo, init?: RequestInit): Promise<Response> => {
			return fetch(input, {
				...init,
				headers: {
					...init?.headers,
					Authorization: `Bearer ${localStorage.getItem("token")}`
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

		localStorage.removeItem("token");
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

export {useAuthContext, AuthProvider};
