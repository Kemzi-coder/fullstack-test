import {Payment, PaymentFromApi} from "@/types";

const mapPaymentFromApi = (payment: PaymentFromApi): Payment => {
	return {
		id: payment._id,
		amount: payment.amount,
		createdAt: payment.createdAt,
		description: payment.description,
		status: payment.status,
		currency: payment.currency,
		refunded: payment.refunded
	};
};

export default mapPaymentFromApi;
