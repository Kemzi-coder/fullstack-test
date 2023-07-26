import {NextFunction, Response} from "express";
import {ProductService} from "../services";
import {CustomRequest} from "../types";

class ProductController {
	static async getAll(req: CustomRequest, res: Response, next: NextFunction) {
		try {
			const products = await ProductService.getAll();
			res.json(products);
		} catch (e) {
			next(e);
		}
	}
}

export default ProductController;
