import {Product, ProductFromApi} from "@/types";

const mapProductFromApi = (product: ProductFromApi): Product => {
	return {id: product.id, name: product.name, priceId: product.default_price};
};

export default mapProductFromApi;
