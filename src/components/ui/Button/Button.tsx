import React, {ButtonHTMLAttributes, FC} from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";

type ButtonVariant = "primary" | "outline";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	isSubmit?: boolean;
	variant?: ButtonVariant;
}

const Button: FC<Props> = ({
	children,
	className,
	isSubmit,
	variant = "primary",
	...props
}) => {
	return (
		<button
			className={classNames(
				styles.button,
				{
					[styles.primary]: variant === "primary",
					[styles.outline]: variant === "outline"
				},
				className
			)}
			type={isSubmit ? "submit" : "button"}
			{...props}>
			{children}
		</button>
	);
};

export type {ButtonVariant};
export default Button;
