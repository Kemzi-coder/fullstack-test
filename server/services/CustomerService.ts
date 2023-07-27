import {ObjectId} from "mongodb";
import {connectToDb} from "../db";
import {Customer, CustomerFromDb, CustomerToDb} from "../db/models";

class CustomerService {
	static COLLECTION_NAME = "customers";

	static async create(customer: Customer): Promise<CustomerFromDb> {
		const collection = await CustomerService._connectToCollection();

		await collection.insertOne({
			...customer,
			user: new ObjectId(customer.user)
		});

		const createdCustomer = await CustomerService.getById(customer._id);
		return createdCustomer!;
	}

	static async getByUserId(id: string): Promise<CustomerFromDb | null> {
		const collection = await CustomerService._connectToCollection();
		return collection.findOne({user: new ObjectId(id)});
	}

	static async getById(id: string): Promise<CustomerFromDb | null> {
		const collection = await CustomerService._connectToCollection();
		return collection.findOne({_id: id});
	}

	static async _connectToCollection() {
		const db = await connectToDb();
		const collection = db.collection<CustomerToDb>(
			CustomerService.COLLECTION_NAME
		);
		return collection;
	}
}

export default CustomerService;
