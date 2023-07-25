import CheckoutForm from "@/components/CheckoutForm/CheckoutForm";
import styles from "@/styles/Home.module.scss";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import Head from "next/head";
import {FC} from "react";
import vars from "@/styles/variables.module.scss";

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export const getServerSideProps = async () => {
	const response = await fetch(`${process.env.APP_URL}/api/secret`);

	if (!response.ok) {
		console.error("Error fetching client secret.");
	}

	const data = await response.json();
	return {props: {clientSecret: data.clientSecret}};
};

interface Props {
	clientSecret: string;
}

const Home: FC<Props> = ({clientSecret}) => {
	const options = {
		clientSecret,
		appearance: {variables: {colorPrimary: vars.secondaryColor}}
	};
	return (
		<>
			<Head>
				<title>Payment Page</title>
			</Head>
			<Elements stripe={stripePromise} options={options}>
				<main>
					<section className={styles.section}>
						<div className="container">
							<h1 className={styles.title}>Payment Creation</h1>
							<div className={styles.content}>
								<CheckoutForm />
							</div>
						</div>
					</section>
				</main>
			</Elements>
		</>
	);
};

export default Home;
