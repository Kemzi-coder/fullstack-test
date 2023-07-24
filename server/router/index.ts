import {Router} from "express";
import {PaymentController} from "../controllers";

const router = Router();

router.get("/secret", PaymentController.getSecret);

export default router;
