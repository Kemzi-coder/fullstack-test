import {Product} from "../db/models";

class ProductService {
	static async getAll() {
		const products = await Product.getMany();
		return products;
	}
}

export default ProductService;
