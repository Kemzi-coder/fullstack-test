"use client";

import {Button} from "@/components/ui";
import {useEffect} from "react";
import {toast} from "react-toastify";
import styles from "./error.module.scss";

const Error = ({error, reset}: {error: Error; reset: () => void}) => {
	useEffect(() => {
		console.error(error);
		toast.error(error.message);
	}, [error]);

	return (
		<div className={styles.content}>
			<h2 className={styles.title}>{error.message}</h2>
			<Button onClick={() => reset()}>Try again</Button>
		</div>
	);
};

export default Error;
