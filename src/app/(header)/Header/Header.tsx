import React from "react";
import styles from "./Header.module.scss";
import UserInfo from "../UserInfo/UserInfo";
import SignoutButton from "../SignoutButton/SignoutButton";
import classNames from "classnames";

const Header = () => {
	return (
		<header className={styles.header}>
			<div className={classNames("container", styles.container)}>
				<div className={styles.inner}>
					<div className={styles.leftContent}>
						<UserInfo />
						<SignoutButton />
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
