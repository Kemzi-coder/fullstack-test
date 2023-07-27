import {connectToDb} from "../db";
import {Product} from "../db/models";

class ProductService {
	static COLLECTION_NAME = "products";

	static async create(product: Product): Promise<Product> {
		const collection = await ProductService._connectToCollection();

		await collection.insertOne(product);

		const createdProduct = await ProductService.getById(product._id);
		return createdProduct!;
	}

	static async updateById(
		id: string,
		product: Partial<Product>
	): Promise<Product> {
		const collection = await ProductService._connectToCollection();

		await collection.updateOne({_id: id}, {$set: product});

		const updatedProduct = await ProductService.getById(id);
		return updatedProduct!;
	}

	static async getAll(): Promise<Product[]> {
		const collection = await ProductService._connectToCollection();
		return collection.find().toArray();
	}

	static async getById(id: string): Promise<Product | null> {
		const collection = await ProductService._connectToCollection();
		return collection.findOne({_id: id});
	}

	static async deleteById(id: string) {
		const collection = await ProductService._connectToCollection();
		await collection.deleteOne({_id: id});
	}

	static async _connectToCollection() {
		const db = await connectToDb();
		return db.collection<Product>(ProductService.COLLECTION_NAME);
	}
}

export default ProductService;
