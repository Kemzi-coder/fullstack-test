"use client";

import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import SignupForm from "../SignupForm/SignupForm";

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const SignupPage = () => {
	return (
		<Elements stripe={stripePromise}>
			<SignupForm />
		</Elements>
	);
};

export default SignupPage;
