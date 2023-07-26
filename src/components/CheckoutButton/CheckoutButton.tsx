"use client";

import React, {FC, useState} from "react";
import Button from "../ui/Button/Button";
import {usePaymentContext} from "@/providers";
import {toast} from "react-toastify";

interface Props {
	priceIds: string[];
}

const CheckoutButton: FC<Props> = ({priceIds}) => {
	const {createCheckoutSession} = usePaymentContext();
	const [isFetching, setIsFetching] = useState(false);

	const handleCheckout = async () => {
		setIsFetching(true);
		try {
			const sessionUrl = await createCheckoutSession(priceIds);
			window.open(sessionUrl);
		} catch (e: unknown) {
			console.error(e);
			toast.error(e instanceof Error ? e.message : "Something went wrong.");
		} finally {
			setIsFetching(false);
		}
	};

	return (
		<Button onClick={handleCheckout} disabled={isFetching}>
			Checkout
		</Button>
	);
};

export default CheckoutButton;
