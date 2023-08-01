import {Subscription, SubscriptionFromApi} from "@/types";

const mapSubscriptionFromApi = (
	subscription: SubscriptionFromApi
): Subscription => {
	return {
		id: subscription._id,
		subscriptionId: subscription.subscriptionId,
		currentPeriodEnd: subscription.currentPeriodEnd,
		customerId: subscription.customerId,
		status: subscription.status
	};
};

export default mapSubscriptionFromApi;
