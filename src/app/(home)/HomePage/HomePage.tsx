"use client";

import {useAuthContext} from "@/providers";
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
import {useCallback, useEffect, useState} from "react";
import PaymentTable from "../PaymentTable/PaymentTable";
import ProductList from "../ProductList/ProductList";
import SubscriptionTable from "../SubscriptionTable/SubscriptionTable";
import styles from "./HomePage.module.scss";

const HomePage = () => {
	const {fetchWithAuth} = useAuthContext();
	const [isFetching, setIsFetching] = useState(false);
	const [products, setProducts] = useState<Product[]>([]);
	const [payments, setPayments] = useState<Payment[]>([]);
	const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
	const [error, setError] = useState<Error | null>(null);

	const fetchProducts = useCallback(async () => {
		const response = await fetch("/api/product", {
			next: {revalidate: 60}
		});

		if (!response.ok) {
			throw new Error("Error fetching products.");
		}

		const data: ProductFromApi[] = await response.json();
		setProducts(data.map(product => mapProductFromApi(product)));
	}, []);

	const fetchPayments = useCallback(async () => {
		const response = await fetchWithAuth("/api/user/payments", {
			next: {revalidate: 60}
		});

		if (!response.ok) {
			throw new Error("Error fetching payments.");
		}

		const data: PaymentFromApi[] = await response.json();
		setPayments(data.map(payment => mapPaymentFromApi(payment)));
	}, [fetchWithAuth]);

	const fetchSubscriptions = useCallback(async () => {
		const response = await fetchWithAuth("/api/user/subscriptions", {
			next: {revalidate: 60}
		});

		if (!response.ok) {
			throw new Error("Error fetching subscriptions.");
		}

		const data: SubscriptionFromApi[] = await response.json();
		setSubscriptions(
			data.map(subscription => mapSubscriptionFromApi(subscription))
		);
	}, [fetchWithAuth]);

	useEffect(() => {
		const fetchAll = async () => {
			setIsFetching(true);
			try {
				await Promise.all([
					fetchProducts(),
					fetchPayments(),
					fetchSubscriptions()
				]);
			} catch (e) {
				console.log(e);
				setError(new Error("Error fetching data."));
			} finally {
				setIsFetching(false);
			}
		};
		fetchAll();
	}, [fetchPayments, fetchProducts, fetchSubscriptions]);

	if (isFetching) {
		return <div>Loading...</div>;
	}

	if (error) {
		throw error;
	}

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
