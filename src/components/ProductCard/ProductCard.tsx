import {Product} from "@/types";
import {FC, ReactNode} from "react";
import styles from "./ProductCard.module.scss";

interface Props {
	product: Product;
	buttonSlot?: ReactNode;
}

const ProductCard: FC<Props> = ({product, buttonSlot}) => {
	return (
		<div className={styles.card}>
			<div className={styles.content}>
				<h3>{product.name}</h3>
			</div>
			<div className={styles.button}>{buttonSlot}</div>
		</div>
	);
};

export default ProductCard;
