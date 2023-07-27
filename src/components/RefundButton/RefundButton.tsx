"use client";

import {usePaymentContext} from "@/providers";
import {FC, useState} from "react";
import {toast} from "react-toastify";
import {Button} from "../ui";

interface Props {
	paymentId: string;
}

const RefundButton: FC<Props> = ({paymentId}) => {
	const {refundPayment} = usePaymentContext();
	const [isFetching, setIsFetching] = useState(false);

	const handleRefund = async () => {
		setIsFetching(true);
		try {
			await refundPayment(paymentId);

			toast.success("Payment refunded. It may take a few days.")
		} catch (e: unknown) {
			console.error(e);
			toast.error(e instanceof Error ? e.message : "Something went wrong.");
		} finally {
			setIsFetching(false);
		}
	};

	return (
		<Button onClick={handleRefund} disabled={isFetching}>
			Refund
		</Button>
	);
};

export default RefundButton;
