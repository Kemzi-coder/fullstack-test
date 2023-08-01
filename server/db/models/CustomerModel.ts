import {ObjectId, WithId} from "mongodb";
import Model from "../lib/Model";

interface CustomerToDb {
	customerId: string;
	userId: ObjectId;
}

class CustomerModel extends Model<CustomerToDb> {
	constructor() {
		super({collectionName: "customers"});
	}

	async getByCustomerId(
		customerId: CustomerToDb["customerId"]
	): Promise<WithId<CustomerToDb> | null> {
		return super.getOne({customerId});
	}

	async getByUserId(
		userId: ObjectId | string
	): Promise<WithId<CustomerToDb> | null> {
		return super.getOne({userId: new ObjectId(userId)});
	}
}

export type {CustomerToDb};
export default CustomerModel;
