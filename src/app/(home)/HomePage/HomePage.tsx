import {
	Payment,
	PaymentFromApi,
	Product,
	ProductFromApi,
	Subscription,
	SubscriptionFromApi
} from "@/types";
import {
	mapPaymentFromApi,
	mapProductFromApi,
	mapSubscriptionFromApi
} from "@/utils/helpers";
import {cookies} from "next/headers";
import PaymentTable from "../PaymentTable/PaymentTable";
import ProductList from "../ProductList/ProductList";
import styles from "./HomePage.module.scss";
import SubscriptionTable from "../SubscriptionTable/SubscriptionTable";

const fetchProducts = async (): Promise<Product[]> => {
	const response = await fetch(`${process.env.APP_URL}/api/product`, {
		next: {revalidate: 60}
	});

	if (!response.ok) {
		throw new Error("Error fetching products.");
	}

	const data: ProductFromApi[] = await response.json();
	return data.map(product => mapProductFromApi(product));
};

const fetchPayments = async (): Promise<Payment[]> => {
	const cookieStore = cookies();
	const token = cookieStore.get("token")?.value;

	const response = await fetch(`${process.env.APP_URL}/api/user/payments`, {
		headers: {Authorization: `Bearer ${token}`},
		next: {revalidate: 60}
	});

	if (!response.ok) {
		throw new Error("Error fetching payments.");
	}

	const data: PaymentFromApi[] = await response.json();
	return data.map(payment => mapPaymentFromApi(payment));
};

const fetchSubscriptions = async (): Promise<Subscription[]> => {
	const cookieStore = cookies();
	const token = cookieStore.get("token")?.value;

	const response = await fetch(
		`${process.env.APP_URL}/api/user/subscriptions`,
		{headers: {Authorization: `Bearer ${token}`}, next: {revalidate: 60}}
	);

	if (!response.ok) {
		throw new Error("Error fetching subscriptions.");
	}

	const data: SubscriptionFromApi[] = await response.json();
	return data.map(subscription => mapSubscriptionFromApi(subscription));
};

const HomePage = async () => {
	const [products, payments, subscriptions] = await Promise.all([
		fetchProducts(),
		fetchPayments(),
		fetchSubscriptions()
	]);

	return (
		<section className={styles.section}>
			<div className="container">
				<div className={styles.item}>
					<h1 className={styles.title}>Products</h1>
					<ProductList products={products} />
				</div>
				<div className={styles.item}>
					<h1 className={styles.title}>Payments</h1>
					<PaymentTable payments={payments} />
				</div>
				<div className={styles.item}>
					<h1 className={styles.title}>Subscriptions</h1>
					<SubscriptionTable subscriptions={subscriptions} />
				</div>
			</div>
		</section>
	);
};

export default HomePage;
