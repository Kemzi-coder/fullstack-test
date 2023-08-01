import {Payment, Subscription} from "../db/models";

class UserService {
	static async getPaymentsByCustomerId(customerId: string) {
		const payments = await Payment.getByCustomerId(customerId);
		return payments;
	}

	static async getSubscriptionsByCustomerId(customerId: string) {
		const subscriptions = await Subscription.getByCustomerId(customerId);
		return subscriptions;
	}
}

export default UserService;
