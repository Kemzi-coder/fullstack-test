import {Router} from "express";
import {PaymentController} from "../controllers";

const router = Router();

router.get("/checkout", PaymentController.checkout);

export default router;
