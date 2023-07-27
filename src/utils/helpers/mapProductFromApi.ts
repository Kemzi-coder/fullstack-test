import {Product, ProductFromApi} from "@/types";

const mapProductFromApi = (product: ProductFromApi): Product => {
	return {
		id: product._id,
		name: product.name,
		priceId: product.priceId,
		description: product.description
	};
};

export default mapProductFromApi;
