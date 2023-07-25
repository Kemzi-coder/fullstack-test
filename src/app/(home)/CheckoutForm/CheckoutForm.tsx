import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {FormEvent, useState} from "react";
import {toast} from "react-toastify";
import {Button} from "@/components/ui";
import styles from "./CheckoutForm.module.scss";

const CheckoutForm = () => {
	const stripe = useStripe();
	const elements = useElements();

	const [isFetching, setIsFetching] = useState(false);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const stripeIsNotLoaded = !stripe || !elements;
		if (stripeIsNotLoaded) {
			return;
		}

		setIsFetching(true);

		const {error, paymentIntent} = await stripe.confirmPayment({
			elements,
			confirmParams: {return_url: ""},
			redirect: "if_required"
		});

		if (error) {
			const isValidationOrCardError =
				error.type === "validation_error" || error.type === "card_error";
			const errorMessage = isValidationOrCardError
				? error.message
				: "Something went wrong.";
			toast.error(errorMessage);
		} else if (paymentIntent?.status === "succeeded") {
			toast.success("Payment succeeded!");
		}

		setIsFetching(false);
	};

	return (
		<form onSubmit={handleSubmit}>
			<PaymentElement className={styles.payment} />
			<Button
				className={styles.button}
				isSubmit
				disabled={!stripe || isFetching}>
				Submit
			</Button>
		</form>
	);
};

export default CheckoutForm;
