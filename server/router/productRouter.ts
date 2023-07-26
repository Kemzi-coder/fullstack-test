import {Router} from "express";
import {ProductController} from "../controllers";

const productRouter = Router();

productRouter.get("/", ProductController.getAll);

export default productRouter;
