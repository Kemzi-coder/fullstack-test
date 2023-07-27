import {connectToDb} from "../db";
import {Payment, PaymentFromDb} from "../db/models";

class PaymentService {
	static COLLECTION_NAME = "payments";

	static async create(payment: Payment): Promise<PaymentFromDb> {
		const collection = await PaymentService._connectToCollection();

		await collection.insertOne(payment);

		const createdPayment = await PaymentService.getById(payment._id);
		return createdPayment!;
	}

	static async updateById(id: string, payment: Partial<Payment>): Promise<PaymentFromDb> {
		const collection = await PaymentService._connectToCollection();

		await collection.updateOne({_id: id}, {$set: payment});

		const updatedPayment = await PaymentService.getById(id);
		return updatedPayment!;
	}

	static async getById(id: string): Promise<PaymentFromDb | null> {
		const collection = await PaymentService._connectToCollection();
		return collection.findOne({_id: id});
	}

	static async getByCustomerId(id: string): Promise<PaymentFromDb[]> {
		const collection = await PaymentService._connectToCollection();
		return collection.find({customer: id}).toArray();
	}

	static async _connectToCollection() {
		const db = await connectToDb();
		return db.collection<Payment>(PaymentService.COLLECTION_NAME);
	}
}

export default PaymentService;
