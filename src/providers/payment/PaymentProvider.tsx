"use client";

import {
	ReactNode,
	createContext,
	useCallback,
	useContext,
	useMemo
} from "react";
import {useAuthContext} from "../auth";

interface PaymentContextValue {
	setUpPayment: () => Promise<string>;
	createCheckoutSession: (priceIds: string[]) => Promise<string>;
	refundPayment: (paymentId: string) => Promise<void>;
}

const PaymentContext = createContext<PaymentContextValue>({
	setUpPayment: () => Promise.resolve(""),
	createCheckoutSession: () => Promise.resolve(""),
	refundPayment: () => Promise.resolve()
});

const PaymentProvider = ({children}: {children: ReactNode}) => {
	const {fetchWithAuth} = useAuthContext();

	const setUpPayment = useCallback(async () => {
		const response = await fetchWithAuth("/api/payment/setup", {
			method: "POST"
		});

		if (!response.ok) {
			throw new Error("Error adding payment method.");
		}

		const {clientSecret} = await response.json();
		return clientSecret as string;
	}, [fetchWithAuth]);

	const createCheckoutSession = useCallback(
		async (priceIds: string[]) => {
			const response = await fetchWithAuth(
				"/api/payment/create-checkout-session",
				{
					method: "POST",
					body: JSON.stringify({priceIds}),
					headers: {"Content-Type": "application/json"}
				}
			);

			if (!response.ok) {
				throw new Error("Error creating checkout session.");
			}

			const {sessionUrl} = await response.json();
			return sessionUrl as string;
		},
		[fetchWithAuth]
	);

	const refundPayment = useCallback(
		async (paymentId: string) => {
			const response = await fetchWithAuth(`/api/payment/refund/${paymentId}`, {
				method: "POST"
			});

			if (!response.ok) {
				throw new Error("Error creating refund.");
			}
		},
		[fetchWithAuth]
	);

	const value = useMemo(
		() => ({setUpPayment, createCheckoutSession, refundPayment}),
		[setUpPayment, createCheckoutSession, refundPayment]
	);

	return (
		<PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
	);
};

const usePaymentContext = () => useContext(PaymentContext);

export {PaymentProvider, usePaymentContext};
