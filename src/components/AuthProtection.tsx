"use client";

import {useAuthContext} from "@/providers";
import {useRouter} from "next/navigation";
import {ReactNode, useEffect} from "react";

const AuthProtection = ({children}: {children: ReactNode}) => {
	const {isAuth} = useAuthContext();
	const router = useRouter();

	useEffect(() => {
		if (!isAuth) {
			router.push("/auth/signin");
		}
	}, [isAuth, router]);

	if (!isAuth) {
		return null;
	}

	return <>{children}</>;
};

export default AuthProtection;
