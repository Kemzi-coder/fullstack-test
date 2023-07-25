import classNames from "classnames";
import NextLink, {LinkProps} from "next/link";
import {FC, ReactNode} from "react";
import styles from "./Link.module.scss";

interface Props extends LinkProps {
	children?: ReactNode;
	className?: string;
}

const Link: FC<Props> = ({children, className, ...props}) => {
	return (
		<NextLink className={classNames(styles.link, className)} {...props}>
			{children}
		</NextLink>
	);
};

export default Link;
