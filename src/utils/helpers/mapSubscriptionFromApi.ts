import {Subscription, SubscriptionFromApi} from "@/types";

const mapSubscriptionFromApi = (
	subscription: SubscriptionFromApi
): Subscription => {
	return {
		id: subscription._id,
		currentPeriodEnd: subscription.currentPeriodEnd,
		customer: subscription.customer,
		status: subscription.status
	};
};

export default mapSubscriptionFromApi;
