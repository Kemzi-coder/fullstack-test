import {FC, LabelHTMLAttributes, ReactNode} from "react";
import styles from "./FormField.module.scss";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
	label: string;
	children?: ReactNode;
}

const FormField: FC<Props> = ({label, children, ...rest}) => {
	return (
		<label className={styles.label} {...rest}>
			<span>{label}</span>
			{children}
		</label>
	);
};

export default FormField;
