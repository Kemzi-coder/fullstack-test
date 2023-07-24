import {Router} from "express";
import {PaymentController} from "../controllers";

const router = Router();

router.get("/test", PaymentController.test);

export default router;
