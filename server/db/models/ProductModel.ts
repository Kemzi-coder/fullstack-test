import {WithId} from "mongodb";
import Model from "../lib/Model";

interface ProductToDb {
	productId: string;
	name: string;
	priceId: string;
	description: string;
}

class ProductModel extends Model<ProductToDb> {
	constructor() {
		super({collectionName: "products"});
	}

	async updateByProductId(
		productId: ProductToDb["productId"],
		data: Partial<ProductToDb>
	): Promise<WithId<ProductToDb> | null> {
		return super.updateOne({productId}, data);
	}

	async deleteByProductId(
		productId: ProductToDb["productId"]
	): Promise<WithId<ProductToDb> | null> {
		return super.deleteOne({productId});
	}
}

export type {ProductToDb};
export default ProductModel;
