import "@/styles/global.scss";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import type {AppProps} from "next/app";
import {useEffect, useState} from "react";
import {ToastContainer} from "react-toastify";

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const App = ({Component, pageProps}: AppProps) => {
	const [clientSecret, setClientSecret] = useState(null);

	useEffect(() => {
		const fetchClientSecret = async () => {
			const response = await fetch("/api/secret");

			if (!response.ok) {
				console.error("Error fetching client secret.");
			}

			const data = await response.json();
			setClientSecret(data.clientSecret);
		};
		fetchClientSecret();
	});

	return clientSecret ? (
		<Elements stripe={stripePromise} options={{clientSecret}}>
			<Component {...pageProps} />
			<ToastContainer />
		</Elements>
	) : null;
};

export default App;
