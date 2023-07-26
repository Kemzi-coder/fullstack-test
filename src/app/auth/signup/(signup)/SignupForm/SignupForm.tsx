import vars from "@/app/variables.module.scss";
import {Button, FormField, Input, Link} from "@/components/ui";
import {SignupData, useAuthContext, usePaymentContext} from "@/providers";
import {
	AddressElement,
	CardElement,
	useElements,
	useStripe
} from "@stripe/react-stripe-js";
import {useRouter} from "next/navigation";
import {FormEvent, useState} from "react";
import {toast} from "react-toastify";
import formStyles from "../../../form.module.scss";
import styles from "./SignupForm.module.scss";
import {
	StripeAddressElementOptions,
	StripeCardElementOptions
} from "@stripe/stripe-js";

const CARD_ELEMENT_OPTIONS: StripeCardElementOptions = {
	style: {
		base: {
			color: vars.textPrimaryColor,
			fontFamily: "'Montserrat', sans-serif",
			fontSize: "16px",
			"::placeholder": {
				color: vars.textSecondaryColor
			}
		},
		invalid: {
			color: "#fa755a",
			iconColor: "#fa755a"
		}
	}
};

const ADDRESS_ELEMENT_OPTIONS: StripeAddressElementOptions = {
	mode: "billing"
};

const SignupForm = () => {
	const stripe = useStripe();
	const elements = useElements();
	const router = useRouter();
	const {signUp} = useAuthContext();
	const {setUpPayment} = usePaymentContext();
	const [isFetching, setIsFetching] = useState(false);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const stripeIsNotLoaded = !stripe || !elements;
		if (stripeIsNotLoaded) {
			return;
		}

		setIsFetching(true);
		try {
			const target = e.target as typeof e.target & {
				email: {value: SignupData["email"]};
				password: {value: SignupData["password"]};
			};

			const addressElement = elements.getElement("address")!;
			const {value, complete} = await addressElement.getValue();

			if (!complete) {
				return;
			}

			const values: SignupData = {
				email: target.email.value,
				password: target.password.value,
				fullName: value.name
			};

			await signUp(values);

			const clientSecret = await setUpPayment();
			const {error, setupIntent} = await stripe.confirmCardSetup(clientSecret, {
				payment_method: {
					card: elements.getElement("card")!,
					billing_details: {
						name: values.fullName,
						email: values.email,
						address: {...value.address, line2: value.address.line2 || undefined}
					}
				}
			});

			if (error) {
				throw error;
			}

			if (setupIntent.status === "succeeded") {
				toast.success("Signup succeeded!");
				router.push("/");
			}
		} catch (e) {
			console.error(e);
			toast.error(e instanceof Error ? e.message : "Something went wrong.");
		} finally {
			setIsFetching(false);
		}
	};

	return (
		<>
			<h1>Signup</h1>
			<form className={formStyles.form} onSubmit={handleSubmit}>
				<div className={formStyles.fields}>
					<FormField label="Email">
						<Input name="email" placeholder="Email" type="email" />
					</FormField>
					<FormField label="Password">
						<Input name="password" placeholder="Password" type="password" />
					</FormField>
					<FormField label="Billing details">
						<AddressElement
							className={styles.address}
							options={ADDRESS_ELEMENT_OPTIONS}
						/>
						<CardElement options={CARD_ELEMENT_OPTIONS} />
					</FormField>
				</div>
				<Button
					className={formStyles.button}
					isSubmit
					disabled={!stripe || isFetching}>
					Sign up
				</Button>
			</form>
			<p>
				Already have an account? <Link href="/auth/signin">Sign in</Link>
			</p>
		</>
	);
};

export default SignupForm;
