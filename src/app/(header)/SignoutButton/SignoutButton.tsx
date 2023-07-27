"use client";

import {Button} from "@/components/ui";
import {useAuthContext} from "@/providers";
import React, {useState} from "react";
import {toast} from "react-toastify";

const SignoutButton = () => {
	const {signOut, isAuth} = useAuthContext();
	const [isFetching, setIsFetching] = useState(false);

	const handleSignout = async () => {
		setIsFetching(true);
		try {
			await signOut();

			toast.success("Signed out successfully.");
		} catch (e) {
			console.error(e);
			toast.error(e instanceof Error ? e.message : "Something went wrong.");
		} finally {
			setIsFetching(false);
		}
	};

	if (!isAuth) {
		return null;
	}

	return (
		<Button onClick={handleSignout} disabled={isFetching}>
			Sign out
		</Button>
	);
};

export default SignoutButton;
