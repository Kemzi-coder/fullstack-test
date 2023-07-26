import {Router} from "express";
import authRouter from "./authRouter";
import paymentRouter from "./paymentRouter";
import productRouter from "./productRouter";

const router = Router();

router.use("/auth", authRouter);
router.use("/product", productRouter);
router.use("/payment", paymentRouter);

export default router;
