import stripe from "../stripe";

class ProductService {
	static async getAll() {
		const products = await stripe.products.list();
		return products.data;
	}
}

export default ProductService;
