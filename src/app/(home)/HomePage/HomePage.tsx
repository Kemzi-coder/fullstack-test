import {Product, ProductFromApi} from "@/types";
import {mapProductFromApi} from "@/utils/helpers";
import ProductList from "../ProductList/ProductList";
import styles from "./HomePage.module.scss";

export const revalidate = 60;

const fetchProducts = async (): Promise<Product[]> => {
	const response = await fetch(`${process.env.APP_URL}/api/product`);

	if (!response.ok) {
		throw new Error("Error fetching products.");
	}

	const data: ProductFromApi[] = await response.json();
	return data.map(product => mapProductFromApi(product));
};

const HomePage = async () => {
	const products = await fetchProducts();

	return (
		<section className={styles.section}>
			<div className="container">
				<h1 className={styles.title}>Products</h1>
				<ProductList products={products} />
			</div>
		</section>
	);
};

export default HomePage;
