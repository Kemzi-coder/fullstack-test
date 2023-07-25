"use client";

import styles from "./HomePage.module.scss";
import vars from "@/app/variables.module.scss";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {useEffect, useState} from "react";
import CheckoutForm from "../CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const HomePage = () => {
	const [clientSecret, setClientSecret] = useState<string | null>(null);

	useEffect(() => {
		const createPaymentIntent = async () => {
			const response = await fetch("/api/secret");

			if (!response.ok) {
				throw new Error("Error creating payment intent.");
			}

			const data = await response.json();
			setClientSecret(data.clientSecret);
		};
		createPaymentIntent();
	}, []);

	if (!clientSecret) {
		return null;
	}

	const options = {
		clientSecret,
		appearance: {variables: {colorPrimary: vars.secondaryColor}}
	};
	return (
		<Elements stripe={stripePromise} options={options}>
			<section className={styles.section}>
				<div className="container">
					<h1 className={styles.title}>Payment Creation</h1>
					<div className={styles.content}>
						<CheckoutForm />
					</div>
				</div>
			</section>
		</Elements>
	);
};

export default HomePage;
