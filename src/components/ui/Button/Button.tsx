import React, {ButtonHTMLAttributes, FC} from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";


interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	isSubmit?: boolean;
}

const Button: FC<Props> = ({children, className, isSubmit, ...props}) => {
	return (
		<button
			className={classNames(styles.button, className)}
			type={isSubmit ? "submit" : "button"}
			{...props}>
			{children}
		</button>
	);
};

export default Button;
