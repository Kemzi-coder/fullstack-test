import {WithId} from "mongodb";
import Model from "../lib/Model";
import {CustomerToDb} from "./CustomerModel";

interface PaymentToDb {
	paymentId: string;
	amount: number;
	currency: string;
	createdAt: string;
	status: string;
	description: string;
	customerId: string;
	refunded: boolean;
}

class PaymentModel extends Model<PaymentToDb> {
	constructor() {
		super({collectionName: "payments"});
	}

	async updateByPaymentId(
		paymentId: PaymentToDb["paymentId"],
		data: Partial<PaymentToDb>
	): Promise<WithId<PaymentToDb> | null> {
		return super.updateOne({paymentId}, data);
	}

	async getByPaymentId(
		paymentId: PaymentToDb["paymentId"]
	): Promise<WithId<PaymentToDb> | null> {
		return super.getOne({paymentId});
	}

	async getByCustomerId(
		customerId: CustomerToDb["customerId"]
	): Promise<WithId<PaymentToDb>[]> {
		return super.getMany({customerId});
	}
}

export type {PaymentToDb};
export default PaymentModel;
