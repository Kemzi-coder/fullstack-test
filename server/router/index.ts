import {Router} from "express";
import authRouter from "./authRouter";
import paymentRouter from "./paymentRouter";
import productRouter from "./productRouter";
import stripeRouter from "./stripeRouter";
import userRouter from "./userRouter";

const router = Router();

router.use("/auth", authRouter);
router.use("/product", productRouter);
router.use("/payment", paymentRouter);
router.use("/stripe", stripeRouter);
router.use("/user", userRouter);

export default router;
