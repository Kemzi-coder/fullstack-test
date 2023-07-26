"use client";

import {useAuthContext} from "@/providers";
import {useRouter} from "next/navigation";
import {ReactNode, useEffect} from "react";

const AuthProtection = ({children}: {children: ReactNode}) => {
	const {isAuth} = useAuthContext();
	const router = useRouter();

	useEffect(() => {
		if (!isAuth) {
			router.replace("/auth/signup");
		}
	}, [isAuth, router]);

	return <>{children}</>;
};

export default AuthProtection;
