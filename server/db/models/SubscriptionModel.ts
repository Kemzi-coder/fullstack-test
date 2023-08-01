import {WithId} from "mongodb";
import Model from "../lib/Model";
import {CustomerToDb} from "./CustomerModel";

interface SubscriptionToDb {
	subscriptionId: string;
	customerId: string;
	status: string;
	currentPeriodEnd: string;
}

class SubscriptionModel extends Model<SubscriptionToDb> {
	constructor() {
		super({collectionName: "subscriptions"});
	}

	async updateBySubscriptionId(
		subscriptionId: SubscriptionToDb["subscriptionId"],
		data: Partial<SubscriptionToDb>
	): Promise<WithId<SubscriptionToDb> | null> {
		return super.updateOne({subscriptionId}, data);
	}

	async getByCustomerId(
		customerId: CustomerToDb["customerId"]
	): Promise<WithId<SubscriptionToDb>[]> {
		return super.getMany({customerId});
	}
}

export type {SubscriptionToDb};
export default SubscriptionModel;
