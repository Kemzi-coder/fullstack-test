import {Metadata} from "next";
import {ReactNode} from "react";
import styles from "./layout.module.scss";

export const metadata: Metadata = {
	title: "Authentication"
};

const AuthLayout = ({children}: {children: ReactNode}) => {
	return (
		<div className="container">
			<div className={styles.inner}>
				<div className={styles.content}>{children}</div>
			</div>
		</div>
	);
};

export default AuthLayout;
