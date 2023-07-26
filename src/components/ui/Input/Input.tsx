import classNames from "classnames";
import {FC, InputHTMLAttributes} from "react";
import styles from "./Input.module.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<Props> = ({className, ...rest}) => {
	return (
		<input
			className={classNames(styles.input, className)}
			{...rest}
		/>
	);
};

export default Input;
