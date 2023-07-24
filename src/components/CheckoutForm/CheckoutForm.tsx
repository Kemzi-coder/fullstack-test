import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {FormEvent} from "react";
import styles from "./CheckoutForm.module.scss";
import {toast} from "react-toastify";

const CheckoutForm = () => {
	const stripe = useStripe();
	const elements = useElements();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const stripeIsNotLoaded = !stripe || !elements;
		if (stripeIsNotLoaded) {
			return;
		}

		const {error, paymentIntent} = await stripe.confirmPayment({
			elements,
			confirmParams: {return_url: "https://example.com"},
			redirect: "if_required"
		});

		if (error) {
			console.error(error);
			toast.error("Payment failed");
		} else if (paymentIntent && paymentIntent.status === "succeeded") {
			toast.success("Payment successful");
		} else {
			toast.error("Payment failed");
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<PaymentElement className={styles.payment} />
			<button disabled={!stripe}>Submit</button>
		</form>
	);
};

export default CheckoutForm;
