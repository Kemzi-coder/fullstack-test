import {CheckoutButton, ProductCard} from "@/components";
import {Product} from "@/types";
import {FC} from "react";
import styles from "./ProductList.module.scss";

interface Props {
	products: Product[];
}

const ProductList: FC<Props> = ({products}) => {
	return (
		<div className={styles.list}>
			{products.map(product => (
				<div key={product.id} className={styles.item}>
					<ProductCard
						product={product}
						buttonSlot={<CheckoutButton priceIds={[product.priceId]} />}
					/>
				</div>
			))}
		</div>
	);
};

export default ProductList;
