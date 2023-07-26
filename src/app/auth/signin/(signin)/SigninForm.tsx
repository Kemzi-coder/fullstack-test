"use client";

import {Button, FormField, Input, Link} from "@/components/ui";
import {useAuthContext} from "@/providers";
import {useRouter} from "next/navigation";
import {FormEvent, useState} from "react";
import {toast} from "react-toastify";
import formStyles from "../../form.module.scss";

const SigninForm = () => {
	const router = useRouter();
	const {signIn} = useAuthContext();
	const [isFetching, setIsFetching] = useState(false);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		setIsFetching(true);
		try {
			const target = e.target as typeof e.target & {
				email: {value: string};
				password: {value: string};
			};
			const data = {email: target.email.value, password: target.password.value};

			await signIn(data);

			toast.success("Signed in successfully.");
			router.push("/");
		} catch (e) {
			console.error(e);
			toast.error(e instanceof Error ? e.message : "Something went wrong.");
		} finally {
			setIsFetching(false);
		}
	};

	return (
		<>
			<h1>Signin</h1>
			<form className={formStyles.form} onSubmit={handleSubmit}>
				<div className={formStyles.fields}>
					<FormField label="Email">
						<Input name="email" placeholder="Email" type="email" />
					</FormField>
					<FormField label="Password">
						<Input name="password" placeholder="Password" type="password" />
					</FormField>
				</div>
				<Button className={formStyles.button} isSubmit disabled={isFetching}>
					Sign in
				</Button>
			</form>
			<p>
				Doesn&apos;t have an account? <Link href="/auth/signup">Sign up</Link>
			</p>
		</>
	);
};

export default SigninForm;
