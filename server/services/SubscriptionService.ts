import {connectToDb} from "../db";
import {Subscription, SubscriptionFromDb} from "../db/models";

class SubscriptionService {
	static COLLECTION_NAME = "subscriptions";

	static async create(subscription: Subscription): Promise<SubscriptionFromDb> {
		const collection = await SubscriptionService._connectToCollection();

		await collection.insertOne(subscription);

		const createdSubscription = await SubscriptionService.getById(
			subscription._id
		);
		return createdSubscription!;
	}

	static async updateById(
		id: string,
		subscription: Partial<Subscription>
	): Promise<SubscriptionFromDb> {
		const collection = await SubscriptionService._connectToCollection();

		await collection.updateOne({_id: id}, {$set: subscription});

		const updatedSubscription = await SubscriptionService.getById(id);
		return updatedSubscription!;
	}

	static async getById(id: string): Promise<SubscriptionFromDb | null> {
		const collection = await SubscriptionService._connectToCollection();
		return collection.findOne({_id: id});
	}

	static async getByCustomerId(id: string): Promise<SubscriptionFromDb[]> {
		const collection = await SubscriptionService._connectToCollection();
		return collection.find({customer: id}).toArray();
	}

	static async _connectToCollection() {
		const db = await connectToDb();
		const collection = db.collection<Subscription>(
			SubscriptionService.COLLECTION_NAME
		);
		return collection;
	}
}

export default SubscriptionService;
