"use client";

import {useAuthContext} from "@/providers";
import React from "react";

const UserInfo = () => {
	const {isAuth, user} = useAuthContext();

	if (!isAuth) {
		return null;
	}

	return <div>{user?.fullName || "Unknown user"}</div>;
};

export default UserInfo;
